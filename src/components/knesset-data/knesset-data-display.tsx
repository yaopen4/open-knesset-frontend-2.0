import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface KnessetInfo {
  knesset: number;
  total_members: number;
  total_parties: number;
}

async function getKnessetSummary(): Promise<KnessetInfo[]> {
  const dataDir = path.join(process.cwd(), 'src', 'app', 'knesset-data', 'members_data');
  const summaryPath = path.join(dataDir, 'scraping_summary.json');
  
  try {
    const summaryContent = await fs.promises.readFile(summaryPath, 'utf-8');
    const summary = JSON.parse(summaryContent);

    return summary.extracted_data.sort((a: any, b: any) => b.knesset - a.knesset); // Sort descending
  } catch (error) {
    console.error(`Error reading or parsing summary file ${summaryPath}:`, error);
    return [];
  }
}

export default async function KnessetDataDisplay() {
  const knessetList = await getKnessetSummary();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {knessetList.map((knesset) => (
        <Link href={`/knesset-data/${knesset.knesset}`} key={knesset.knesset}>
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
