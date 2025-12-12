---
name: API Integration Plan for Knesset Member Pages
overview: ""
todos:
  - id: e241554b-b1ac-47c3-80a2-132bc609699c
    content: Enhance API client with request deduplication, retry logic, and daily refresh headers
    status: pending
  - id: 54ff62b4-0a8d-4af3-8370-2dd283034f44
    content: Map actual API endpoints (both high-level and table-level) from OpenAPI spec
    status: pending
  - id: fc8c6df8-22b0-4303-8cf4-a2a76128879d
    content: Create script to generate static JSON files for historical members (Knessets 1-24)
    status: pending
  - id: 9ca0743d-583d-4f4a-b9a5-9ab9b78ce55c
    content: Create utilities to load static member data from JSON files
    status: pending
  - id: a985ac82-9960-4683-ac7d-e0f9f64ff058
    content: Create unified member data fetcher that combines static and API data
    status: pending
  - id: da5ccba3-2280-4bac-b444-bbbfdfa0dd40
    content: Implement pre-generation configuration system with analytics-driven strategy
    status: pending
  - id: 3ebf8306-2f8a-4f4d-8c1f-2a48fbd9c94f
    content: Create new Knesset term overview page at /knesset/[knesset_number]/page.tsx
    status: pending
  - id: b3890264-93a7-4698-894d-d34afff818ed
    content: Create Knesset members list page at /knesset/[knesset_number]/members/page.tsx
    status: pending
  - id: 92cc3e78-28c9-4bfa-89e8-35c787f84e7d
    content: Enhance member page with term sections, filters, and hybrid data fetching
    status: pending
  - id: f2329180-50f2-4e53-a14d-81952c9b9946
    content: Create script for migrating Knesset term data to static when new term begins
    status: pending
  - id: 37a96a48-a001-45cd-892e-933de5fc94f2
    content: Update breadcrumbs and sidebar navigation for new route structure
    status: pending
  - id: d657bddc-edc7-4297-a328-7c2af2f21993
    content: Integrate votes, bills, and committees endpoints with filtering
    status: pending
---

# API Integration Plan for Knesset Member Pages

## Current State Analysis

### Existing Architecture

- **Framework**: Next.js 15.3.3 with App Router
- **API Client**: Basic client setup in `src/lib/api/client.ts` with fetch wrapper
- **Endpoints**: Defined in `src/lib/api/endpoints.ts` (currently using idealized endpoints)
- **Types**: TypeScript types in `src/lib/api/types.ts` matching Knesset OData structure
- **Caching**: Basic cache utilities in `src/lib/data/cache.ts` with ISR strategies
- **Member Pages**: Existing route at `/members/person/[person_id]/page.tsx` using API
- **Knesset Pages**: Existing routes at `/members/[knesset_number]/page.tsx` and `/knesset-data/[knesset_number]/page.tsx`

### API Documentation Analysis

The backend API (`https://backend.oknesset.org`) provides:

**High-Level Endpoints** (Current Members):

- `/member_kns_by_personal/{id}` - Get current member by PersonID (includes positions, committees, knessets)
- `/member_kns_by_individual/{id}` - Get current member by mk_individual_id
- `/minister_by_personal/{id}` - Get current minister by PersonID

**Table-Level Endpoints** (All Members, Historical + Current):

- `/members_kns_person/list` - All persons (PersonID-based)
- `/members_kns_persontoposition/list` - All positions/terms (critical for historical data)
- `/members_faction_memberships/list` - Faction memberships
- `/votes_view_vote_mk_individual/list` - Individual vote records
- `/people_plenum_session_voters_stats/list` - Voting statistics
- Many more domain-specific endpoints

## Data Classification

### Static Data (Historical, Immutable)

- Name, contact info, image, date of birth
- Historical Knesset terms (Knesset 1-24)
- Past committee memberships (completed terms)
- Completed votes (historical sessions)
- Passed bills (historical legislation)

### Dynamic Data (Current, Frequently Updated)

- Current party affiliation (Knesset 25)
- Active committee memberships (current term)
- Upcoming votes (future sessions)
- Active bills (in progress)
- Attendance in current term

## Architecture Recommendations

### 1. Data Layer Architecture

#### Static Data Storage

