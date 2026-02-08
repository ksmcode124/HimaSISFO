"use client";

import Image from "next/image";
import { Ornament1, Ornament4 } from "../components/KabinetOrnaments";
import CarouselIntiHimpunan from "../components/CarouselIntiHimpunan";
import { DepartemenInti } from "../types";

interface SectionProps {
  data: DepartemenInti;
}

export default function IntiHimpunanSection({ data }: SectionProps) {
  if (!data) return null;

  return (
    <section className="relative w-full aspect-square md:aspect-auto bg-[#F4E8FF] flex flex-col items-center py-24 overflow-hidden">
      <div className="relative z-10 flex flex-row items-center gap-4 sm:mb-20 md:mb-0 md:mt-20">
        <div className="relative w-14 h-14">
          <Image
            src={
              data.logo_departemen || "/assets/shared/logos/logo-himasisfo.webp"
            }
            alt="Logo Inti"
            fill
            className="object-contain drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)]"
            priority
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold">Inti Himpunan</h2>
      </div>

      <div className="absolute z-0 top-36 md:top-40 -right-28 md:-right-72 w-100 md:w-250">
        <Ornament1 />
      </div>
      <div className="absolute z-0 bottom-5 -left-44 md:-left-90 w-md md:w-300">
        <Ornament4 />
      </div>

      {/* Carousel */}
      <div className="relative z-30 w-full max-w-7xl">
        <CarouselIntiHimpunan anggota={data.anggota} />
      </div>

      <div className="absolute bottom-6 md:bottom-10 w-[90%] md:w-[80%] h-1 bg-linear-to-r from-[#E63258] to-[#A43DA5]" />
    </section>
  );
}
