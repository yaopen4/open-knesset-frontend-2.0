import Header from "@/components/layout/header"
import PartyDistributionChart from "@/components/dashboard/party-distribution-chart"
import RecentBillsTable from "@/components/dashboard/recent-bills-table"
import SidebarContent from "@/components/layout/sidebar-content"
import StatsCards from "@/components/dashboard/stats-cards"
import VotingActivityChart from "@/components/dashboard/voting-activity-chart"
import { Sidebar } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <>
      <Sidebar side="right">
        <SidebarContent />
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          <div className="mx-auto grid w-full max-w-[1200px] gap-8">
            <div className="flex items-center justify-between">
              <h1 className="font-headline text-3xl font-bold">לוח מחוונים</h1>
            </div>
            <StatsCards />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <VotingActivityChart className="lg:col-span-3" />
              <PartyDistributionChart className="lg:col-span-2" />
            </div>
            <RecentBillsTable />
          </div>
        </main>      
      </div>
    </>
  )
}