- **Location**: `src/data/static/members/` directory (git-tracked JSON files)
- **Content**: Historical member data for Knessets 1-24
- **Format**: Pre-fetched and normalized JSON files per member: `{person_id}.json`
- **Structure**: 
  ```json
  {
    "personId": number,
    "static": {
      "name": string,
      "contact": {...},
      "image": string,
      "dateOfBirth": string,
      "historicalTerms": [...],
      "pastCommittees": [...],
      "completedVotes": [...],
      "passedBills": [...]
    },
    "lastUpdated": string,
    "knessets": number[]
  }
  ```

- **Update Strategy**: Build-time script generates static files, committed to repo
- **Benefits**: Fast page loads, no API calls for historical data, SEO-friendly

#### Dynamic Data Fetching

- **Current Knesset (25)**: Fetch from API with ISR
- **Cache Strategy**: 
  - Historical (Knesset < 25): Static files, never revalidate
  - Current (Knesset = 25): ISR with daily revalidation (86400 seconds)
  - Active data (votes, bills): ISR with daily revalidation

### 2. Page Generation Strategy

#### Pre-generation Configuration

```typescript
const PREGENERATE_CONFIG = {
  current: 'all',              // All current Knesset (120 members)
  historical: {
    strategy: 'analytics-driven',
    criteria: [
      { role: ['prime_minister', 'speaker', 'minister'] }, // ~80 members
      { pageViews30d: { gte: 100 } },                     // ~120 members
    ],
    maxHistorical: 200           // Cap to control build time
  },
  fallback: 'blocking',          // ISR for others
  revalidation: {
    current: 86400,             // Daily (24 hours)
    historical: false            // Never (immutable)
  }
}
```

#### Implementation Approach

- **Popular Pages**: Pre-generated at build time (instant load)
- **Unpopular Pages**: Generated on-demand via ISR (slight delay on first view, then cached)
- **Graceful Degradation**: No catastrophic failures, always fallback to ISR

### 3. API Client Improvements

#### Enhance `src/lib/api/client.ts`

- Add request deduplication for concurrent requests
- Implement retry logic with exponential backoff (3 retries)
- Add request/response interceptors for logging
- Support for batch requests where possible
- Better error handling with typed error responses
- Daily refresh headers for dynamic data

#### Update `src/lib/api/endpoints.ts`

- Map actual API endpoints from OpenAPI spec
- Create wrapper functions for both high-level and table-level endpoints
- High-level endpoints: `/member_kns_by_personal/{id}` for current members
- Table-level endpoints: `/members_kns_persontoposition/list` for historical positions
- Add query parameter builders for filtering (knesset, date ranges, etc.)
- Support pagination for list endpoints

### 4. Data Fetching Strategy

#### Hybrid Endpoint Usage

- **Current Members (Knesset 25)**: Use high-level endpoint `/member_kns_by_personal/{id}` for complete picture
- **Historical Members**: Use table-level endpoints:
  - `/members_kns_person/list` for basic info
  - `/members_kns_persontoposition/list` for all positions across terms
  - Combine data to build complete historical profile

#### Server Components (Primary)

- Use Next.js async server components for initial data fetch
- Leverage Next.js fetch caching with `revalidate` options
- Implement parallel data fetching where possible
- Check static files first, fallback to API

#### Client Components (Secondary)

- Use React Query or SWR for client-side data fetching
- Implement optimistic updates for user interactions
- Add loading states and error boundaries
- Prefetch related pages on hover/navigation

### 5. Caching Strategy

#### Three-Layer Caching

**Layer 1: Static Files (Historical Data)**

- Pre-generated JSON files for historical members
- Stored in `src/data/static/members/{person_id}.json`
- Includes: Static fields only (name, contact, image, DOB, historical terms, past committees, completed votes, passed bills)
- Never revalidated, immutable

**Layer 2: Next.js ISR (Current Data)**

- Server-side caching with revalidation
- Historical (Knesset < 25): `revalidate: false` (static files)
- Current (Knesset = 25): `revalidate: 86400` (daily)
- Dynamic data: `revalidate: 86400` (daily)

**Layer 3: Client-Side Cache (React Query/SWR)**

- Stale-while-revalidate pattern
- Cache static data indefinitely
- Cache dynamic data for 24 hours

### 6. Route Structure Revamp

