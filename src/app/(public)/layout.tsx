import { NavigationBar, SiteFooter } from "@/components/layout";
import { navItems } from "@/features/navigation";
import React from "react";

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
    
    <main className="overflow-hidden">
      <NavigationBar items={navItems} />
      {children}
      <SiteFooter />
    </main>
    
    </>
  )
}
