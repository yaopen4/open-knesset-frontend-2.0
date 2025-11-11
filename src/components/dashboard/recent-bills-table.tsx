import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const bills = [
  { id: "HB-1234", title: "חוק הגנת הסביבה (תיקון מס' 5)", status: "אושר", sponsor: "תמר זנדברג", date: "2024-06-15" },
  { id: "HB-5678", title: "חוק חינוך ממלכתי (תיקון מס' 21)", status: "נדחה", sponsor: "יפעת שאשא ביטון", date: "2024-06-14" },
  { id: "HB-9101", title: "חוק שירותי רווחה לאנשים עם מוגבלות", status: "בוועדה", sponsor: "ניר אורבך", date: "2024-06-12" },
  { id: "HB-1121", title: "הצעת חוק-יסוד: החקיקה", status: "טרום קריאה", sponsor: "גדעון סער", date: "2024-06-11" },
  { id: "HB-3141", title: "חוק למניעת אלימות במשפחה (הוראת שעה)", status: "אושר", sponsor: "מיכל רוזין", date: "2024-06-10" },
];

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "אושר": "default",
  "נדחה": "destructive",
  "בוועדה": "secondary",
  "טרום קריאה": "outline",
};

export default function RecentBillsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>הצעות חוק אחרונות</CardTitle>
        <CardDescription>עדכונים מהשבוע האחרון</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>מזהה</TableHead>
              <TableHead className="min-w-[200px]">כותרת</TableHead>
              <TableHead>סטטוס</TableHead>
              <TableHead>יוזם/ת</TableHead>
              <TableHead className="text-left">תאריך</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">{bill.id}</TableCell>
                <TableCell>{bill.title}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[bill.status] || "secondary"}>
                    {bill.status}
                  </Badge>
                </TableCell>
                <TableCell>{bill.sponsor}</TableCell>
                <TableCell className="text-left">{bill.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
