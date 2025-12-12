import fs from 'fs';
import path from 'path';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import KnessetCard from '@/components/knessets/knesset-card';

interface KnessetSummary {
  knessetNum: number;
  totalMembers: number;
  totalParties: number;
  startDate?: string | null;
  finishDate?: string | null;
}

async function getKnessetSummary(): Promise<KnessetSummary[]> {
  const dataDir = path.join(process.cwd(), 'src', 'app', 'knesset-data', '[knesset_number]', 'members_data');
  const summaryPath = path.join(dataDir, 'scraping_summary.json');
  
  try {
    const summaryContent = await fs.promises.readFile(summaryPath, 'utf-8');
    const summary = JSON.parse(summaryContent);
    
    return summary.extracted_data
      .map((k: { knesset: number; total_members: number; total_parties: number }) => ({
        knessetNum: k.knesset,
        totalMembers: k.total_members,
        totalParties: k.total_parties,
        startDate: null,
        finishDate: null,
      }))
      .sort((a: KnessetSummary, b: KnessetSummary) => b.knessetNum - a.knessetNum);
  } catch (error) {
    console.error(`Error reading or parsing summary file ${summaryPath}:`, error);
    return [];
  }
}

export default async function AllKnessetsPage() {
  const currentKnesset = getCurrentKnessetNum();
  const knessetsSummary = await getKnessetSummary();

  const validKnessets = knessetsSummary.filter(k => k.knessetNum > 0 && k.totalMembers > 0);

  if (validKnessets.length === 0) {
    return (
      <div className="mx-auto grid w-full max-w-[1200px] gap-8">
        <div className="space-y-2 text-right">
          <h1 className="font-headline text-3xl font-bold">כל כנסות ישראל</h1>
          <p className="text-muted-foreground">לא נמצאו נתונים</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8" dir="rtl">
      <div className="space-y-2 text-right">
        <h1 className="font-headline text-3xl font-bold">כל כנסות ישראל</h1>
        <p className="text-muted-foreground">
          כאן תוכלו למצוא נתונים מפורטים על הרכב כל הכנסות בישראל, מהכנסת הראשונה ועד היום.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {validKnessets.map((knessetSummary) => (
          <KnessetCard 
            key={knessetSummary.knessetNum} 
            knessetNum={knessetSummary.knessetNum}
            summary={knessetSummary}
            isCurrent={knessetSummary.knessetNum === currentKnesset}
          />
        ))}
      </div>
    </div>
  );
}

