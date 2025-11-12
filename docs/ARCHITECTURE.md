# Open Knesset Data Architecture

## Overview

This document describes the data architecture for the Open Knesset frontend application. The architecture leverages the Knesset OData v2 API through a custom backend API.

## Key Concepts

### Unified Member Identification

The system uses `PersonID` from the `KNS_Person` table as the unified identifier for members across all Knesset terms. This means:

- Each member has a single `PersonID` that remains constant across all terms
- Member data is fetched from `/members/{person_id}` endpoint
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
│   │   └── fetch-historical-data.ts  # Historical data fetching utilities
│   └── utils.ts               # General utilities
├── hooks/
│   ├── use-member.ts          # Member data hooks
│   ├── use-bills.ts           # Bill data hooks
│   └── use-api.ts             # Generic API hooks
├── app/
│   └── members/
│       └── [person_id]/
│           └── page.tsx       # Unified member page
└── components/
    └── members/
        └── member-profile.tsx # Member profile component
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

## Member Page Routes

### Unified Member Page
- Route: `/members/[person_id]`
- Example: `/members/532` (Yuli Edelstein)
- Displays all terms, positions, committees, votes, bills

### Knesset-Specific Member List
- Route: `/members/[knesset_number]`
- Example: `/members/25`
- Lists all members for a specific Knesset term

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
| Recent Votes | API + Client | 5 min | Automatic |
| Bills (passed) | Static | ∞ | Manual |
| Bills (active) | API + Client | 5 min | Automatic |

## Future Enhancements

1. **Client-Side Caching**: Integrate React Query or SWR for client-side data fetching
2. **Batch Requests**: Optimize API calls by batching related requests
3. **Search Functionality**: Implement unified search across all entities
4. **Real-Time Updates**: WebSocket support for live updates
5. **Data Prefetching**: Prefetch related data on hover/navigation

## Migration Notes

The existing JSON files in `src/app/knesset-data/members_data/` are not accurate and should not be used as a data source. They will be replaced with API-fetched data.

To migrate:
1. Fetch historical data via API using the provided scripts
2. Update components to use API endpoints instead of file system
3. Gradually remove dependency on static JSON files

