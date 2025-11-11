"use client"

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ConditionalFooter() {
    const pathname = usePathname();

    if (pathname !== '/') {
        return null;
    }

    return (
        <footer className={cn(
            "fixed bottom-0 bg-primary py-2 text-center text-primary-foreground text-sm z-40 w-full",
            "md:right-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]",
            "group-data-[sidebar-state=collapsed]/sidebar-wrapper:md:right-[var(--sidebar-width-icon)] group-data-[sidebar-state=collapsed]/sidebar-wrapper:md:w-[calc(100%-var(--sidebar-width-icon))]",
            "transition-all duration-200 ease-linear"
          )}>
            <p>© הסדנא לידע ציבורי (ע"ר) 2025</p>
        </footer>
    )
}
