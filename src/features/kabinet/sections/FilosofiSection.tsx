"use client";

import Image from "next/image";
import { Pita } from "../components/KabinetOrnaments";
import TentangCard from "../components/TentangCard";
import VisiMisiAccordion from "../components/VisiMisiAccordion";

interface FilosofiProps {
  data: {
    arti_nama: { kata: string; makna: string }[];
    visi: { text: string }[];
    misi: { text: string }[];
  };
  logo_url: string;
}

export default function FilosofiSection({ logo_url, data }: FilosofiProps) {
  return (
    <div className="relative w-full">
      <section className="w-full bg-[#F4E8FF] min-h-screen flex items-center justify-center py-20 px-10">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 bg-size-[150%_40%] md:bg-size-[100%_auto] bg-repeat-y bg-top"
          style={{
            backgroundImage: `url('/assets/kabinet/filosofi-bg.webp')`,
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mt-14 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* LOGO */}
          <div className="flex justify-center items-center lg:order-2">
            <div className="relative w-60 h-60 lg:w-[380px] lg:h-[380px] lg:-ml-10 border flex items-center justify-center">
              <Image
                src={logo_url}
                alt="Logo Kabinet"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* TENTANG */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1 h-full">
              <TentangCard data={data.arti_nama} />
            </div>
          </div>

          <div className="md:flex-col md:-ml-10 md:gap-10 md:order-3 hidden lg:block">
            {/* Visi Misi Desktop */}
            <VisiMisiAccordion data={data} />
          </div>

          <div className="flex-col gap-10 block md:order-3 lg:hidden">
            {/* Visi Misi Mobile */}
            <div className="border flex items-center w-full h-16">
              Visi & Misi
            </div>
          </div>
        </div>
      </section>

      <div className="absolute -bottom-4 md:-bottom-10 w-full z-10 translate-y-1/2 -scale-x-100">
        <Pita />
      </div>
    </div>
  );
}
