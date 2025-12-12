# Migration Guide: Site Architecture Restructure

## Overview

This document details the architectural changes implemented in the Site-Map-2.0 branch, including breaking changes, URL mappings, and developer notes.

## Branch Information

- **Branch Name**: `Site-Map-2.0`
- **Base Branch**: `main`
- **Migration Type**: Hard cutover (no backward compatibility)
- **Status**: In Development

## Breaking Changes

### ⚠️ URL Structure Changes

All Knesset-related URLs have been restructured. Old URLs will not work after migration.

### Old → New URL Mapping

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/current-knesset` | `/knesset/25` | Direct replacement |
| `/dashboard` | `/knesset/25` | Direct replacement |
| `/past-knessets` | `/knesset` | Now shows all sessions |
| `/knesset-data` | `/knesset` | Renamed and enhanced |
| `/knesset-data/[knesset_number]` | `/knesset/[knesset_number]` | Hub page with sections |
| `/members` | `/mks` | Renamed for clarity |
| `/members/[knesset_number]` | `/knesset/[knesset_number]#members` | Now a section within hub |
| `/members/person/[person_id]` | `/mks/[mk_id]` | Shortened and simplified |
| `/ministry` | Deferred | Future: `/ministries/[ministry_id]` |

### New Routes Created

#### Knesset Hub Routes
- `/knesset` - Index of all Knesset sessions
- `/knesset/[knesset_number]` - Comprehensive hub page with 6 sections

#### Canonical Entity Routes
- `/mks/[mk_id]` - Individual MK profile (migrated from `/members/person/[person_id]`)
- `/parties` - Global parties list
- `/parties/[party_id]` - Party detail page
- `/bills/[bill_id]` - Bill detail page
- `/committees/[committee_id]` - Committee detail page
- `/laws/[law_id]` - Law detail page

### Routes Removed

The following routes have been removed:
- `/knesset-data/`
- `/knesset-data/[knesset_number]/`
- `/members/person/[person_id]/`
- `/members/[knesset_number]/`
- `/current-knesset/`
- `/dashboard/`
- `/past-knessets/`
- `/ministry/` (deferred to future phase)

## Knesset Hub Page Architecture

### Section Structure

Each Knesset hub page (`/knesset/[knesset_number]`) contains 6 anchor-navigable sections:

1. **`#overview`** - Overview
   - Coalition vs Opposition summary
   - Government composition
   - Quick statistics

2. **`#timeline`** - Timeline
   - Formation date
   - Key events (reshuffles, significant votes)
   - Dissolution date (if applicable)

3. **`#parties`** - Parties
   - List of all parties in session
   - Coalition/opposition badges
   - Member counts
   - Links to party detail pages

4. **`#members`** - Members (Key Positions)
   - MKs with key positions displayed prominently
   - Prime Minister, ministers, committee chairs
   - Regular MKs in collapsed/minimal view
   - Filter controls

5. **`#committees`** - Committees
   - Active committees in session
   - Committee name, chair, member count
   - Links to committee detail pages

6. **`#bills`** - Bills & Laws
   - Bills introduced in session
   - Laws passed in session
   - Summary statistics

### Navigation

- Anchor links allow direct navigation to sections (e.g., `/knesset/25#parties`)
- Sticky section navigation for easy jumping between sections
- Standard server-side rendering (no lazy loading in Phase 1)

## File Structure Changes

### New Directories Created

```
src/
├── app/
│   ├── knesset/
│   │   ├── page.tsx
│   │   └── [knesset_number]/
│   │       └── page.tsx
│   ├── mks/
│   │   ├── page.tsx
│   │   └── [mk_id]/
│   │       └── page.tsx
│   ├── parties/
│   │   ├── page.tsx
│   │   └── [party_id]/
│   │       └── page.tsx
│   ├── bills/
│   │   └── [bill_id]/
│   │       └── page.tsx
│   ├── committees/
│   │   └── [committee_id]/
│   │       └── page.tsx
│   └── laws/
│       └── [law_id]/
│           └── page.tsx
└── components/
    └── knesset/
        ├── section-navigation.tsx
        └── sections/
            ├── overview-section.tsx
            ├── timeline-section.tsx
            ├── parties-section.tsx
            ├── members-section.tsx
            ├── committees-section.tsx
            └── bills-section.tsx
```

### Directories Removed

