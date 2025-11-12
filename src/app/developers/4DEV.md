# למפתחים – Open Knesset

עמוד זה מרכז את כל מקורות המידע, קבצי הנתונים וה־API של פרויקט **Open Knesset**, לשימוש חופשי של מפתחים, חוקרים ואזרחים המעוניינים לבנות יישומים על בסיס מידע פרלמנטרי פתוח.

---

## 🧩 מקורות מידע עיקריים

- **קבצי נתונים (CSV):**  
  [https://production.oknesset.org/pipelines/data/](https://production.oknesset.org/pipelines/data/)

- **גישה למסד הנתונים (Redash):**  
  [https://redash.hasadna.org.il/](https://redash.hasadna.org.il/)

- **תיעוד API (Swagger):**  
  [https://backend.oknesset.org/docs](https://backend.oknesset.org/docs)

- **מאגרי מידע רשמיים של הכנסת (ODATA):**  
  [https://main.knesset.gov.il/activity/info/pages/databases.aspx](https://main.knesset.gov.il/activity/info/pages/databases.aspx)

- **מאגר הקוד הפתוח של הפרויקט:**  
  [https://github.com/hasadna/knesset-data-pipelines](https://github.com/hasadna/knesset-data-pipelines)

---

## 📚 מבנה הנתונים לפי נושאים

### 🏛️ הכנסת ונתונים כלליים

| טבלה | תיאור |
|-------|--------|
| `knesset/kns_knessetdates` | תאריכי תחילה וסיום של כל כנסת ומידע כללי |
| `knesset/kns_govministry` | רשימת משרדים ממשלתיים |
| `knesset/kns_itemtype` | סוגי פריטים |
| `knesset/kns_status` | סטטוסים |

---

### 🧑‍⚖️ חוקים

| טבלה | תיאור |
|-------|--------|
| `laws/kns_law_binding` | קשר בין חוקים לחוקי אב |
| `laws/kns_israel_law` | חוקי האב עצמם |
| `laws/kns_israel_law_name` | שמות חוקי האב |
| `laws/kns_israel_law_ministry` | משרדים הקשורים לחוקי האב |
| `laws/kns_israel_law_classification` | סיווג חוקי אב |
| `laws/kns_israel_law_binding` | חוקים שהוחלפו |

---

### 🧍‍♂️ חברי כנסת ואנשים נוספים

| טבלה | תיאור |
|-------|--------|
| `members/kns_person` | רשימת חברי הכנסת ואנשים נוספים (כמו מנהלי ועדות) |
| `members/kns_position` | סוגי תפקידים קיימים בכנסת |
| `members/kns_persontoposition` | קשר בין ח"כ לתפקידו |
| `members/mk_individual` | מידע מורחב ומקושר על חברי הכנסת |
| `members/presence` | מידע על נוכחות ח"כים |

---

### 👥 משתתפים וסטטיסטיקות

| טבלה | תיאור |
|-------|--------|
| `people/committee-meeting-attendees` | רשימת משתתפים בישיבות ועדה |
| `people/committee-meeting-speaker-stats` | סטטיסטיקות דיבור בפרוטוקולים |
| `people/committee-meeting-attendees-mks-stats` | נתונים אודות נוכחות חברי כנסת בוועדות |
| `people/committee-meeting-attendees-mks-full-stats` | מידע מורחב על חברי הכנסת ונוכחותם בוועדות |

---

### 🧮 ועדות

| טבלה | תיאור |
|-------|--------|
| `committees/kns_committee` | רשימת הוועדות השונות |
| `committees/kns_jointcommittee` | קשר בין ועדות משותפות |
| `committees/kns_cmtsessionitem` | נושאים שנדונו בישיבות ועדה |
| `committees/kns_committeesession` | ישיבות ועדות כולל קישורים לפרוטוקולים |

#### 📁 פרוטוקולים
- טקסט מלא:  
  [https://production.oknesset.org/pipelines/data/committees/meeting_protocols_text/](https://production.oknesset.org/pipelines/data/committees/meeting_protocols_text/)
- קבצים מחולקים לפי דוברים:  
  [https://production.oknesset.org/pipelines/data/committees/meeting_protocols_parts/](https://production.oknesset.org/pipelines/data/committees/meeting_protocols_parts/)

---

### 🏛️ מליאה

| טבלה | תיאור |
|-------|--------|
| `plenum/kns_plenumsession` | ישיבות המליאה |
| `plenum/kns_plmsessionitem` | פריטים הקשורים לישיבות |
| `plenum/kns_documentplenumsession` | מסמכים נלווים לישיבות |

---

### 🗳️ הצבעות

| טבלה | תיאור |
|-------|--------|
| `votes/view_vote_rslts_hdr_approved` | נתוני הצבעות – בעד/נגד/נמנעים |
| `votes/view_vote_rslts_hdr_approved_extra` | מידע מורחב על הצבעות |
| `votes/vote_rslts_kmmbr_shadow` | פירוט הצבעות לפי ח"כ |
| `votes/vote_rslts_kmmbr_shadow_extra` | הרחבה של פירוט ההצבעות עם מידע מקושר |

---

### 💼 לוביסטים

| טבלה | תיאור |
|-------|--------|
| `lobbyists/v_lobbyist` | רשימת שדלנים |
| `lobbyists/v_lobbyist_clients` | לקוחות של שדלנים |

---

## 🤝 רוצים לעזור?

אנחנו תמיד שמחים לשיתופי פעולה, פידבק ותרומות קוד.  
ניתן להצטרף דרך [מאגר הקוד GitHub](https://github.com/hasadna/knesset-data-pipelines).

---

