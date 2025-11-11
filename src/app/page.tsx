import StatsCards from "@/components/dashboard/stats-cards"

export default function Home() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">דאשבורד</h1>
      </div>
      <StatsCards />
    </div>
  )
}
