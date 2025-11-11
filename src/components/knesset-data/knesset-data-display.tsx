import fs from 'fs';
import path from 'path';
import { Accordion } from '@/components/ui/accordion';
import KnessetMembers from './knesset-members';

interface Member {
  name: string;
  position: string | null;
  contact: string | null;
  image_url: string | null;
  additional_info: {
    profile_url: string;
  };
}

interface Party {
  party_name: string;
  members: Member[];
}

interface KnessetData {
  knesset_number: number;
  parties: Party[];
}

async function getKnessetData(): Promise<KnessetData[]> {
  const dataDir = path.join(process.cwd(), 'src', 'app', 'knesset-data', 'members_data');
  const summaryPath = path.join(dataDir, 'scraping_summary.json');
  
  try {
    const summaryContent = await fs.promises.readFile(summaryPath, 'utf-8');
    const summary = JSON.parse(summaryContent);

    const knessetDataPromises = summary.extracted_data
      .sort((a: any, b: any) => b.knesset - a.knesset) // Sort descending by Knesset number
      .map(async (knessetInfo: any) => {
        const filePath = path.join(dataDir, `knesset_${knessetInfo.knesset}.json`);
        try {
          const fileContent = await fs.promises.readFile(filePath, 'utf-8');
          return JSON.parse(fileContent);
        } catch (error) {
          console.error(`Error reading or parsing ${filePath}:`, error);
          return null;
        }
      });

    const knessetData = await Promise.all(knessetDataPromises);
    return knessetData.filter((data): data is KnessetData => data !== null);
  } catch (error) {
    console.error(`Error reading or parsing summary file ${summaryPath}:`, error);
    return [];
  }
}

export default async function KnessetDataDisplay() {
  const allKnessetData = await getKnessetData();

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {allKnessetData.map((knesset) => (
          <KnessetMembers key={knesset.knesset_number} knessetData={knesset} />
        ))}
      </Accordion>
    </div>
  );
}
