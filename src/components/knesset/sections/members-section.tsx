import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { extractOfficeholders } from '@/lib/knesset-utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { User } from 'lucide-react';

interface MembersSectionProps {
  knessetData: UnifiedKnessetData;
}

export default function MembersSection({ knessetData }: MembersSectionProps) {
  const officeholders = extractOfficeholders(knessetData);

  // Collect all key position holders
  const keyPositionHolders = new Set<number>();
  [
    ...officeholders.primeMinister,
    ...officeholders.president,
    ...officeholders.speaker,
    ...officeholders.deputySpeakers,
    ...officeholders.oppositionLeader,
    ...officeholders.committeeChairs,
  ].forEach(oh => keyPositionHolders.add(oh.personId));

  const keyMembers = knessetData.members.filter(m => keyPositionHolders.has(m.personId));
  const regularMembers = knessetData.members.filter(m => !keyPositionHolders.has(m.personId));

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2">חברי כנסת</h2>
        <p className="text-muted-foreground">
          {knessetData.totalMembers} חברי כנסת בכנסת ה-{knessetData.knessetNum}
        </p>
      </div>

      {/* Key Positions */}
      {keyMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-right">בעלי תפקידים מרכזיים</CardTitle>
            <CardDescription className="text-right">
              {keyMembers.length} חברי כנסת בתפקידי מפתח
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyMembers.map((member) => (
                <Link
                  key={member.personId}
                  href={`/mks/${member.personId}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors flex-row-reverse"
                >
                  <div className="flex-1 text-right">
                    <p className="font-medium">{member.name.firstName} {member.name.lastName}</p>
                    <p className="text-sm text-muted-foreground">{member.factionName}</p>
                  </div>
                  <Avatar>
                    <AvatarImage src={member.image || undefined} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Members Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">כל חברי הכנסת</CardTitle>
          <CardDescription className="text-right">
            רשימה מלאה של כל {knessetData.totalMembers} חברי הכנסת
          </CardDescription>
        </CardHeader>
        <CardContent className="text-right">
          <p className="text-muted-foreground">
            לצפייה ברשימה המלאה של כל חברי הכנסת, השתמשו בפילטרים למעלה או בחפשו לפי שם.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            סה״כ: {regularMembers.length} חברים נוספים
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

