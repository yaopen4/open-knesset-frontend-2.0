import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileCheck, ClipboardList, Mic } from "lucide-react"

const stats = [
  { title: "ח\"כים פעילים", value: "120", icon: Users },
  { title: "הצעות חוק שעברו", value: "1,234", icon: FileCheck },
  { title: "הצבעות החודש", value: "56", icon: ClipboardList },
  { title: "נאומים במליאה", value: "89", icon: Mic },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
