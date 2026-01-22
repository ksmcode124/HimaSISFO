// components/layout/ShellLayer.tsx
import React from "react";

export function ShellLayer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate w-full overflow-x-clip">
      {children}
    </div>
  );
}
