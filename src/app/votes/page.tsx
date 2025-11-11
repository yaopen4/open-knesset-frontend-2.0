import VotingActivityChart from "@/components/dashboard/voting-activity-chart";

export default function VotesPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <h1 className="font-headline text-3xl font-bold">מליאות והצבעות</h1>
      <VotingActivityChart />
    </div>
  );
}
