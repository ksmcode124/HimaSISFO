import { NavigationBar, SiteFooter } from "@/components/layout";
import { navItems } from "@/features/navigation";
import React from "react";

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="overflow-hidden">
      <NavigationBar items={navItems} />
      <main className="flex flex-col min-h-screen overflow-visible">
        <div className="relative flex-1">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
