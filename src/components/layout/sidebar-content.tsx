"use client"

import { Landmark, LayoutDashboard, Users, FileText, Vote, Gavel, Info, Database, BookCheck, UsersRound, Search, Code } from 'lucide-react'
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
    { href: "/", icon: LayoutDashboard, label: "דאשבורד", tooltip: "דאשבורד" },
    { href: "/about", icon: Info, label: "אודות כנסת פתוחה", tooltip: "אודות כנסת פתוחה" },
    { href: "/knesset-data", icon: Database, label: "נתוני כנסת", tooltip: "נתוני כנסת" },
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

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Landmark className="size-7 text-primary" />
          <h2 className="font-headline text-xl font-semibold">כנסת פתוחה</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.tooltip}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  )
}
