"use client";

import Image from "next/image";
import { Pita } from "../components/KabinetOrnaments";

export default function KabinetFilosofiSection() {
  return (
    <div className="relative w-full">
      <section className="w-full min-h-screen flex items-center justify-center py-20 px-10">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src="/assets/kabinet/bg-layer.png" alt="Background Kabinet" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 items-center">
          {/* TENTANG */}
          <div className="flex flex-col gap-4">
            <div className="border p-10 h-72 flex flex-col gap-6"></div>
          </div>

          {/* LOGO */}
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80 border flex items-center justify-center">
              <Image src="/assets/kabinet/logo-kabinet.png" alt="Logo Kabinet" fill className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* Visi */}
            <div className="border flex items-center w-full h-16 px-6"></div>
            {/* Misi */}
            <div className="border flex items-center w-full h-16 px-6"></div>
          </div>
        </div>
      </section>

      <div className="absolute -bottom-4 md:-bottom-10 w-full z-10 translate-y-1/2">
        <Pita />
      </div>
    </div>
  );
}
