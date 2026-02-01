"use client"
import React, { useState, useEffect } from "react";
import { DecorationLayer } from "@/components/layout/Layer";
import { CalendarLeftDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";

const DECORATION_HEIGHT = {
  md: 300,
  lg: 600
};

export function DecorationRepeater() {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [isMobile]);

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const observer = new ResizeObserver(entries => {
      const height = entries[0].contentRect.height
      const unit = isMobile ? DECORATION_HEIGHT.md : DECORATION_HEIGHT.lg
      setCount(Math.floor(height / unit))
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <DecorationLayer
      ref={ref}
      className="relative h-full"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-fit"
          style={{ top: i * (isMobile ? DECORATION_HEIGHT.md : DECORATION_HEIGHT.lg) }}
        >
          <CalendarLeftDecoration className="absolute left-0" />
          <CalendarRightDecoration className="absolute right-0" />
        </div>
      ))}
    </DecorationLayer>
  );
}
