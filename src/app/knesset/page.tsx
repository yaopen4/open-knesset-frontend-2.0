import { loadKnessetIndex } from '@/lib/data/static-loader';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import KnessetCard from '@/components/knessets/knesset-card';
import { Input } from '@/components/ui/input';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'כל כנסות ישראל | כנסת פתוחה',
  description: 'רשימת כל כנסות ישראל מהראשונה ועד היום',
};

interface KnessetSummary {
  knessetNum: number;
  totalMembers: number;
  totalParties: number;
  startDate?: string | null;
  finishDate?: string | null;
}

async function getKnessetsList(): Promise<KnessetSummary[]> {
  const index = loadKnessetIndex();
  const currentKnesset = getCurrentKnessetNum();
  
  if (index && index.knessets.length > 0) {
    return index.knessets
      .map((k: { knessetNum: number; totalMembers: number; totalParties: number; startDate?: string | null; finishDate?: string | null }) => ({
        knessetNum: k.knessetNum,
        totalMembers: k.totalMembers,
        totalParties: k.totalParties,
        startDate: k.startDate,
        finishDate: k.finishDate,
      }))
      .sort((a: KnessetSummary, b: KnessetSummary) => b.knessetNum - a.knessetNum);
  }

  // Fallback: Generate list from 1 to current
  const fallbackList: KnessetSummary[] = Array.from({ length: currentKnesset }, (_, i) => ({
    knessetNum: currentKnesset - i,
    totalMembers: 120,
    totalParties: 0,
    startDate: null,
    finishDate: null,
  }));

  return fallbackList;
}

export default async function KnessetsIndexPage() {
  const knessetsList = await getKnessetsList();
  const currentKnesset = getCurrentKnessetNum();

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <h1 className="text-4xl font-bold mb-4">כל כנסות ישראל</h1>
        <p className="text-lg text-muted-foreground">
          רשימת כל כנסות ישראל מהראשונה ({knessetsList[knessetsList.length - 1]?.knessetNum || 1}) ועד הכנסת הנוכחית ({currentKnesset})
        </p>
      </div>

      {/* Search/Filter - Future Enhancement */}
      <div className="mb-8 max-w-md">
        <Input 
          type="search" 
          placeholder="חיפוש לפי מספר כנסת..." 
          className="text-right"
          disabled
        />
        <p className="text-sm text-muted-foreground mt-2">חיפוש יתווסף בקרוב</p>
      </div>

      {/* Knesset Cards List */}
      <div className="flex flex-col gap-6">
        {knessetsList.map((knesset) => (
          <KnessetCard
            key={knesset.knessetNum}
            knessetNum={knesset.knessetNum}
            summary={knesset}
            isCurrent={knesset.knessetNum === currentKnesset}
          />
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-12 p-6 bg-muted rounded-lg text-right">
        <h2 className="text-xl font-semibold mb-2">אודות הנתונים</h2>
        <p className="text-muted-foreground">
          הנתונים מתעדכנים באופן יומי ממקורות רשמיים של הכנסת. 
          לחצו על כל כנסת לצפייה בפרטים מלאים, חברי הכנסת, הסיעות, הוועדות והחקיקה.
        </p>
      </div>
    </div>
  );
}


