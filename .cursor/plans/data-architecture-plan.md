<!-- 0a41cade-13b3-4b60-8f77-403f4f6c84ba cbeae637-8e98-4c1c-9f54-197db8e23064 -->
# Open Knesset Data Architecture Design

## Overview

This architecture leverages the Knesset OData v2 API (`https://knesset.gov.il/Odata/ParliamentInfo.svc`) through a custom backend API (`https://backend.oknesset.org`). The system uses `PersonID` from `KNS_Person` as the unified member identifier across all Knesset terms.

**Important Notes**:

- Existing JSON files in `src/app/knesset-data/members_data/` are not accurate and should not be used as data source
- Historical data will be fetched via API first, then cached as static files for performance
- The Knesset OData API already provides unified member identification via `PersonID`

## 1. Data Model Architecture (Based on Knesset OData v2)

### Core Entity Relationships (Mapped from Knesset OData Tables)

**KNS_Person - Unified Member Entity** (Primary)

- `PersonID`: Unique identifier (integer) - **This is the unified member ID across all terms**
- `FirstName`: First name (Hebrew)
- `LastName`: Last name (Hebrew)
- `GenderID`: Gender code
- `GenderDesc`: Gender description
- `Email`: Email address
- `IsCurrent`: Whether currently serving
- `LastUpdatedDate`: Last update timestamp

**KNS_PersonToPosition - Member Terms & Roles** (Junction Table)

- `PersonToPositionID`: Unique row identifier
- `PersonID`: Foreign key to KNS_Person (unified member ID)
- `PositionID`: Foreign key to KNS_Position (role type)
- `KnessetNum`: Knesset term number (1-25)
- `FactionID`: Foreign key to KNS_Faction (party)
- `FactionName`: Party name (denormalized)
- `CommitteeID`: Foreign key to KNS_Committee (if committee role)
- `CommitteeName`: Committee name (denormalized)
- `GovMinistryID`: Foreign key to KNS_GovMinistry (if minister)
- `GovMinistryName`: Ministry name (denormalized)
- `DutyDesc`: Specific duty description
- `GovernmentNum`: Government number
- `StartDate`, `FinishDate`: Term dates
- `IsCurrent`: Whether position is currently active

**KNS_Faction - Parties/Factions**

- `FactionID`: Unique identifier
- `Name`: Party name (Hebrew)
- `KnessetNum`: Knesset term number
- `StartDate`, `FinishDate`: Party existence dates
- `IsCurrent`: Whether party is currently active

**KNS_Bill - Bills & Laws**

