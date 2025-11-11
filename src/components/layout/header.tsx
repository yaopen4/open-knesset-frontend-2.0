"use client"

import { Search, Bell } from 'lucide-react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function Header() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 shadow-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      
      <div className="relative flex-1">
        <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="חיפוש..."
          className="w-full rounded-lg bg-background pr-8 md:w-[280px] lg:w-[320px]"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
              {userAvatar ? (
                <Image
                  src={userAvatar.imageUrl}
                  width={40}
                  height={40}
                  alt={userAvatar.description}
                  data-ai-hint={userAvatar.imageHint}
                  className="rounded-full object-cover"
                />
              ) : <span className="text-sm font-semibold">JD</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>החשבון שלי</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>הגדרות</DropdownMenuItem>
            <DropdownMenuItem>תמיכה</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>התנתקות</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
