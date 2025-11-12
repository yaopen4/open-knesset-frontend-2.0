import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Database, FileText, Code, Github } from "lucide-react";

export default function DevelopersPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold mb-4">למפתחים – Open Knesset</h1>
        <p className="text-muted-foreground text-lg">
          עמוד זה מרכז את כל מקורות המידע, קבצי הנתונים וה־API של פרויקט <strong>Open Knesset</strong>, לשימוש חופשי של מפתחים, חוקרים ואזרחים המעוניינים לבנות יישומים על בסיס מידע פרלמנטרי פתוח.
        </p>
      </div>

      {/* Main Information Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            מקורות מידע עיקריים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">קבצי נתונים (CSV):</p>
                <a 
                  href="https://production.oknesset.org/pipelines/data/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  https://production.oknesset.org/pipelines/data/
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">גישה למסד הנתונים (Redash):</p>
                <a 
                  href="https://redash.hasadna.org.il/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  https://redash.hasadna.org.il/
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">תיעוד API (Swagger):</p>
                <a 
                  href="https://backend.oknesset.org/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  https://backend.oknesset.org/docs
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">מאגרי מידע רשמיים של הכנסת (ODATA):</p>
                <a 
                  href="https://main.knesset.gov.il/activity/info/pages/databases.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  https://main.knesset.gov.il/activity/info/pages/databases.aspx
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Github className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="space-y-2">
                <p className="font-medium">מאגרי הקוד הפתוח של הפרויקט:</p>
                <div className="space-y-2">
                  <a 
                    href="https://github.com/hasadna/knesset-data-pipelines" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    https://github.com/hasadna/knesset-data-pipelines
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a 
                    href="https://github.com/yaopen4/open-knesset-frontend-2.0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    https://github.com/yaopen4/open-knesset-frontend-2.0
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Structure by Topics */}
      <Card>
        <CardHeader>
          <CardTitle>מבנה הנתונים לפי נושאים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Knesset and General Data */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🏛️ הכנסת ונתונים כלליים</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">knesset/kns_knessetdates</TableCell>
                  <TableCell>תאריכי תחילה וסיום של כל כנסת ומידע כללי</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">knesset/kns_govministry</TableCell>
                  <TableCell>רשימת משרדים ממשלתיים</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">knesset/kns_itemtype</TableCell>
                  <TableCell>סוגי פריטים</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">knesset/kns_status</TableCell>
                  <TableCell>סטטוסים</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Laws */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🧑‍⚖️ חוקים</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">laws/kns_law_binding</TableCell>
                  <TableCell>קשר בין חוקים לחוקי אב</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">laws/kns_israel_law</TableCell>
                  <TableCell>חוקי האב עצמם</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">laws/kns_israel_law_name</TableCell>
                  <TableCell>שמות חוקי האב</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">laws/kns_israel_law_ministry</TableCell>
                  <TableCell>משרדים הקשורים לחוקי האב</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">laws/kns_israel_law_classification</TableCell>
                  <TableCell>סיווג חוקי אב</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">laws/kns_israel_law_binding</TableCell>
                  <TableCell>חוקים שהוחלפו</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Members */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🧍‍♂️ חברי כנסת ואנשים נוספים</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">members/kns_person</TableCell>
                  <TableCell>רשימת חברי הכנסת ואנשים נוספים (כמו מנהלי ועדות)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">members/kns_position</TableCell>
                  <TableCell>סוגי תפקידים קיימים בכנסת</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">members/kns_persontoposition</TableCell>
                  <TableCell>קשר בין ח"כ לתפקידו</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">members/mk_individual</TableCell>
                  <TableCell>מידע מורחב ומקושר על חברי הכנסת</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">members/presence</TableCell>
                  <TableCell>מידע על נוכחות ח"כים</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Participants and Statistics */}
          <div>
            <h3 className="text-xl font-semibold mb-4">👥 משתתפים וסטטיסטיקות</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">people/committee-meeting-attendees</TableCell>
                  <TableCell>רשימת משתתפים בישיבות ועדה</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">people/committee-meeting-speaker-stats</TableCell>
                  <TableCell>סטטיסטיקות דיבור בפרוטוקולים</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">people/committee-meeting-attendees-mks-stats</TableCell>
                  <TableCell>נתונים אודות נוכחות חברי כנסת בוועדות</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">people/committee-meeting-attendees-mks-full-stats</TableCell>
                  <TableCell>מידע מורחב על חברי הכנסת ונוכחותם בוועדות</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Committees */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🧮 ועדות</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">committees/kns_committee</TableCell>
                  <TableCell>רשימת הוועדות השונות</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">committees/kns_jointcommittee</TableCell>
                  <TableCell>קשר בין ועדות משותפות</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">committees/kns_cmtsessionitem</TableCell>
                  <TableCell>נושאים שנדונו בישיבות ועדה</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">committees/kns_committeesession</TableCell>
                  <TableCell>ישיבות ועדות כולל קישורים לפרוטוקולים</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">📁 פרוטוקולים</h4>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">טקסט מלא:</span>{" "}
                  <a 
                    href="https://production.oknesset.org/pipelines/data/committees/meeting_protocols_text/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 inline-flex"
                  >
                    https://production.oknesset.org/pipelines/data/committees/meeting_protocols_text/
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <span className="font-medium">קבצים מחולקים לפי דוברים:</span>{" "}
                  <a 
                    href="https://production.oknesset.org/pipelines/data/committees/meeting_protocols_parts/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 inline-flex"
                  >
                    https://production.oknesset.org/pipelines/data/committees/meeting_protocols_parts/
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Plenum */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🏛️ מליאה</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">plenum/kns_plenumsession</TableCell>
                  <TableCell>ישיבות המליאה</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">plenum/kns_plmsessionitem</TableCell>
                  <TableCell>פריטים הקשורים לישיבות</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">plenum/kns_documentplenumsession</TableCell>
                  <TableCell>מסמכים נלווים לישיבות</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Votes */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🗳️ הצבעות</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">votes/view_vote_rslts_hdr_approved</TableCell>
                  <TableCell>נתוני הצבעות – בעד/נגד/נמנעים</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">votes/view_vote_rslts_hdr_approved_extra</TableCell>
                  <TableCell>מידע מורחב על הצבעות</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">votes/vote_rslts_kmmbr_shadow</TableCell>
                  <TableCell>פירוט הצבעות לפי ח"כ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">votes/vote_rslts_kmmbr_shadow_extra</TableCell>
                  <TableCell>הרחבה של פירוט ההצבעות עם מידע מקושר</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Lobbyists */}
          <div>
            <h3 className="text-xl font-semibold mb-4">💼 לוביסטים</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>טבלה</TableHead>
                  <TableHead>תיאור</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">lobbyists/v_lobbyist</TableCell>
                  <TableCell>רשימת שדלנים</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">lobbyists/v_lobbyist_clients</TableCell>
                  <TableCell>לקוחות של שדלנים</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Want to Help? */}
      <Card>
        <CardHeader>
          <CardTitle>🤝 רוצים לעזור?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            אנחנו תמיד שמחים לשיתופי פעולה, פידבק ותרומות קוד.
          </p>
          <p>
            ניתן להצטרף דרך{" "}
            <a 
              href="https://github.com/hasadna/knesset-data-pipelines" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 inline-flex"
            >
              מאגר הקוד GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
