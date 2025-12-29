import { NavigationBar, SiteFooter } from "@/components/layout";
import { navItems } from "@/features/navigation";
import React from "react";

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <div className="flex items-center flex-col min-h-screen">

        <NavigationBar items={navItems} />
        <main>
          {children}
        </main>
        {/* <SiteFooter /> */}
      </div >
    </>
  )
}