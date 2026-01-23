// components/layout/ShellLayer.tsx
import { cn } from "@/lib/utils";
import React from "react";

export function ShellLayer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("relative isolate w-full overflow-x-clip", className)}>
      {children}
    </div>
  );
}
