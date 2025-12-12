# Open Knesset Data Architecture

## Overview

This document describes the data architecture for the Open Knesset frontend application. The architecture leverages the Knesset OData v2 API through a custom backend API.

## Key Concepts

### Unified Member Identification

The system uses `PersonID` from the `KNS_Person` table as the unified identifier for members across all Knesset terms. This means:

- Each member has a single `PersonID` that remains constant across all terms
- Member data is fetched from `/members/{person_id}` API endpoint (frontend route: `/members/person/[person_id]`)
- Historical data (positions, parties, committees) is linked via `KNS_PersonToPosition`

### Data Sources

1. **Custom Backend API**: `https://backend.oknesset.org`
   - Wraps Knesset OData v2 API
   - Provides RESTful endpoints
   - Handles caching and data transformation

2. **Knesset OData v2**: `https://knesset.gov.il/Odata/ParliamentInfo.svc`
   - Source of truth for parliamentary data
   - Accessed via custom backend API

### Static vs Dynamic Data

**Static Data** (Historical):
- Past Knesset terms (1-24)
- Completed votes, bills, sessions
- Cached indefinitely, regenerated on build

**Dynamic Data** (Current):
- Current Knesset term (25)
- Active bills, upcoming sessions
- Revalidated hourly

## File Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── client.ts          # API client with fetch wrapper
│   │   ├── endpoints.ts       # Endpoint definitions
│   │   └── types.ts           # TypeScript types matching API
│   ├── data/
│   │   ├── member-utils.ts    # Member data utilities
│   │   ├── cache.ts           # Cache configuration
│   │   ├── fetch-historical-data.ts  # Historical data fetching utilities
│   │   ├── knesset-data-fetcher.ts   # Unified knesset term data fetcher
│   │   └── static-loader.ts   # Static data loading utilities
│   ├── knesset-utils.ts       # Knesset-specific utilities
│   └── utils.ts               # General utilities
├── hooks/
│   ├── use-member.ts          # Member data hooks
│   ├── use-bills.ts           # Bill data hooks
│   ├── use-api.ts             # Generic API hooks
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notification hook
├── app/
│   ├── knesset/
│   │   ├── page.tsx           # Knesset sessions index
│   │   └── [knesset_number]/
│   │       └── page.tsx       # Knesset hub page (with sections)
│   ├── mks/
│   │   ├── page.tsx           # Global MKs list
│   │   └── [mk_id]/
│   │       └── page.tsx       # Individual MK profile
│   ├── parties/
│   │   ├── page.tsx           # Global parties list
│   │   └── [party_id]/
│   │       └── page.tsx       # Party detail page
│   ├── bills/
│   │   ├── page.tsx           # Global bills list
│   │   └── [bill_id]/
│   │       └── page.tsx       # Bill detail page
│   ├── committees/
│   │   ├── page.tsx           # Global committees list
│   │   └── [committee_id]/
│   │       └── page.tsx       # Committee detail page
│   └── laws/
│       ├── page.tsx           # Global laws list
│       └── [law_id]/
│           └── page.tsx       # Law detail page
└── components/
    ├── knesset/
    │   ├── section-navigation.tsx  # Sticky anchor navigation
    │   └── sections/
    │       ├── overview-section.tsx
    │       ├── timeline-section.tsx
    │       ├── parties-section.tsx
    │       ├── members-section.tsx
    │       ├── committees-section.tsx
    │       └── bills-section.tsx
    └── members/
        └── member-profile.tsx  # Member profile component
```

## API Usage

### Fetching Member Data

```typescript
import { membersApi } from '@/lib/api/endpoints';

// Get member by PersonID
const memberResponse = await membersApi.getById(532);
const member = Array.isArray(memberResponse.data) 
  ? memberResponse.data[0] 
  : memberResponse.data;

// Get member positions across all terms
const positionsResponse = await membersApi.getPositions(532);
const positions = Array.isArray(positionsResponse.data)
  ? positionsResponse.data
  : [positionsResponse.data];
```

### Using Cache Strategies

```typescript
import { getFetchCacheOptions } from '@/lib/data/cache';

// For historical data (Knesset 1-24)
const cacheOptions = getFetchCacheOptions(20); // Never revalidates

// For current Knesset (25)
const cacheOptions = getFetchCacheOptions(25); // Revalidates hourly

