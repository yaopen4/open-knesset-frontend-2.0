"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { party: "likud", seats: 32, fill: "var(--color-likud)" },
  { party: "yesh-atid", seats: 24, fill: "var(--color-yesh-atid)" },
  { party: "machane", seats: 12, fill: "var(--color-machane)" },
  { party: "shas", seats: 11, fill: "var(--color-shas)" },
  { party: "yahadut", seats: 7, fill: "var(--color-yahadut)" },
  { party: "others", seats: 34, fill: "var(--color-others)" },
]

const chartConfig = {
  seats: {
    label: "מושבים",
  },
  likud: {
    label: "ליכוד",
    color: "hsl(var(--chart-1))",
  },
  "yesh-atid": {
    label: "יש עתיד",
    color: "hsl(var(--chart-2))",
  },
  machane: {
    label: "המחנה הממלכתי",
    color: "hsl(var(--chart-3))",
  },
  shas: {
    label: "ש\"ס",
    color: "hsl(var(--chart-4))",
  },
  yahadut: {
    label: "יהדות התורה",
    color: "hsl(var(--chart-5))",
  },
  others: {
    label: "אחרים",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

export default function PartyDistributionChart({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>התפלגות מפלגות</CardTitle>
        <CardDescription>חלוקת מושבים בכנסת הנוכחית</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="seats" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="seats"
              nameKey="party"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="party" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
