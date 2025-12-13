import { notFound } from 'next/navigation';
import { fetchUnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import { Metadata } from 'next';
import TableOfContents from '@/components/knesset/table-of-contents';
import OverviewSection from '@/components/knesset/sections/overview-section';
import TimelineSection from '@/components/knesset/sections/timeline-section';
import PartiesSection from '@/components/knesset/sections/parties-section';
import MembersSection from '@/components/knesset/sections/members-section';
import CommitteesSection from '@/components/knesset/sections/committees-section';
import BillsSection from '@/components/knesset/sections/bills-section';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ScrollToTopButton from '@/components/knesset/scroll-to-top-button';

interface KnessetHubPageParams {
  params: {
    knesset_number: string;
  };
}

export async function generateMetadata({ params }: KnessetHubPageParams): Promise<Metadata> {
  const knessetNum = parseInt(params.knesset_number, 10);
  
  return {
    title: `כנסת ${knessetNum} | כנסת פתוחה`,
    description: `מידע מקיף על הכנסת ה-${knessetNum} - חברי כנסת, סיעות, ועדות, חוקים והצבעות`,
  };
}

export default async function KnessetHubPage({ params }: KnessetHubPageParams) {
  const knessetNum = parseInt(params.knesset_number, 10);

  // Validate knesset number
  if (isNaN(knessetNum) || knessetNum < 1 || knessetNum > getCurrentKnessetNum()) {
    notFound();
  }

  // Fetch knesset data
  const knessetData = await fetchUnifiedKnessetData(knessetNum);

  if (!knessetData) {
    notFound();
  }

  const currentKnesset = getCurrentKnessetNum();
  const isCurrent = knessetNum === currentKnesset;

  // Define sections for navigation
  const sections = [
    { id: 'overview', title: 'סקירה כללית' },
    { id: 'timeline', title: 'ציר זמן' },
    { id: 'parties', title: 'סיעות' },
    { id: 'members', title: 'חברי כנסת' },
    { id: 'committees', title: 'ועדות' },
    { id: 'bills', title: 'הצעות חוק וחוקים' },
  ];

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      {/* Header with Table of Contents */}
      <div className="mb-8 border-b pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_300px] gap-6">
          {/* Main Header Content */}
          <div className="text-right">
            <div className="flex items-center gap-3 mb-4 justify-end flex-row-reverse">
              <h1 className="text-4xl font-bold">הכנסת ה-{knessetNum}</h1>
              {isCurrent && (
                <Badge variant="default" className="text-lg px-3 py-1">
                  נוכחית
                </Badge>
              )}
            </div>
            <div className="text-lg text-muted-foreground space-y-1 text-right">
              <p>{knessetData.totalParties} סיעות • {knessetData.totalMembers} חברי כנסת</p>
            </div>
            
            {/* Period Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-right">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">תאריך התחלה</p>
                <p className="text-sm font-medium">
                  {knessetData.startDate 
                    ? new Date(knessetData.startDate).toLocaleDateString('he-IL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'לא זמין'}
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">תאריך סיום</p>
                <p className="text-sm font-medium">
                  {knessetData.finishDate 
                    ? new Date(knessetData.finishDate).toLocaleDateString('he-IL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'עדיין פעילה'}
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Divider - Hidden on mobile */}
          <Separator orientation="vertical" className="hidden lg:block h-auto" />

          {/* Table of Contents */}
          <div className="lg:min-w-[280px]">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24">
          <OverviewSection knessetData={knessetData} />
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="scroll-mt-24">
          <TimelineSection knessetData={knessetData} />
        </section>

        {/* Parties Section */}
        <section id="parties" className="scroll-mt-24">
          <PartiesSection knessetData={knessetData} />
        </section>

        {/* Members Section */}
        <section id="members" className="scroll-mt-24">
          <MembersSection knessetData={knessetData} />
        </section>

        {/* Committees Section */}
        <section id="committees" className="scroll-mt-24">
          <CommitteesSection knessetData={knessetData} />
        </section>

        {/* Bills Section */}
        <section id="bills" className="scroll-mt-24">
          <BillsSection knessetData={knessetData} />
        </section>
      </div>

      {/* Footer Note */}
      <div className="mt-16 p-6 bg-muted rounded-lg text-right">
        <p className="text-sm text-muted-foreground">
          עדכון אחרון: {new Date(knessetData.lastUpdated).toLocaleDateString('he-IL')} | 
          הנתונים מתעדכנים באופן יומי ממקורות רשמיים של הכנסת
        </p>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

// Generate static params for known Knessets
export async function generateStaticParams() {
  const currentKnesset = getCurrentKnessetNum();
  
  // Generate params for all Knessets from 1 to current
  return Array.from({ length: currentKnesset }, (_, i) => ({
    knesset_number: String(i + 1),
  }));
}


