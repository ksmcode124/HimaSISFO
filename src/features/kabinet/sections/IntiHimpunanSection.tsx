"use client";

import Image from "next/image";
import { Ornament1, Ornament4 } from "../components/KabinetOrnaments";
import { Anggota } from "../components/IntiHimpunanCard";
import IntiHimpunanCard from "../components/IntiHimpunanCard";

interface IntiHimpunanData {
  logo_url: string;
  anggota: Anggota[];
}

interface SectionProps {
  data: IntiHimpunanData;
}

export default function KabinetIntiSection({ data }: SectionProps) {
  if (!data) return null;
  return (
    <section className="relative w-full md:min-h-[120vh] bg-[#F4E8FF] flex flex-col items-center py-24 overflow-hidden">
      <div className="relative z-10 flex flex-row items-center gap-4 md:mt-20 mb-20">
        <div className="relative w-12 h-12 bg-pink-400 rounded-lg shadow-sm">
          <Image
            src={data.logo_url}
            alt="Logo Inti"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold">Inti Himpunan</h2>
      </div>

      <div className="absolute z-0 top-36 md:top-40 -right-28 md:-right-72 w-[400px] md:w-[1000px]">
        <Ornament1 />
      </div>
      <div className="absolute z-0 bottom-5 -left-44 md:-left-90 w-[450px] md:w-[1200px]">
        <Ornament4 />
      </div>

      {/* Grid Card Langsung (Tanpa Carousel) */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="flex flex-row flex-wrap justify-center gap-y-16 gap-x-10 w-full">
          {data.anggota.map((item, index) => (
            <IntiHimpunanCard key={index} data={item} index={index} />
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-2 md:mt-16 flex items-center gap-3">
        <div className="w-3 md:w-5 h-3 md:h-5 bg-pink-200 rounded-full" />
        <div className="w-7 md:w-12 h-3 md:h-5 bg-pink-500 rounded-full" />
        <div className="w-3 md:w-5 h-3 md:h-5 bg-pink-200 rounded-full" />
      </div>

      <div className="absolute bottom-6 md:bottom-10 w-[90%] md:w-[80%] h-[5px] bg-linear-to-r from-[#E63258] to-[#A43DA5]" />
    </section>
  );
}