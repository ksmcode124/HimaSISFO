"use client";
import { NavigationBar, SiteFooter } from "@/components/layout";
import { navItems } from "@/features/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="overflow-hidden" suppressHydrationWarning>
        <NavigationBar items={navItems} />
        <main className="flex flex-col min-h-screen overflow-visible">
          <div className="relative flex-1">
            {children}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  )
}
