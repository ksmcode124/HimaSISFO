// components/layout/Layer.tsx
import React from "react";
import clsx from "clsx";

type LayerProps = {
  children: React.ReactNode;
  className?: string;
};

export function BaseLayer({ children, className }: LayerProps) {
  return (
    <div className={clsx("relative z-10", className)}>
      {children}
    </div>
  );
}

export function OverlayLayer({ children, className }: LayerProps) {
  return (
    <div className={clsx("absolute inset-0 z-20", className)}>
      {children}
    </div>
  );
}

export function DecorationLayer({ children, className }: LayerProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-0 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
}
