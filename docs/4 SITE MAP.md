# Site Map

**Goal: The WHERE** (Folder structure and routing hierarchy).

## 1. Primary Routes

- `/` — **ראשי** (Home): Current Knesset spotlight and search.
- `/search` — **חיפוש מתקדם** (Advanced Search): Unified entity search.
- `/developers` — **למפתחים** (Developers): API documentation and dev guide.
- `/report-bug` — **דיווח על תקלה** (Report Bug): Bug submission form.

## 2. Knesset Hubs

- `/knesset` — **רשימת כנסת** (Sessions Index): List of all historical and current terms.
- `/knesset/[number]` — **דף כנסת** (Single Hub): Comprehensive view with anchor sections:
    - `#overview` - Coalition/Opposition summary.
    - `#timeline` - Key events and dates.
    - `#parties` - List of parties in the term.
    - `#members` - MKs and key positions.
    - `#committees` - Active committees.
    - `#bills` - Introduced bills and passed laws.

## 3. Canonical Entity Routes

Global routes for entities that span multiple terms:

- `/mks` — **רשימת ח״כים**: All-time MK directory.
- `/mks/[id]` — **פרופיל ח״כ**: Individual member profile.
- `/parties` — **רשימת סיעות**: Global party directory.
- `/parties/[id]` — **פרופיל סיעה**: Party detail page.
- `/bills` — **רשימת הצעות חוק**: Legislative database.
- `/bills/[id]` — **דף הצעת חוק**: Bill journey and details.
- `/committees` — **רשימת ועדות**: Committee directory.
- `/committees/[id]` — **דף ועדה**: Committee activity and members.
- `/laws` — **מאגר חוקים**: Passed legislation database.
- `/laws/[id]` — **דף חוק**: Final law text and history.

## 4. Operational Routes
- `/votes` — **רשימת הצבעות**: Recent plenum votes.
- `/plenums` — **מליאות**: Scheduled and past plenum sessions.
