"use client"

import { Landmark, Home, Users, FileText, Vote, Gavel, BookCheck, UsersRound, Search, Code, LayoutDashboard, ChevronsRightLeft } from 'lucide-react'
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
    { href: "/", icon: Home, label: "ראשי", tooltip: "ראשי" },
    { href: "/dashboard", icon: LayoutDashboard, label: "היום בכנסת", tooltip: "היום בכנסת" },
    { href: "/mks", icon: Users, label: "ח״כים וסיעות", tooltip: "ח״כים וסיעות" },
    { href: "/bills", icon: FileText, label: "הצעות חוק", tooltip: "הצעות חוק" },
    { href: "/committees", icon: Gavel, label: "ועדות", tooltip: "ועדות" },
    { href: "/plenums", icon: Vote, label: "מליאות והצבעות", tooltip: "מליאות והצבעות" },
    { href: "/laws", icon: BookCheck, label: "חוקים", tooltip: "חוקים" },
    { href: "/lobbyists", icon: UsersRound, label: "לוביסטים", tooltip: "לוביסטים" },
    { href: "/search", icon: Search, label: "חיפוש מתקדם", tooltip: "חיפוש מתקדם" },
    { href: "/developers", icon: Code, label: "למפתחים", tooltip: "למפתחים" },
]

export default function AppSidebarContent() {
  const pathname = usePathname()
  const { toggleSidebar, state } = useSidebar()

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Landmark className="size-7 text-primary" />
          <h2 className="font-headline text-xl font-semibold group-data-[state=collapsed]:hidden">כנסת פתוחה</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href || (item.href === '/mks' && pathname.startsWith('/knesset-data'))} tooltip={item.tooltip}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleSidebar} tooltip={state === 'expanded' ? 'כווץ' : 'הרחב'}>
                    <ChevronsRightLeft />
                    <span>{state === 'expanded' ? 'כווץ תפריט' : ''}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
