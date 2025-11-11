import fs from 'fs';
import path from 'path';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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

interface KnessetPageParams {
  params: {
    knesset_number: string;
  };
}

async function getKnessetData(knessetNumber: string): Promise<KnessetData | null> {
  const dataDir = path.join(process.cwd(), 'src', 'app', 'knesset-data', 'members_data');
  const filePath = path.join(dataDir, `knesset_${knessetNumber}.json`);
  
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error);
    return null;
  }
}

const partyColors = [
  'bg-muted', 'bg-secondary'
];

const getPartyColor = (index: number) => {
  return partyColors[index % partyColors.length];
};

export default async function KnessetPage({ params }: KnessetPageParams) {
  const knessetData = await getKnessetData(params.knesset_number);

  if (!knessetData) {
    return <div>Data for Knesset {params.knesset_number} not found.</div>;
  }

  const { knesset_number, parties } = knessetData;
  const sortedParties = [...parties].sort((a, b) => b.members.length - a.members.length);

  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div className='flex items-center gap-2'>
         <Button asChild variant="outline" size="icon">
            <Link href="/mks">
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        <h1 className="font-headline text-3xl font-bold">הכנסת ה-{knesset_number}</h1>
      </div>
      
      <Accordion type="multiple" className="w-full space-y-2">
        {sortedParties.map((party, index) => (
          <AccordionItem value={party.party_name} key={`${knesset_number}-${party.party_name}-${index}`} className="border rounded-md bg-card">
            <AccordionTrigger className={`w-full px-4 py-3 text-base ${getPartyColor(index)}`}>
              <div className="flex-1 text-right text-card-foreground">
                {party.party_name} ({party.members.length} חברים)
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {party.members.map((member, memberIndex) => (
                <div key={`${member.name}-${memberIndex}`} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.image_url ?? undefined} alt={member.name} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <a
                    href={member.additional_info.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline"
                  >
                    {member.name}
                  </a>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), 'src', 'app', 'knesset-data', 'members_data');
  const summaryPath = path.join(dataDir, 'scraping_summary.json');
  
  try {
    const summaryContent = await fs.promises.readFile(summaryPath, 'utf-8');
    const summary = JSON.parse(summaryContent);

    return summary.extracted_data.map((knesset: any) => ({
      knesset_number: knesset.knesset.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}
