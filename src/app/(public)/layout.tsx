import { NavigationBar, SiteFooter } from "@/components/layout";
import { navItems } from "@/features/navigation";
import { LiquidGlass } from "@liquidglass/react";
import React from "react";

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
    
    <main className="pt-18 overflow-hidden">
      <NavigationBar items={navItems} />
      {children}
      <SiteFooter />
    </main>
    
    </>
  )
}
