// src/app/(public)/layout.tsx
import { NavigationBar } from "@/components/layout";
import { navItems } from "@/features/navigation";

import { BackgroundLayer } from "@/components/layout/Layer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center w-full">
      <NavigationBar items={navItems} />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
