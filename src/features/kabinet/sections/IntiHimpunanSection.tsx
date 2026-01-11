"use client";

import Image from "next/image";
import { Ornament1, Ornament4 } from "../components/KabinetOrnaments";

interface IntiProps {
  data: {
    logo_url: string;
    anggota: {
      nama: string;
      jabatan: string;
      image_url: string;
    }[];
  };
}

export default function IntiHimpunanSection({ data }: IntiProps) {
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

        <h2 className="text-2xl md:text-3xl font-bold">
          Inti Himpunan
        </h2>
      </div>

      <div className="absolute z-0 top-36 md:top-40 -right-28 md:-right-72 w-[400px] md:w-[1000px]">
        <Ornament1 />
      </div>
      <div className="absolute z-0 bottom-5 -left-44 md:-left-90 w-[450px] md:w-[1200px]">
        <Ornament4 />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between -mt-10 md:mt-0 md:px-10">
        {/* Carousel Inti */}
        <div className="flex-1 flex justify-center items-center lg:mx-10">
          <div className="w-[380px] md:w-full h-[300px] md:h-[500px] border-2 flex items-center">
            <div className="flex flex-col items-center gap-6">
              Carousel Inti
            </div>
          </div>
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