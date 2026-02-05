"use client"
import { useState, useEffect, useRef } from "react";
import { DecorationLayer } from "@/components/layout/Layer";
import { CalendarLeftDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";

const DECORATION_HEIGHT = {
  md: 300,
  lg: 600,
};

export function DecorationRepeater() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const unit = isMobile ? DECORATION_HEIGHT.md : DECORATION_HEIGHT.lg;

  // observe container height
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      const height = entries[0].contentRect.height;

      if (height < unit) {
        setCount(0); // ❗ ruang tidak cukup → tidak render apa-apa
        return;
      }

      setCount(Math.floor(height / unit));
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [unit]);


  return (
    <DecorationLayer
      ref={ref}
      className="relative h-full"
    >
      {Array.from({ length: count }).map((_, i) => {
        const isFirst = i === 0;
        const isLast = i === count - 1;

        return (
          <div
            key={i}
            className="absolute left-0 right-0 flex justify-center mt-40 md:mt-60"
            style={{
              top: i * unit,
              height: unit,
            }}
          >



            {isFirst && (<div className="absolute flex w-full max-w-[1120px] justify-end -translate-y-1/3 z-25">
              <div
                className="aspect-[1/1] h-[150px] md:h-[400px] bg-no-repeat bg-contain scale-x-[-1] translate-x-10 md:translate-x-40"
                style={{ backgroundImage: "url('/assets/kegiatan/Corak-kalendar.webp')" }}
              />

            </div>)}

            <CalendarLeftDecoration className="absolute left-0" />
            <CalendarRightDecoration className="absolute right-0" />

            {isLast && (
              <div className="absolute flex w-full max-w-[1120px] justify-start md:translate-y-100">
                <div
                  className="aspect-[1/1] h-[150px] md:h-[400px] bg-no-repeat bg-contain scale-x-[-1] -translate-x-5 md:-translate-x-50 "
                  style={{ backgroundImage: "url('/assets/kegiatan/Corak-kalendar-2.webp')" }}
                />
              </div>
            )}


          </div>
        );
      })}
    </DecorationLayer>
  );
}
