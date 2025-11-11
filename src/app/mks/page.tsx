import PartyDistributionChart from "@/components/dashboard/party-distribution-chart";

export default function MKsPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <h1 className="font-headline text-3xl font-bold">ח"כים וסיעות</h1>
      <PartyDistributionChart />
    </div>
  );
}