#### Current Structure (To Be Improved)

- `/members/person/[person_id]` - Member page (mixed with term data)
- `/members/[knesset_number]` - Knesset term page (shows members)
- `/knesset-data/[knesset_number]` - Knesset data page

#### New Structure (Proposed)

- `/members/person/[person_id]` - **Unified member page** (all terms, positions, activity)
- `/knesset/[knesset_number]` - **Knesset term overview page** (term stats, parties, timeline)
- `/knesset/[knesset_number]/members` - **Knesset members list** (drill-down from term page)
- `/knesset/[knesset_number]/committees` - **Knesset committees** (term-specific)
- `/knesset/[knesset_number]/bills` - **Knesset bills** (term-specific)

#### Navigation Flow

1. User views Knesset term page → sees overview, stats, parties
2. User clicks "View Members" → navigates to `/knesset/[knesset_number]/members`
3. User clicks specific member → navigates to `/members/person/[person_id]`
4. Member page shows all terms, with highlighted current term context

### 7. New Knesset Term Transition Process

#### When New Knesset Term Begins (e.g., Knesset 26)

**Step 1: Data Migration Script**

- Create `scripts/migrate-knesset-to-static.mjs`
- Script identifies all members from previous term (Knesset 25)
- Fetches complete historical data for Knesset 25
- Separates static vs dynamic data
- Generates static JSON files for all Knesset 25 members
- Updates `src/data/static/members/` directory

**Step 2: Configuration Update**

- Update `NEXT_PUBLIC_CURRENT_KNESSET_NUM` environment variable (25 → 26)
- Update `PREGENERATE_CONFIG.current` to new term
- Update cache strategies to treat Knesset 25 as historical

**Step 3: Member Page Enhancement**

- Add "Knesset Term" card/section to member pages
- Show all terms member served in
- Highlight current term with special styling
- Add term-specific filters for votes, bills, committees
- Show term transition dates and party changes

**Step 4: Build Process**

- Run static data generation for new historical term
- Pre-generate pages for popular historical members
- Update analytics tracking for new term

**Step 5: Documentation**

- Update README with new term transition process
- Document manual steps required
- Create checklist for future term transitions

## Implementation Steps

### Phase 0: API Exploration & Testing

1. **API Endpoint Testing**

   - Test high-level endpoints (`/member_kns_by_personal/{id}`) with sample PersonIDs
   - Test table-level endpoints (`/members_kns_person/list`, `/members_kns_persontoposition/list`)
   - Document actual response structures, field names, and data types
   - Test pagination, filtering, and query parameters
   - Identify rate limits and error response formats

2. **Sample Data Collection**

   - Fetch sample members (current Knesset 25 and historical examples)
   - Test edge cases:
     - Members with many terms (e.g., served in 5+ Knessets)
     - Members with no current term (historical only)
     - Members who are also ministers
     - Members with extensive committee memberships
   - Save sample responses to `src/data/samples/` for reference

3. **TypeScript Type Validation**

   - Create initial types based on real API responses
   - Validate types against multiple sample responses
   - Document any discrepancies between documentation and actual responses
   - Create type mapping document

4. **Performance Baseline**

   - Measure response times for various endpoints
   - Test with different filters and pagination sizes
   - Identify slow endpoints that may need optimization
   - Document performance characteristics

5. **Error Handling Discovery**

   - Test invalid PersonIDs, missing data scenarios
   - Test network errors and timeout scenarios
   - Document error response formats
   - Identify retry strategies needed

6. **Data Quality Assessment**

   - Check for null values, missing fields, inconsistent data
   - Verify PersonID consistency across endpoints
   - Validate date formats and completeness
   - Document data quality issues found

**Deliverables:**

- API response samples saved to `src/data/samples/`
- TypeScript types validated against real responses
- API testing documentation
- Performance baseline report
- Error handling guide

### Phase 1: API Client Enhancement

1. Update API client with actual endpoint mappings (both high-level and table-level)
2. Add request deduplication and retry logic
3. Implement proper error handling with typed responses
4. Add TypeScript types matching actual API responses
5. Create endpoint wrappers for member data fetching

### Phase 2: Static Data Generation & Management

