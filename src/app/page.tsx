import PartyDistributionChart from "@/components/dashboard/party-distribution-chart"
import StatsCards from "@/components/dashboard/stats-cards"

export default function Home() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">דאשבורד</h1>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <PartyDistributionChart className="lg:col-span-5" />
      </div>
    </div>
  )
}
