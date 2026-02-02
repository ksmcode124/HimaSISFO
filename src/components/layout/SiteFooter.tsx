"use client"

import { useEffect, useRef, useState } from "react"
import { footerNavItems } from "@/features/navigation"
import Image from "next/image"
import Link from "next/link"
import HandIcon from "../../../public/assets/shared/decoratives/twemoji_raised-hand"

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [year, setYear] = useState<number>(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasTriggered(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    const el = footerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        relative
        bg-blue-500
        overflow-hidden pt-15"
    >
      {//tangan
      }
      <div className={`absolute overflow-hidden inset-0 z-0 lg:transition-transform lg:duration-700 ease-out ${hasTriggered ? "lg:-translate-y-0" : "lg:translate-y-full"}`}>
        <HandIcon className="absolute h-auto -translate-x-20 " />
        <HandIcon mirrorX className="absolute h-auto translate-x-20" />
      </div>
      <div className={`flex justify-center py-5 md:py-0 ${hasTriggered
        ? "lg:delay-900 lg:duration-700 opacity-100 bg-black/50 backdrop-blur-[3px]"
        : "opacity-0"}`}>
        <div className="
          max-w-[1120px]
          relative
          grid
          z-20
          grid-cols-3
          lg:grid-cols-[3fr_3fr_2fr_1fr]
          gap-x-10 xl:gap-x-15 gap-y-10 py-10
          text-[#FFFCFC]
          text-shadow-[0_2px_2px_#000]
          lg:text-shadow-none
          lg:transition-ease-in">
          <div className="relative z-20 col-span-3 lg:col-span-2 flex flex-col lg:flex-row gap-5 md:gap-10 lg:gap-20 items-center lg:items-start">
            <div className="flex justify-center items-center h-full">
              <div className="relative w-30 h-30 lg:w-50 lg:h-50">
                <Image
                  fill
                  src="/assets/shared/logos/logo-himasisfo.webp"
                  alt="Logo"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-3 w-[268px]">
              <h3 className="text-xl md:text-3xl font-bold">HIMASISFO</h3>
              <p className="hidden lg:block text-xm md:text-sm font-medium text-justify leading-8">
                Kampus Unit II (Prodi Sistem Informasi) Jl. Babarsari 2, Janti,
                Caturtunggal, Depok, Sleman Regency, Special Region of Yogyakarta
                55281
              </p>
            </div>
          </div>
          <div className="relative flex flex-col z-20 col-span-2 lg:col-span-1 py-2 gap-5 pl-10 md:pl-0">
            <h4 className="font-bold text-sm md:text-[20px]">
              Tautan Akademik
            </h4>
            <ul className="font-medium text-[14px] md:text-sm flex flex-col gap-5">
              {footerNavItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} target="_blank">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative z-20 flex flex-col items-end lg:items-center gap-5 py-3 pr-10 md:pr-0">
            {footerNavItems.slice(4).map((item) => (
              <Link key={item.href} href={item.href} target="_blank">
                <Image src={`/assets/shared/icons/mdi_${item.label.toLowerCase()}.svg`} alt={item.label} width={40} height={40} className="w-8 h-8 lg:w-10 lg:h-10" />
              </Link>
            ))}
          </div>
          <div className="relative z-20 col-span-3 lg:col-span-4 text-center text-sm font-bold px-10 md:px-0">
            &copy; COPYRIGHT {year}. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
