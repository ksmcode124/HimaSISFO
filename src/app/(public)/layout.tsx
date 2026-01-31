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
    <NavigationBar items={navItems} />
    <main className="pb-5 pt-18">
      {children}
    </main>
    <SiteFooter />
    </>
  )
}
