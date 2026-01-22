"use client";

import { Pita } from "../components/KabinetOrnaments";
import CarouselProker from "../components/CarouselProker";
import { DepartemenResponse } from "../types";

interface ProkerSectionProps {
  data: DepartemenResponse["proker"];
}

export default function ProkerSection({ data }: ProkerSectionProps) {
  return (
    <div className="relative w-full">
      <section className="relative w-full md:min-h-250 flex flex-col items-center py-24 overflow-hidden bg-[#F4E8FF]">
        {/* ornamen kiri */}
        <div className="absolute -left-110 md:-left-100 top-1/2 -translate-y-1/2 w-150 h-125 md:w-200 md:h-150 z-0 opacity-40">
          <div className="w-full h-full bg-pink-600 rounded-full blur-[60px] md:blur-[120px] absolute" />
        </div>

        {/* ornamen kanan */}
        <div className="absolute -right-110 md:-right-100 top-1/2 -translate-y-1/2 w-150 h-125 md:w-200 md:h-150 z-0 opacity-40">
          <div className="w-full h-full bg-pink-600 rounded-full blur-[60px] md:blur-[120px] absolute" />
        </div>

        {/* Judul Section */}
        <div className="relative flex flex-row items-center gap-4 mb-4 md:mb-10 md:mt-10 z-10">
          <h2 className="text-lg md:text-3xl -mt-10 md:mt-0 font-bold tracking-tight text-black">
            Program Kerja
          </h2>
        </div>

        {/* Carousel Proker */}
        <div className="relative w-full max-w-7xl h-62 md:h-138 flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-black font-bold">
            <CarouselProker prokerList={data} />
          </div>
        </div>
      </section>

      <div className="absolute bottom-4 md:bottom-14 w-full z-10 translate-y-1/2 -scale-x-100">
        <Pita />
      </div>
    </div>
  );
}
