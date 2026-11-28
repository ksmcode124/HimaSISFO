import React from "react";
import { cn } from "@/lib/utils";

type ShellLayerProps = {
  children: React.ReactNode;
  className?: string;

  /**
   * Background color as a CSS value.
   * Examples: "#fff", "rgb(0 0 0)", "var(--bg)", "hsl(var(--background))"
   */
  backgroundColor?: string;

  /**
   * Escape hatch for additional inline styles.
   * Applied after backgroundColor.
   */
  style?: React.CSSProperties;
};

export function ShellLayer({
  children,
  className,
  backgroundColor,
  style,
}: ShellLayerProps) {
  return (
    <div
      className={cn("relative isolate w-full overflow-x-clip", className)}
      style={{
        ...(backgroundColor ? { backgroundColor } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
