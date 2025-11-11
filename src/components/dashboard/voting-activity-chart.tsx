"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "ינואר", votes: 186 },
  { month: "פברואר", votes: 305 },
  { month: "מרץ", votes: 237 },
  { month: "אפריל", votes: 73 },
  { month: "מאי", votes: 209 },
  { month: "יוני", votes: 214 },
];

const chartConfig = {
  votes: {
    label: "הצבעות",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function VotingActivityChart({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>פעילות הצבעות</CardTitle>
        <CardDescription>ינואר - יוני 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              reversed={true}
            />
            <YAxis reversed={true} orientation="right" tickMargin={10} axisLine={false} tickLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="votes" fill="var(--color-votes)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
