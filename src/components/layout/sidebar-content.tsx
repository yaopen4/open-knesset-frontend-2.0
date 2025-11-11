import { Landmark, LayoutDashboard, Users, FileText, Vote, Gavel, Settings, LifeBuoy, Info, Database, BookCheck, UsersRound, Scale, Search, Code } from 'lucide-react'
import {
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import Link from 'next/link'

export default function AppSidebarContent() {
  return (
    <>
      <SidebarHeader>
        <Link href="#" className="flex items-center gap-2">
          <Landmark className="size-7 text-primary" />
          <h2 className="font-headline text-xl font-semibold">Open Knesset</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive tooltip="דאשבורד">
              <Link href="#">
                <LayoutDashboard />
                <span>דאשבורד</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="אודות כנסת פתוחה">
              <Link href="#">
                <Info />
                <span>אודות כנסת פתוחה</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="נתוני כנסת">
              <Link href="#">
                <Database />
                <span>נתוני כנסת</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="ח״כים וסיעות">
              <Link href="#">
                <Users />
                <span>ח״כים וסיעות</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="הצעות חוק">
              <Link href="#">
                <FileText />
                <span>הצעות חוק</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="ועדות">
              <Link href="#">
                <Gavel />
                <span>ועדות</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="מליאות והצבעות">
              <Link href="#">
                <Vote />
                <span>מליאות והצבעות</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="חוקים">
              <Link href="#">
                <BookCheck />
                <span>חוקים</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="לוביסטים">
              <Link href="#">
                <UsersRound />
                <span>לוביסטים</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="חיפוש מתקדם">
              <Link href="#">
                <Search />
                <span>חיפוש מתקדם</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="למפתחים">
              <Link href="#">
                <Code />
                <span>למפתחים</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="עזרה">
              <Link href="#">
                <LifeBuoy />
                <span>עזרה</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="הגדרות">
              <Link href="#">
                <Settings />
                <span>הגדרות</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