// Function signature: getFetchCacheOptions(knessetNum?: number, currentKnessetNum?: number)
// Automatically determines cache strategy based on Knesset number
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://backend.oknesset.org
NEXT_PUBLIC_CURRENT_KNESSET_NUM=25
```

## Fetching Historical Data

To fetch historical data and save as static files:

1. Use the utility script: `scripts/fetch-historical-data.mjs`
2. Or use the TypeScript utilities in `src/lib/data/fetch-historical-data.ts`

The fetched data will be saved to `src/app/knesset-data/members_data/` as JSON files.

## Routing Architecture

### Hub-Based Knesset Pages

The architecture centers around comprehensive Knesset session hub pages:

**Knesset Index:**
- Route: `/knesset`
- File: `src/app/knesset/page.tsx`
- Lists all Knesset sessions (1-25) with metadata
- Search and filter capabilities

**Knesset Hub Page:**
- Route: `/knesset/[knesset_number]`
- Example: `/knesset/25`
- File: `src/app/knesset/[knesset_number]/page.tsx`
- Comprehensive single-page hub for each Knesset session
- Contains anchor-navigable sections:
  - `#overview` - Coalition summary, government composition, statistics
  - `#timeline` - Key events (formation, reshuffles, dissolution)
  - `#parties` - Parties with coalition/opposition badges
  - `#members` - MKs roster (emphasizing key positions)
  - `#committees` - Active committees list
  - `#bills` - Bills introduced and laws passed

### Canonical Entity Routes

All entities have global, cross-session pages accessible by ID:

**Members (MKs):**
- List: `/mks`
- Detail: `/mks/[mk_id]`
- Example: `/mks/532` (Yuli Edelstein)
- File: `src/app/mks/[mk_id]/page.tsx`
- Uses API endpoints: `membersApi.getById()` and `membersApi.getPositions()`

**Parties:**
- List: `/parties`
- Detail: `/parties/[party_id]`
- File: `src/app/parties/[party_id]/page.tsx`

**Bills:**
- List: `/bills`
- Detail: `/bills/[bill_id]`
- File: `src/app/bills/[bill_id]/page.tsx`

**Committees:**
- List: `/committees`
- Detail: `/committees/[committee_id]`
- File: `src/app/committees/[committee_id]/page.tsx`

**Laws:**
- List: `/laws`
- Detail: `/laws/[law_id]`
- File: `src/app/laws/[law_id]/page.tsx`

### Routing Principles

1. **ID-based URLs**: All entity routes use numeric IDs only (e.g., `/mks/532`)
2. **Hub architecture**: Each Knesset session has one comprehensive page
3. **Anchor navigation**: Within-page sections use URL fragments
4. **Canonical entities**: Entities accessible globally, not tied to specific sessions

## Type Safety

All API responses are typed using TypeScript interfaces in `src/lib/api/types.ts`. These types match the Knesset OData v2 structure:

- `Person` - Member entity
- `PersonToPosition` - Member terms and roles
- `Bill` - Bills and laws
- `Committee` - Committees
- `PlenumVote` - Plenum votes
- And more...

## Caching Strategy

| Data Type | Cache Location | TTL | Revalidation |
|-----------|---------------|-----|--------------|
| Historical Members | Static (build time) | ∞ | Manual |
| Current Members | ISR | 1 hour | Automatic |
| Historical Votes | Static | ∞ | Manual |
| Recent Votes | API + Client | 5 min | tic |
| Bills (passed) | Static | ∞ | Manual |
| Bills (active) | API + Client | 5 min | Automatic |

## Future Enhancements

1. **Client-Side Caching**: Integrate React Query or SWR for client-side data fetching
2. **Batch Requests**: Optimize API calls by batching related requests
3. **Search Functionality**: Implement unified search across all entities
4. **Real-Time Updates**: WebSocket support for live updates
5. **Data Prefetching**: Prefetch related data on hover/navigation

## Migration Notes

### Current Status

The project is in a transitional state with both static and API-based data sources:

**API-Based (Implemented):**
- Unified member pages (`/members/person/[person_id]`) - Uses API endpoints
- Member profile components - Fetch from API
- Member utilities and hooks - API-ready

**Static JSON Files (Legacy):**
- Knesset-specific member lists (`/members/[knesset_number]`) - Still uses static JSON
- Historical data in `src/app/knesset-data/members_data/` - Used by legacy routes
- Static loaders (`static-loader.ts`, `knesset-data-fetcher.ts`) - Support legacy data

### Migration Path

To complete the migration to API-only:
1. Update `/members/[knesset_number]` route to use `membersApi.list({ knesset: knessetNum })`
2. Replace static JSON file reads with API calls
3. Remove or deprecate `static-loader.ts` and related utilities
4. Update `knesset-data-fetcher.ts` to use API endpoints instead of static files
5. Remove static JSON files from `src/app/knesset-data/members_data/` (or keep as backup)

### Data Fetching Scripts

- **TypeScript utilities**: `src/lib/data/fetch-historical-data.ts` - For programmatic fetching
- **Node.js script**: `scripts/fetch-historical-data.mjs` - For batch historical data fetching
- Both can be used to populate static files during migration or for backup purposes