```
src/app/knesset-data/
src/app/members/person/
src/app/members/[knesset_number]/
src/app/current-knesset/
src/app/dashboard/
src/app/past-knessets/
src/app/ministry/
```

### Static Data Migration

Static JSON files moved from:
- `src/app/knesset-data/members_data/*.json`

To:
- `src/data/knessets/*.json` (as backup/fallback)

## Component Changes

### UI Components

**NO UI COMPONENTS CHANGED** - All existing UI components are reused:
- Buttons, Cards, Badges, Avatars, etc. remain unchanged
- Only routing and data fetching logic updated
- All styling and visual design preserved

### New Components Created

All new components reuse existing UI patterns:
- `section-navigation.tsx` - Uses existing Card, Button components
- Section components (`overview-section.tsx`, etc.) - Reuse existing display components

## Data Layer

### API Endpoints

**Only documented endpoints are used:**
- Existing endpoints from `src/lib/api/endpoints.ts` are utilized
- No new API endpoints created unless documented in `docs/2 ARCHITECTURE.md`
- Fallback to static JSON files where API endpoints don't exist

### Data Fetching Pattern

```typescript
// Standard server component data fetching
async function getKnessetData(knessetNum: number) {
  // Use existing documented endpoints
  const [members, parties, committees, bills] = await Promise.all([
    membersApi.list({ knesset: knessetNum }),
    // Additional calls based on documented endpoints
  ]);
  
  return { members, parties, committees, bills };
}
```

## Developer Notes

### Working with the New Architecture

1. **Linking to Knesset Sessions:**
   ```tsx
   <Link href={`/knesset/${knessetNum}`}>כנסת {knessetNum}</Link>
   ```

2. **Linking to Sections:**
   ```tsx
   <Link href={`/knesset/${knessetNum}#members`}>חברי הכנסת</Link>
   ```

3. **Linking to Entity Pages:**
   ```tsx
   <Link href={`/mks/${personId}`}>פרופיל</Link>
   <Link href={`/parties/${partyId}`}>סיעה</Link>
   <Link href={`/bills/${billId}`}>הצעת חוק</Link>
   ```

### Updating Existing Links

Search for and update the following patterns in your code:

```bash
# Old patterns to find and replace:
/members/person/${id}  →  /mks/${id}
/members/${knessetNum}  →  /knesset/${knessetNum}#members
/knesset-data/${knessetNum}  →  /knesset/${knessetNum}
/current-knesset  →  /knesset/25
/dashboard  →  /knesset/25
/past-knessets  →  /knesset
```

### Testing Checklist

When implementing or testing features on the new architecture:

- [ ] Verify all internal links point to new URLs
- [ ] Test anchor navigation (#overview, #timeline, etc.)
- [ ] Ensure breadcrumbs reflect new structure
- [ ] Verify mobile responsiveness maintained
- [ ] Check RTL layout correctness
- [ ] Confirm all data fetching works
- [ ] Test error states (404, API failures)
- [ ] Verify no UI components were unintentionally changed

## Deferred Features

The following features are documented but not implemented in this phase:

### Future Enhancements (Not in Scope)
- ❌ Snapshot routes (`/knesset/[k]/snapshot/[timestamp]`)
- ❌ Appointment routes (`/entities/appointment/[id]`)
- ❌ Human-readable slugs (e.g., `/mks/123-yonatan-abramov`)
- ❌ Lazy loading with Intersection Observers
- ❌ Advanced SEO optimization
- ❌ Ministries section
- ❌ Lobbyists section
- ❌ Documents section
- ❌ Separate votes section (included in bills section)

These can be added incrementally in future phases once the core architecture stabilizes.

## Rollback Plan

If issues arise during or after migration:

```bash
# Switch back to main branch
git checkout main

# Or if changes are committed but problematic
git revert <commit-hash>

# Or reset to pre-migration state
git reset --hard <commit-before-migration>
```

## Timeline

- **Start Date**: December 12, 2025
- **Expected Completion**: TBD
- **Merge Target**: `main` branch
- **Deployment**: TBD

## Questions & Support

For questions about the migration:
1. Check this guide first
2. Review updated documentation in `/docs`
3. Open an issue in GitHub
4. Contact the development team on Slack

---

**Last Updated**: December 12, 2025  
**Branch**: Site-Map-2.0  
**Status**: In Development
