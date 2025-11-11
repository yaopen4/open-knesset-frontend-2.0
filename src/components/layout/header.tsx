
"use client"

import { Search, Bug, CircleDollarSign, Globe, Github } from 'lucide-react'
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Link from 'next/link'
import { Moon, Sun } from "lucide-react"

function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full hover:bg-transparent transition-transform hover:scale-125 hover:text-foreground"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Header() {
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

      <div className="flex items-center gap-0">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent transition-transform hover:scale-125 hover:text-foreground" asChild>
          <Link href="#" aria-label="GitHub">
            <GithubIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent transition-transform hover:scale-125 hover:text-foreground" asChild>
          <Link href="/report-bug" aria-label="Report a bug">
            <Bug className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent transition-transform hover:scale-125 hover:text-foreground" asChild>
          <Link href="#" aria-label="Donate">
            <CircleDollarSign className="h-5 w-5" />
          </Link>
        </Button>

        <ThemeToggleButton />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent transition-transform hover:scale-125 hover:text-foreground">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              עברית
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
