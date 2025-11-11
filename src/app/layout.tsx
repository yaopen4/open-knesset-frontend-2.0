import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/ui/sidebar';
import SidebarContent from '@/components/layout/sidebar-content';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Open Knesset Revamp',
  description: 'Israeli parliamentary data, demystified.',
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
      <body className={cn("font-body antialiased min-h-screen flex")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SidebarProvider>
            <Sidebar side="right">
              <SidebarContent />
            </Sidebar>
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
