import RecentBillsTable from "@/components/dashboard/recent-bills-table"

export default function BillsPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <RecentBillsTable />
    </div>
  )
}
