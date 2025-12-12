
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'ראשי',
  '/current-knesset': 'הכנסת הנוכחית',
  '/members': 'ח״כים וסיעות',
  '/past-knessets': 'כל כנסות ישראל',
  '/ministry': 'משרדים',
  '/knesset': 'כנסות',
  '/bills': 'הצעות חוק',
  '/committees': 'ועדות',
  '/votes': 'מליאות והצבעות',
  '/laws': 'חוקים',
  '/lobbyists': 'לוביסטים',
  '/search': 'חיפוש מתקדם',
  '/developers': 'למפתחים',
  '/report-bug': 'דיווח על תקלה',
};

const Breadcrumbs = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(segment => segment);
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    
    let label = breadcrumbNameMap[href] || segment;
    
    // Handle Knesset term routes
    if (href.startsWith('/knesset/') && !href.includes('/members') && !href.includes('/committees') && !href.includes('/bills')) {
      const knessetNumber = pathSegments[index];
      label = `כנסת ${knessetNumber}`;
    } else if (href.startsWith('/knesset/') && href.includes('/members')) {
      label = 'חברים';
    } else if (href.startsWith('/knesset/') && href.includes('/committees')) {
      label = 'ועדות';
    } else if (href.startsWith('/knesset/') && href.includes('/bills')) {
      label = 'הצעות חוק';
    }
    
    // Handle member person routes
    if (href.startsWith('/members/person/')) {
      label = 'חבר כנסת';
    }
    
    // Handle old knesset-data routes (legacy)
    if (href.startsWith('/members/') && !href.startsWith('/members/person')) {
      const knessetNumber = segment;
      label = `הכנסת ה-${knessetNumber}`;
    }

    return { href, label, isLast };
  });

  return (
    <nav aria-label="breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="font-medium text-foreground hover:text-primary">
            ראשי
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            {breadcrumb.isLast ? (
              <span className="font-medium text-foreground">{breadcrumb.label}</span>
            ) : (
              <Link href={breadcrumb.href} className="font-medium text-foreground hover:text-primary">
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
