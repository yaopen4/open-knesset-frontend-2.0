import { loadKnessetIndex, loadStaticKnesset } from '@/lib/data/static-loader';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface KnessetInfo {
  knesset: number;
  total_members: number;
  total_parties: number;
}

async function getKnessetSummary(): Promise<KnessetInfo[]> {
  const currentKnesset = getCurrentKnessetNum();
  const index = loadKnessetIndex();
  
  // Use index data if available
  if (index && index.knessets.length > 0) {
    return index.knessets
      .map((k: { knessetNum: number; totalMembers: number; totalParties: number }) => ({
        knesset: k.knessetNum,
        total_members: k.totalMembers,
        total_parties: k.totalParties,
      }))
      .sort((a: KnessetInfo, b: KnessetInfo) => b.knesset - a.knesset);
  }

  // If no index, try to load from static files for recent knessets
  const recentKnessets = Array.from({ length: Math.min(10, currentKnesset) }, (_, i) => currentKnesset - i);
  const knessetsData: KnessetInfo[] = [];

  for (const knessetNum of recentKnessets) {
    const staticData = loadStaticKnesset(knessetNum);
    if (staticData) {
      knessetsData.push({
        knesset: staticData.knessetNum,
        total_members: staticData.totalMembers,
        total_parties: staticData.totalParties,
      });
    }
  }

  return knessetsData.sort((a, b) => b.knesset - a.knesset);
}

export default async function MembersList() {
  const knessetList = await getKnessetSummary();

  return (
    <div className="flex flex-col gap-4">
      {knessetList.map((knesset) => (
        <Link href={`/knesset/${knesset.knesset}`} key={knesset.knesset}>
          <Card className="h-full transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">הכנסת ה-{knesset.knesset}</CardTitle>
              <CardDescription>
                <p>{knesset.total_parties} סיעות</p>
                <p>{knesset.total_members} חברים</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