- `BillID`: Unique identifier
- `KnessetNum`: Knesset term number
- `Name`: Bill name (Hebrew)
- `SubTypeID`: Bill type code (private, government, committee)
- `SubTypeDesc`: Bill type description
- `PrivateNumber`: Private bill number (פ')
- `Number`: Official bill number (כ' or מ')
- `CommitteeID`: Handling committee
- `StatusID`: Status code
- `PostponementReasonID`: Reason for postponement (if applicable)
- `PublicationDate`: Publication date in official gazette
- `LastUpdatedDate`: Last update timestamp

**KNS_BillInitiator - Bill Proposers**

- `BillInitiatorID`: Unique row identifier
- `BillID`: Foreign key to KNS_Bill
- `PersonID`: Foreign key to KNS_Person
- `IsInitiator`: Boolean (true = initiator, false = co-signer)
- `Ordinal`: Order in proposer list

**KNS_Committee - Committees**

- `CommitteeID`: Unique identifier
- `Name`: Committee name (Hebrew)
- `CategoryID`: Category code
- `CategoryDesc`: Category description
- `KnessetNum`: Knesset term number
- `CommitteeTypeID`: Type code (permanent, special, sub-committee)
- `Email`: Committee email
- `StartDate`, `FinishDate`: Committee dates
- `IsCurrent`: Whether committee is active

**KNS_PlenumVote - Plenum Votes**

- `VoteID`: Unique identifier
- `VoteDateTime`: Vote date and time
- `SessionID`: Foreign key to KNS_PlenumSession
- `ItemID`: Item ID being voted on
- `Ordinal`: Order within session
- `VoteMethodID`: Voting method code
- `VoteMethodDesc`: Voting method (electronic, manual, by name)
- `VoteTitle`: Vote title
- `VoteSubject`: Vote subject
- `IsNoConfidenceInGov`: Whether no-confidence vote

**KNS_PlenumVoteResult - Individual Vote Records**

- `Id`: Unique row identifier
- `MKID`: Foreign key to KNS_Person (member ID)
- `VoteID`: Foreign key to KNS_PlenumVote
- `VoteDate`: Vote date
- `ResultCode`: Vote result code
- `ResultDesc`: Vote result (For/Against/Abstain/Absent)

**KNS_PlenumSession - Plenum Sessions**

- `PlenumSessionID`: Unique identifier
- `Number`: Session number
- `KnessetNum`: Knesset term number
- `Name`: Session name
- `StartDate`, `FinishDate`: Session dates
- `IsSpecialMeeting`: Whether special meeting

**KNS_CommitteeSession - Committee Sessions**

- `CommitteeSessionID`: Unique identifier
- `Number`: Session number
- `KnessetNum`: Knesset term number
- `CommitteeID`: Foreign key to KNS_Committee
- `StartDate`, `FinishDate`: Session dates
- `Location`: Session location
- `SessionUrl`: Link to session on Knesset website

**KNS_Query - Parliamentary Queries**

- `QueryID`: Unique identifier
- `Number`: Query number
- `KnessetNum`: Knesset term number
- `Name`: Query name
- `TypeID`: Query type code
- `TypeDesc`: Query type (regular, urgent)
- `PersonID`: Foreign key to KNS_Person (query submitter)
- `GovMinistryID`: Foreign key to ministry being queried
- `SubmitDate`: Submission date
- `ReplyDatePlanned`: Planned reply date
- `ReplyMinisterDate`: Actual reply date

**KNS_Agenda - Agenda Items**

- `AgendaID`: Unique identifier
- `Number`: Agenda item number
- `KnessetNum`: Knesset term number
- `Name`: Agenda item name
- `InitiatorPersonID`: Foreign key to KNS_Person
- `CommitteeID`: Handling committee
- `StatusID`: Status code

### Static vs Dynamic Data Classification

**Static Data** (Rarely changes, cache aggressively):

- Historical member data (past Knesset terms)
- Historical bills/laws (already passed)
- Historical votes (completed sessions)
- Party information (historical parties)
- Committee structures (past terms)

**Dynamic Data** (Frequently updated, cache with shorter TTL):

- Current Knesset member status
- Active bills (status changes)
- Upcoming votes/sessions
- Current committee memberships
- Recent lobbyist activities

## 2. Member Consolidation Strategy

### Identification Approach

**Key Insight**: The Knesset OData API already provides unified member identification via `PersonID` in `KNS_Person` table. Members appear multiple times in `KNS_PersonToPosition` (once per term/position), but share the same `PersonID`.

1. **Primary Key Strategy**: Use `PersonID` from KNS_Person as the unified identifier

   - `PersonID` is stable across all Knesset terms
   - No need for custom consolidation - the API already provides this
   - Map existing JSON data `profile_url` IDs to `PersonID` using `KNS_MkSiteCode` table if needed

2. **Data Mapping**:

   - `KNS_Person` = Unified member entity
   - `KNS_PersonToPosition` = All terms, positions, parties, committees for each member
   - Use `$expand` OData queries to join related data efficiently

3. **Migration from Static JSON**:

   - Map existing JSON member data to `PersonID` via profile URLs
   - Use `KNS_MkSiteCode` for legacy site ID mapping if needed
   - Gradually migrate to API-based data fetching

## 3. API Design (Custom Backend API)

### Base URL

**Production**: `https://backend.oknesset.org`

**Documentation**: `https://backend.oknesset.org/docs`

### Existing Endpoints (From Your Custom API)

**Member Endpoints**:

- `GET /members` - List all members (with pagination, filters)
- `GET /members/{person_id}` - Get unified member profile with all terms
- Additional member endpoints as documented in your API

**Other Endpoints**:

- Additional endpoints as documented at `https://backend.oknesset.org/docs`

### Endpoints to Be Developed (Based on OData v2 Structure)

**Member Endpoints** (Additional):

- `GET /members/{person_id}/positions` - Get all positions/roles across terms (from KNS_PersonToPosition)
- `GET /members/{person_id}/votes` - Get all votes by member (from KNS_PlenumVoteResult)
- `GET /members/{person_id}/bills` - Get bills proposed/sponsored (from KNS_BillInitiator)
- `GET /members/{person_id}/committees` - Get committee memberships (from KNS_PersonToPosition filtered by CommitteeID)
- `GET /members/{person_id}/queries` - Get parliamentary queries submitted (from KNS_Query)
- `GET /members/{person_id}/agenda-items` - Get agenda items submitted (from KNS_Agenda)

**Party/Faction Endpoints**:

- `GET /factions` - List all parties/factions (from KNS_Faction)
- `GET /factions/{faction_id}` - Get faction details
- `GET /factions/{faction_id}/members` - Get members by faction and term
- `GET /factions/{faction_id}/members?knesset={knesset_num}` - Filter by Knesset term

**Bill Endpoints**:

- `GET /bills` - List bills (with filters: status, knesset, date range) (from KNS_Bill)
- `GET /bills/{bill_id}` - Get bill details
- `GET /bills/{bill_id}/initiators` - Get bill proposers (from KNS_BillInitiator)
- `GET /bills/{bill_id}/history` - Get bill name history (from KNS_BillName)
- `GET /bills/{bill_id}/documents` - Get bill documents (from KNS_DocumentBill)
- `GET /bills/{bill_id}/votes` - Get vote history for bill (join KNS_PlenumVote with KNS_PlmSessionItem)

**Committee Endpoints**:

- `GET /committees` - List committees (filter by knesset) (from KNS_Committee)
- `GET /committees/{committee_id}` - Get committee details
- `GET /committees/{committee_id}/members` - Get committee members (from KNS_PersonToPosition filtered by CommitteeID)
- `GET /committees/{committee_id}/sessions` - Get committee sessions (from KNS_CommitteeSession)
- `GET /committees/{committee_id}/sessions/{session_id}` - Get session details with items and documents

**Vote Endpoints**:

- `GET /votes` - List votes (with filters: knesset, date range, member) (from KNS_PlenumVote)
- `GET /votes/{vote_id}` - Get vote details with breakdown
- `GET /votes/{vote_id}/results` - Get individual vote results (from KNS_PlenumVoteResult)
- `GET /plenum-sessions` - List plenum sessions (from KNS_PlenumSession)
- `GET /plenum-sessions/{session_id}` - Get plenum session with items and votes

**Query Endpoints**:

- `GET /queries` - List parliamentary queries (from KNS_Query)
- `GET /queries/{query_id}` - Get query details with documents

**Agenda Endpoints**:

- `GET /agenda-items` - List agenda items (from KNS_Agenda)
- `GET /agenda-items/{agenda_id}` - Get agenda item details

**Search Endpoint**:

- `GET /search?q={query}&type={member|bill|party|committee|vote}` - Unified search across entities

### Response Format

All endpoints should return JSON with consistent structure:

```typescript
{
  data: T | T[],
  meta?: {
    page?: number,
    pageSize?: number,
    total?: number,
    lastUpdated?: string
  }
}
```

### OData v2 Integration Notes

Your custom API should:

- Query Knesset OData v2 endpoint: `https://knesset.gov.il/Odata/ParliamentInfo.svc`
- Use OData `$expand` for related entities (e.g., `$expand=KNS_PersonToPosition`)
- Use OData `$filter` for filtering (e.g., `$filter=PersonID eq 532`)
- Use OData `$orderby` for sorting
- Cache responses appropriately (see caching strategy below)
- Transform OData responses to your API's response format

## 4. Frontend Data Fetching Architecture

### Data Fetching Strategy

**Server Components** (Next.js App Router):

- Use for initial page loads and SEO-critical content
- Fetch data in `async` page components
- Leverage Next.js caching and revalidation

**Client Components**:

- Use for interactive features, real-time updates
- Implement React Query/SWR for client-side caching
- Handle optimistic updates for user interactions

### Caching Layers

1. **Next.js Static Generation** (ISR):

   - Historical data: `revalidate: false` (static)
   - Current term data: `revalidate: 3600` (1 hour)

2. **API Response Caching**:

   - Static data: Cache-Control: `public, max-age=31536000` (1 year)
   - Dynamic data: Cache-Control: `public, max-age=300` (5 minutes)
   - Use ETags for conditional requests

3. **Client-Side Caching** (React Query):

   - Stale-while-revalidate pattern
   - Cache static data indefinitely
   - Cache dynamic data for 5 minutes

### File Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── client.ts          # API client configuration
│   │   ├── endpoints.ts       # Endpoint definitions
│   │   └── types.ts           # TypeScript types matching API
│   ├── data/
│   │   ├── members.ts         # Member data utilities
│   │   ├── parties.ts         # Party data utilities
│   │   └── cache.ts           # Cache configuration
│   └── utils/
│       └── member-utils.ts    # Member consolidation helpers
├── hooks/
│   ├── use-member.ts          # Custom hook for member data
│   ├── use-bills.ts           # Custom hook for bills
│   └── use-api.ts             # Generic API hook
└── app/
    └── members/
        └── [member_id]/
            └── page.tsx       # Unified member page
```

## 5. Implementation Plan

### Phase 1: Data Model & Types

- Define TypeScript interfaces for all entities
- Create API client with type safety
- Set up data transformation utilities

### Phase 2: Member Consolidation

- Build migration script to process JSON files
- Create unified member index
- Generate member-term relationships
- Validate data integrity

### Phase 3: API Integration Layer

- Implement API client with caching
- Create React hooks for data fetching
- Add error handling and retry logic

### Phase 4: Unified Member Pages

- Create `/members/[member_id]` route
- Build member profile component
- Display all terms, votes, committees, bills
- Add navigation between related entities

### Phase 5: Performance Optimization

- Implement ISR for static pages
- Add client-side caching
- Optimize API queries (batch requests)
- Add loading states and skeletons

## 6. Modular Expansion Support

### Plugin Architecture

1. **Entity Registry**: Central registry for all entity types
2. **Relationship Mapper**: Define relationships between entities
3. **Query Builder**: Generic query builder for new entity types
4. **Component Factory**: Reusable components for entity display

### Adding New Data Types

1. Define entity in `lib/api/types.ts`
2. Add API endpoints in `lib/api/endpoints.ts`
3. Create data utilities in `lib/data/{entity}.ts`
4. Build React hook in `hooks/use-{entity}.ts`
5. Create page/component in `app/{entity}/`

## 7. Key Files to Create/Modify

**New Files**:

- `src/lib/api/client.ts` - API client with fetch wrapper
- `src/lib/api/types.ts` - TypeScript types for all entities
- `src/lib/api/endpoints.ts` - API endpoint definitions
- `src/lib/data/member-consolidation.ts` - Member deduplication logic
- `src/hooks/use-member.ts` - Member data fetching hook
- `src/app/members/[member_id]/page.tsx` - Unified member page
- `src/components/members/member-profile.tsx` - Member profile component

**Modified Files**:

- `src/app/members/[knesset_number]/page.tsx` - Update to use API
- `src/components/members/members-list.tsx` - Update to use API
- Add environment variable configuration for API base URL

## 8. Caching Strategy Summary

| Data Type | Cache Location | TTL | Revalidation |

|-----------|---------------|-----|--------------|

| Historical Members | Static (build time) | ∞ | Manual |

| Current Members | ISR | 1 hour | Automatic |

| Historical Votes | Static | ∞ | Manual |

| Recent Votes | API + Client | 5 min | Automatic |

| Bills (passed) | Static | ∞ | Manual |

| Bills (active) | API + Client | 5 min | Automatic |

| Committees (past) | Static | ∞ | Manual |

| Committees (current) | ISR | 1 hour | Automatic |