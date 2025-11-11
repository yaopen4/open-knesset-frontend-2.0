import Header from "@/components/layout/header"
import RecentBillsTable from "@/components/dashboard/recent-bills-table"
import SidebarContent from "@/components/layout/sidebar-content"
import { Sidebar } from "@/components/ui/sidebar"

export default function BillsPage() {
  return (
    <>
      <Sidebar side="right">
        <SidebarContent />
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          <div className="mx-auto grid w-full max-w-[1200px] gap-8">
            <RecentBillsTable />
          </div>
        </main>
      </div>
    </>
  )
}
