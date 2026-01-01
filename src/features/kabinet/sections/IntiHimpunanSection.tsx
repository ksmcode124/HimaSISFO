"use client";

import Image from "next/image";
import { Awan, Ornamen4 } from "../components/KabinetOrnaments";

export default function KabinetIntiSection() {
  return (
    <section className="relative w-full min-h-[120vh] bg-pink-50 flex flex-col items-center py-24 overflow-hidden">
      <div className="relative z-10 flex flex-row items-center gap-4 mt-20 mb-20">
        <div className="relative w-12 h-12 bg-pink-400 rounded-lg shadow-sm">
          <Image
            src="/assets/kabinet/logo-inti.png"
            alt="Logo Inti"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-2xl md:text-4xl font-bold">
          Inti Himpunan
        </h2>
      </div>

      <div className="absolute top-40 -right-70 w-[1000px]">
        <Awan />
      </div>
      <div className="absolute bottom-5 -left-90 w-[1200px]">
        <Ornamen4 />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between px-10">
        {/* Carousel Inti */}
        <div className="flex-1 flex justify-center items-center mx-10">
          <div className="w-full h-[500px] border-2 flex items-center">
            <div className="flex flex-col items-center gap-6">
              Carousel Inti
            </div>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-16 flex items-center gap-3">
        <div className="w-5 h-5 bg-pink-200 rounded-full" />
        <div className="w-12 h-5 bg-pink-500 rounded-full" />
        <div className="w-5 h-5 bg-pink-200 rounded-full" />
      </div>

      <div className="absolute bottom-0 w-[80%] h-[5px] bg-linear-to-r from-[#E63258] to-[#A43DA5]" />
    </section>
  );
}



