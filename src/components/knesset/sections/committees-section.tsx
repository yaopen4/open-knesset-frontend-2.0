import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { extractOfficeholders } from '@/lib/knesset-utils';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

interface CommitteesSectionProps {
  knessetData: UnifiedKnessetData;
}

export default function CommitteesSection({ knessetData }: CommitteesSectionProps) {
  const officeholders = extractOfficeholders(knessetData);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2">ועדות</h2>
        <p className="text-muted-foreground">
          ועדות הכנסת הקבועות בכנסת ה-{knessetData.knessetNum}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">ועדות קבועות</CardTitle>
          <CardDescription className="text-right">
            {officeholders.committeeChairs.length > 0 
              ? `${officeholders.committeeChairs.length} ועדות פעילות`
              : 'נתוני ועדות יועלו בקרוב'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {officeholders.committeeChairs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {officeholders.committeeChairs.map((chair, index) => (
                <div key={index} className="p-4 border rounded-lg text-right">
                  <div className="flex items-start justify-between mb-2 flex-row-reverse">
                    <h3 className="font-semibold text-lg">{chair.committeeName}</h3>
                    <Badge variant="outline">יו״ר</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    יו״ר: {chair.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>נתוני ועדות יועלו בעדכון הבא</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

