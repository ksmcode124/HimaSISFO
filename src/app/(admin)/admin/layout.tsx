import '@/app/globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/admin';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils/cn';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider className="bg-white">
        <AppSidebar />
        <main className={cn('w-full p-8 max-h-svh', poppins.variable)}>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}