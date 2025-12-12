## Site Map (New Structure)

### Primary Routes
✅ '/': 'ראשי' (Home)
✅ '/search': 'חיפוש מתקדם' (Advanced Search)
✅ '/developers': 'למפתחים' (For Developers)
✅ '/report-bug': 'דיווח על תקלה' (Report Bug)

### Knesset Sessions
🆕 '/knesset': 'רשימת כנסת' (Knesset Sessions Index)
🆕 '/knesset/[knesset_number]': 'דף כנסת' (Knesset Hub Page)
  - Sections:
    - '#overview': סקירה כללית (Overview)
    - '#timeline': ציר זמן (Timeline)
    - '#parties': סיעות (Parties)
    - '#members': חברי כנסת (Members - key positions)
    - '#committees': ועדות (Committees)
    - '#bills': הצעות חוק וחוקים (Bills & Laws)

### Canonical Entity Routes (Global)
🆕 '/mks': 'רשימת ח״כים' (MKs List)
🆕 '/mks/[mk_id]': 'פרופיל ח״כ' (MK Profile)

🆕 '/parties': 'רשימת סיעות' (Parties List)
🆕 '/parties/[party_id]': 'פרופיל סיעה' (Party Profile)

✅ '/bills': 'רשימת הצעות חוק' (Bills List)
🆕 '/bills/[bill_id]': 'דף הצעת חוק' (Bill Detail)

✅ '/committees': 'רשימת ועדות' (Committees List)
🆕 '/committees/[committee_id]': 'דף ועדה' (Committee Detail)

✅ '/laws': 'מאגר חוקים' (Laws Database)
🆕 '/laws/[law_id]': 'דף חוק' (Law Detail)

✅ '/votes': 'רשימת הצבעות' (Votes List)
✅ '/plenums': 'מליאות והצבעות' (Plenums & Votes)

### Deprecated/Removed Routes
❌ '/current-knesset' → Redirects to '/knesset/25'
❌ '/dashboard' → Redirects to '/knesset/25'
❌ '/members/[knesset_number]' → Migrated to '/knesset/[knesset_number]#members'
❌ '/members/person/[person_id]' → Migrated to '/mks/[mk_id]'
❌ '/knesset-data' → Removed
❌ '/knesset-data/[knesset_number]' → Migrated to '/knesset/[knesset_number]'
❌ '/past-knessets' → Migrated to '/knesset'
❌ '/ministry' → Deferred (future: '/ministries')
❌ '/lobbyists' → Deferred

### Legend
✅ = Existing route (kept)
🆕 = New route (to be created)
❌ = Deprecated/removed route


--- 

## Home Page - ראשי
- [V] Displays the purpose of the "Open Knesset" site.
- [V] Visual navigation cards for key features on the site.
- [V] Describes the importance of the project and calls for community participation.
- [V] added 'In Development' page. 

## Donations & Volunteering - התנגבות ותרומה 
- [V] Donation dialog integrated in site header with jgive.com and bank transfer options.
- [V] Information on how individuals can support the Open Knesset project through donations or volunteering.

## Report Bug - דווח על באג
- [V] Bug reporting form with fields for URL, description, name, and email.
- [ ] Form validation and submission handling. 

## Current Knesset - כנסת נוכחית
- [ ] Statistical data display (placeholder data currently, needs real API integration).
- [ ] Overview of current Knesset's activities with daily updated data.
- [ ] Note last update date for each page.
- [ ] Parliament seat layout visualization - circular visualization of 120 Knesset seats grouped by party (`src/components/knesset-data/parliament-seat-layout.tsx`). 

## For Developers - למפתחים
- [V] API access and authentication guide. 
- [V] Technical documentation for developers. 
- [V] Database structure and reference tables overview. 

## Members - חכים וסיעות 
- [V] List of all Knessets (1-25) with member and party counts - STATIC.
- [V] Navigation to individual Knesset member pages.
- [V] Updated design with card-based layout.
- [ ] Individual member detail pages with full information.
- [ ] Photos of Members of Knesset and political parties. 
- [ ] Links t o party websites and Wikipedia pages. 
- [ ] Display whether an MK votes according to their stated positions. 

## Ministries - משרדי ממשלה
- [ ] List of current Ministries.
- [ ] Specific ministry page - past ministers, office names and other details.
- [ ] Ministry-related legislation and activities.

## Committees - ועדות
- [ ] Committee list display grouped by Knesset number.
- [ ] Committee meeting summaries and agendas.
- [ ] AI-generated summaries of committee discussions. 

## Laws - חוקים 
- [ ] Link to the "Open Book of Laws". 
- [ ]   Laws table matches the one in 'https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawReshumot.aspx?t=LawReshumot&st=LawReshumot' 

## Bills - הצעות חוק
- [V] Bills page with recent bills table component.
- [ ] Bills table matches the one in 'https://main.knesset.gov.il/activity/legislation/laws/pages/lawsuggestionssearch.aspx?t=lawsuggestionssearch&st=currentknesset'
- [ ] Daily sync data from official Knesset database.
- [ ] Interactive dashboard with a timeline view of proposals. 

## Lobbyists - לוביסטים
- [ ] Lobbyist list display.
- [ ] Indicate which committee each lobbyist is active in. 
- [ ] Display the individual or organization represented. 
- [ ] Include relevant quotes from committee protocols. 
- [ ] Show a contribution score estimating influence on proposals. 

## Votes - מליאות והצבעות
- [V] Votes page with voting activity chart component.
- [o] Chart visualization exists with placeholder data, needs real data integration.
- [ ] List all plenary sessions and associated legislative votes with real data.
- [ ] Attendance record for each session. 
- [ ] Detailed voting breakdown by MK. 

## Search - חיפוש מתקדם 
- [ ] Basic search page structure.
- [ ] Search functionality implementation.
- [ ] Filter by committee or member. 
- [ ] Link to the "Legislators Beta" tool. 
- [ ] Interactive flowchart to trace legislative and voting activity. 

