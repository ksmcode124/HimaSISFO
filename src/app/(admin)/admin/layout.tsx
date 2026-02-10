'use client'

import '@/app/globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/admin';

import { cn } from '@/lib/utils/cn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider className="bg-white">
        <AppSidebar />
        <main className={cn('w-full p-8 max-h-svh')}>
          {children}
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}