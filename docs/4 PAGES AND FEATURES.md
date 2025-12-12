## Site Map
V '/': 'ראשי',
  '/current-knesset': 'הכנסת הנוכחית',
  '/dashboard': 'הכנסת הנוכחית',
  '/members': 'ח״כים וסיעות',
  '/mks': 'ח״כים וסיעות',
  '/members/[knesset_number]': 'חברי כנסת לפי כנסת',
  '/members/person/[person_id]': 'פרופיל חבר כנסת',
  '/knesset-data': 'נתוני כנסת',
  '/knesset-data/[knesset_number]': 'נתוני כנסת לפי כנסת',
  '/past-knessets': 'כל כנסות ישראל',
  '/ministry': 'משרדים',
  '/committees': 'ועדות',
  '/bills': 'הצעות חוק',
  '/votes': 'מליאות והצבעות',
  '/plenums': 'מליאות והצבעות',
  '/lobbyists': 'לוביסטים',
  '/laws': 'חוקים',
  '/search': 'חיפוש מתקדם',
V '/developers': 'למפתחים',
V '/report-bug': 'דיווח על תקלה',


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

