import PartyDistributionChart from "@/components/dashboard/party-distribution-chart";
import KnessetDataDisplay from "@/components/knesset-data/knesset-data-display";

export default function MKsPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">ח"כים וסיעות</h1>
        <p className="text-muted-foreground">
          נתונים עדכניים והיסטוריים על חברי הכנסת והסיעות.
        </p>
      </div>
      <PartyDistributionChart />
      <div className="space-y-2 pt-4">
        <h2 className="font-headline text-2xl font-bold">נתוני כנסת היסטוריים</h2>
        <p className="text-muted-foreground">
          כאן תוכלו למצוא נתונים מפורטים על הרכב כל הכנסות בישראל, מהכנסת הראשונה ועד היום.
        </p>
      </div>
      <KnessetDataDisplay />
    </div>
  );
}
