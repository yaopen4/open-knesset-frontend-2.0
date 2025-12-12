import { notFound } from 'next/navigation';
import { fetchUnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import { Metadata } from 'next';
import SectionNavigation from '@/components/knesset/section-navigation';
import OverviewSection from '@/components/knesset/sections/overview-section';
import TimelineSection from '@/components/knesset/sections/timeline-section';
import PartiesSection from '@/components/knesset/sections/parties-section';
import MembersSection from '@/components/knesset/sections/members-section';
import CommitteesSection from '@/components/knesset/sections/committees-section';
import BillsSection from '@/components/knesset/sections/bills-section';
import { Badge } from '@/components/ui/badge';

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
      {/* Header */}
      <div className="mb-8 text-right border-b pb-6">
        <div className="flex items-center justify-end gap-3 mb-4">
          <h1 className="text-4xl font-bold">הכנסת ה-{knessetNum}</h1>
          {isCurrent && (
            <Badge variant="default" className="text-lg px-3 py-1">
              נוכחית
            </Badge>
          )}
        </div>
        <div className="text-lg text-muted-foreground space-y-1">
          <p>{knessetData.totalParties} סיעות • {knessetData.totalMembers} חברי כנסת</p>
          {knessetData.startDate && (
            <p className="text-sm">
              {new Date(knessetData.startDate).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
              {knessetData.finishDate && ` - ${new Date(knessetData.finishDate).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}`}
              {!knessetData.finishDate && ' - עד היום'}
            </p>
          )}
        </div>
      </div>

      {/* Section Navigation */}
      <div className="mb-8">
        <SectionNavigation sections={sections} />
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

