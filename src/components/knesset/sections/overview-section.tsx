import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { extractOfficeholders } from '@/lib/knesset-utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface OverviewSectionProps {
  knessetData: UnifiedKnessetData;
}

export default function OverviewSection({ knessetData }: OverviewSectionProps) {
  const officeholders = extractOfficeholders(knessetData);

  // Count coalition vs opposition parties (if data available)
  // For now, just show basic stats
  const totalMembers = knessetData.totalMembers;
  const totalParties = knessetData.totalParties;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2">סקירה כללית</h2>
        <p className="text-muted-foreground">
          סיכום מצב הכנסת, הרכב הממשלה וסטטיסטיקות מרכזיות
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-right">חברי כנסת</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-right">{totalMembers}</p>
            <p className="text-sm text-muted-foreground text-right">חברי כנסת בסך הכל</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-right">סיעות</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-right">{totalParties}</p>
            <p className="text-sm text-muted-foreground text-right">סיעות בכנסת</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-right">ועדות</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-right">
              {officeholders.committeeChairs.length > 0 ? officeholders.committeeChairs.length : '—'}
            </p>
            <p className="text-sm text-muted-foreground text-right">ועדות קבועות</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Officeholders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">בעלי תפקידים מרכזיים</CardTitle>
          <CardDescription className="text-right">
            נושאי המשרות המרכזיות בכנסת זו
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prime Minister */}
            {officeholders.primeMinister.length > 0 && (
              <div className="text-right">
                <h4 className="font-semibold mb-3 flex items-center justify-end gap-2">
                  <Badge variant="default">ראש הממשלה</Badge>
                </h4>
                <ul className="space-y-2">
                  {officeholders.primeMinister.map((pm, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/mks/${pm.personId}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {pm.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* President */}
            {officeholders.president.length > 0 && (
              <div className="text-right">
                <h4 className="font-semibold mb-3 flex items-center justify-end gap-2">
                  <Badge variant="secondary">נשיא המדינה</Badge>
                </h4>
                <ul className="space-y-2">
                  {officeholders.president.map((p, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/mks/${p.personId}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Speaker */}
            {officeholders.speaker.length > 0 && (
              <div className="text-right">
                <h4 className="font-semibold mb-3 flex items-center justify-end gap-2">
                  <Badge variant="secondary">יו״ר הכנסת</Badge>
                </h4>
                <ul className="space-y-2">
                  {officeholders.speaker.map((s, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/mks/${s.personId}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Opposition Leader */}
            {officeholders.oppositionLeader.length > 0 && (
              <div className="text-right">
                <h4 className="font-semibold mb-3 flex items-center justify-end gap-2">
                  <Badge variant="outline">ראש האופוזיציה</Badge>
                </h4>
                <ul className="space-y-2">
                  {officeholders.oppositionLeader.map((ol, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/mks/${ol.personId}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {ol.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Deputy Speakers */}
          {officeholders.deputySpeakers.length > 0 && (
            <div className="text-right border-t pt-4">
              <h4 className="font-semibold mb-3">סגני יו״ר הכנסת</h4>
              <div className="flex flex-wrap gap-2 justify-end">
                {officeholders.deputySpeakers.map((ds, idx) => (
                  <Link
                    key={idx}
                    href={`/mks/${ds.personId}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {ds.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Show message if no officeholders found */}
          {Object.values(officeholders).every(arr => arr.length === 0) && (
            <p className="text-muted-foreground text-center py-4">
              נתוני בעלי תפקידים יועלו בקרוב
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

