// src/app/(public)/layout.tsx
import { NavigationBar } from "@/components/layout";
import { navItems } from "@/features/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col pt-[110px] w-full">
      <NavigationBar items={navItems} />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
