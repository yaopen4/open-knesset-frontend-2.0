import { Landmark, LayoutDashboard, Users, FileText, Vote, Gavel, Settings, LifeBuoy } from 'lucide-react'
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
            <SidebarMenuButton asChild isActive tooltip="לוח מחוונים">
              <Link href="#">
                <LayoutDashboard />
                <span>לוח מחוונים</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="חברי כנסת">
              <Link href="#">
                <Users />
                <span>חברי כנסת</span>
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
            <SidebarMenuButton asChild tooltip="הצבעות">
              <Link href="#">
                <Vote />
                <span>הצבעות</span>
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
