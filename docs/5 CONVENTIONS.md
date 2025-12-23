# Coding Conventions & Patterns

[[File Goal: Development best practices and implementation patterns.]]

## 1. Getting Started as a Volunteer
We're thrilled to have you! To contribute effectively:
1.  **Find a Task**: Check `docs/DEV TO DOs/FEATURES.md` for `[ ]` items or `docs/DEV TO DOs/ISSUES.md` for bugs.
2.  **Communication**: Before starting a major feature, open an issue or reach out in the community channel to align on the approach.
3.  **Hebrew/English Policy**: 
    - **Code & Comments**: English.
    - **Git Messages**: English/Hebrew.
    - **UI & Content**: Hebrew (RTL).

## 2. PR Checklist (The "Green Light")
Ensure your Pull Request meets these standards to speed up the review:
- [ ] **RTL Support**: Layout looks correct in Hebrew.
- [ ] **No OOPS**: Double-check that existing features and UI still work as expected.
- [ ] **No `any`**: Strictly use the types defined in `src/lib/api/types.ts`.
- [ ] **Patterns**: Follows the Member and API patterns below.

## 3. Core Technical Patterns

### Member (MK) Data Pattern
Always use `PersonID` as the canonical identifier for members across all Knesset terms.
```typescript
import { membersApi } from '@/lib/api/endpoints';

// 1. Get canonical profile
const response = await membersApi.getById(532);
const member = response.data;

// 2. Get historical roles across terms
const positions = await membersApi.getPositions(532);
```

### API Implementation
**Avoid** raw `fetch` calls. Use the centralized clients in `src/lib/api/`.
- **Client**: `src/lib/api/client.ts`
- **Endpoints**: `src/lib/api/endpoints.ts`

### API-First Data Strategy
- **Source of Truth**: The API is the source of truth for all parliamentary data (Members, Bills, etc.) across all Knesset terms.
- **Static Context**: "Static" refers strictly to supplementary context (e.g., historical wars or events) not available in the official OData API. These are managed via local JSON.
- **Caching**: Use `getFetchCacheOptions(knessetNum)` to handle caching logic (Infinity for historical, ISR for current).

## 4. Directory Structure
Follow this organization for new files:
- `src/app/`: Route-based pages and layouts.
- `src/components/`: Reusable UI components.
    - `ui/`: Base shadcn/ui components (Radix primitives).
    - `layout/`: Global navigation, headers, footers.
- `src/lib/`: API clients (`/api`) and data loaders (`/data`).
- `src/hooks/`: Business logic and state management.
- `src/data/static/`: Supplementary datasets that complement API data (e.g., lists of wars, historical milestones).

## 5. Domain Glossary
| Hebrew Term | Meaning | Code Symbol |
| :--- | :--- | :--- |
| **ח״כ (MK)** | Member of Knesset | `Member` / `Person` |
| **סיעה (Party)** | Political grouping | `Party` / `Faction` |
| **הצעת חוק** | Proposed bill | `Bill` |
| **ועדה** | Committee | `Committee` |
