import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/layout/sidebar-content';
import Header from '@/components/layout/header';
import Breadcrumbs from '@/components/layout/breadcrumbs';

export const metadata: Metadata = {
  title: 'Open Knesset Revamp',
  description: 'Israeli parliamentary data, demystified.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SidebarProvider>
            <Sidebar side="right" collapsible="icon">
              <SidebarContent />
            </Sidebar>
            <SidebarInset>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
                  <Breadcrumbs />
                  {children}
                </main>
                <footer className="bg-primary py-2 text-center text-primary-foreground">
                  <p>© הסדנא לידע ציבורי (ע"ר) 2025</p>
                </footer>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
