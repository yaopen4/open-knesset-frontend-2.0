import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import Link from 'next/link';
import { Users } from 'lucide-react';

interface PartiesSectionProps {
  knessetData: UnifiedKnessetData;
}

export default function PartiesSection({ knessetData }: PartiesSectionProps) {
  // Extract unique parties from members data
  const partiesMap = new Map<string, { name: string; memberCount: number; members: any[] }>();
  
  knessetData.members.forEach(member => {
    const factionName = member.factionName || 'לא ידוע';
    if (!partiesMap.has(factionName)) {
      partiesMap.set(factionName, { name: factionName, memberCount: 0, members: [] });
    }
    const party = partiesMap.get(factionName)!;
    party.memberCount++;
    party.members.push(member);
  });

  const parties = Array.from(partiesMap.values()).sort((a, b) => b.memberCount - a.memberCount);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2">סיעות</h2>
        <p className="text-muted-foreground">
          רשימת הסיעות בכנסת ה-{knessetData.knessetNum}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parties.map((party, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-right">
                {party.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-right">
              <div className="flex items-center gap-2 text-muted-foreground flex-row-reverse justify-end">
                <span className="text-sm">{party.memberCount} חברי כנסת</span>
                <Users className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

