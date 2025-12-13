import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { FileText } from 'lucide-react';

interface BillsSectionProps {
  knessetData: UnifiedKnessetData;
}

export default function BillsSection({ knessetData }: BillsSectionProps) {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2">הצעות חוק וחוקים</h2>
        <p className="text-muted-foreground">
          הצעות חוק וחוקים שהתקבלו בכנסת ה-{knessetData.knessetNum}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-right">הצעות חוק</CardTitle>
            <CardDescription className="text-right">
              הצעות חוק שהוגשו בכנסת זו
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-20 text-muted-foreground" />
            <p className="text-muted-foreground">נתוני הצעות חוק יועלו בקרוב</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-right">חוקים שהתקבלו</CardTitle>
            <CardDescription className="text-right">
              חוקים שעברו בהצלחה את כל הקריאות
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-20 text-muted-foreground" />
            <p className="text-muted-foreground">נתוני חוקים יועלו בקרוב</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