1. Create `src/scripts/generate-static-member-data.mjs`
2. Script fetches historical member data (Knessets 1-24)
3. Normalize and separate static vs dynamic fields
4. Store in `src/data/static/members/{person_id}.json`
5. Generate index file for quick lookups
6. Create `src/scripts/migrate-knesset-to-static.mjs` for future term transitions
7. Update build process to include static data validation

### Phase 3: Data Fetching Layer

1. Create `src/lib/data/static-loader.ts` - Load static member data
2. Create `src/lib/data/member-data-fetcher.ts` - Unified fetcher (static + API)
3. Implement hybrid fetching logic (check static first, fallback to API)
4. Add data merging utilities (combine static + dynamic)
5. Implement parallel data fetching for related entities

### Phase 4: Page Generation & Caching

1. Implement pre-generation config system
2. Create `src/lib/data/pregeneration.ts` - Pre-generation logic
3. Update `generateStaticParams` for member pages
4. Implement ISR with daily revalidation for current members
5. Add analytics integration for page view tracking
6. Implement graceful degradation fallback

### Phase 5: UI Revamp - Route Separation

1. **Create Knesset Term Overview Page**

   - New route: `/knesset/[knesset_number]/page.tsx`
   - Display: Term stats, party distribution, timeline, key events
   - Add navigation to members, committees, bills

2. **Create Knesset Members List Page**

   - New route: `/knesset/[knesset_number]/members/page.tsx`
   - Display: All members for specific term, party grouping
   - Link to individual member pages

3. **Update Member Page**

   - Enhance `/members/person/[person_id]/page.tsx`
   - Add "Knesset Terms" section showing all terms
   - Add term-specific filters for activity data
   - Show term transition timeline
   - Highlight current term context

4. **Update Navigation**

   - Update breadcrumbs to reflect new structure
   - Add navigation between term and member pages
   - Update sidebar navigation

### Phase 6: Related Data Integration

1. Integrate votes endpoints (historical + current)
2. Integrate bills endpoints (passed + active)
3. Integrate committees endpoints (past + current)
4. Implement pagination for large datasets
5. Add filtering by Knesset term, date ranges
6. Optimize queries with proper filtering

### Phase 7: Performance Optimization

1. Implement React Query/SWR for client-side caching
2. Add prefetching for related pages (on hover)
3. Optimize bundle size (code splitting)
4. Add monitoring and analytics
5. Implement image optimization for member photos

## Key Files to Create/Modify

### New Files

- `src/lib/api/endpoints-actual.ts` - Actual API endpoint mappings
- `src/lib/api/request-deduplication.ts` - Request deduplication utility
- `src/lib/api/retry.ts` - Retry logic with exponential backoff
- `src/scripts/generate-static-member-data.mjs` - Static data generation script
- `src/scripts/migrate-knesset-to-static.mjs` - Knesset term migration script
- `src/lib/data/static-loader.ts` - Static data loading utilities (member files and knesset term files)
- `src/lib/data/knesset-data-fetcher.ts` - Unified knesset term data fetcher
- `src/lib/data/member-data-fetcher.ts` - Unified member data fetcher
- `src/lib/data/pregeneration.ts` - Pre-generation configuration and logic
- `src/app/knesset/[knesset_number]/page.tsx` - New Knesset term overview page
- `src/app/knesset/[knesset_number]/members/page.tsx` - New Knesset members list page
- `src/components/knesset/term-overview.tsx` - Knesset term overview component
- `src/components/knesset/members-list.tsx` - Knesset members list component
- `src/components/members/term-card.tsx` - Member term card component

### Modified Files

- `src/lib/api/client.ts` - Add retry logic, deduplication, daily refresh headers
- `src/lib/api/endpoints.ts` - Update with actual endpoints (both types)
- `src/lib/api/types.ts` - Add types matching actual API responses
- `src/app/members/person/[person_id]/page.tsx` - Implement hybrid fetching, add term sections
- `src/lib/data/cache.ts` - Update cache strategies (daily refresh)
- `src/components/layout/breadcrumbs.tsx` - Update for new route structure
- `src/components/layout/sidebar-content.tsx` - Update navigation

## Data Refresh Schedule

- **Daily Refresh**: All dynamic data refreshed once per day (86400 seconds)
- **Build Time**: Static data generated/updated during build
- **Manual Refresh**: Run migration script when new Knesset term begins