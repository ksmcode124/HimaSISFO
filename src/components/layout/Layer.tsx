// components/layout/Layer.tsx
import React from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

type LayerProps = {
  children?: React.ReactNode;
  className?: string;
};
export function BackgroundLayer({ children, className }: LayerProps) {
  return (
    <div className={clsx("absolute inset-0 z-0 pointer-events-none", className)}>
      {children}
    </div>
  );
}

export function DecorationLayer({ children, className }: LayerProps) {
  return (
    <div
      className={clsx("absolute inset-0 z-5 pointer-events-none", className)}>
      {children}
    </div>
  );
}

export function ContentLayer({ children, className }: LayerProps) {
  return (
    <div className={clsx("relative inset-0 z-10", className)}>
      {children}
    </div>
  );
}

export function OverlayLayer({ children, className }: LayerProps) {
  return (
    <div className={clsx("absolute z-20", className)}>
      {children}
    </div>
  );
}

export function ModalLayer({ children, className }: LayerProps) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-[9999] grid place-items-center bg-black/40",
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
}
