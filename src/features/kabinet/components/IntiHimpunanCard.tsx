"use client";

import React from "react";
import Image from "next/image";
import { Anggota } from "../types";

interface CardProps {
  data: Anggota;
  index: number;
}

export default function IntiHimpunanCard({ data, index }: CardProps) {
  const isMirrored = index % 2 !== 0;

  const imageStyle = "object-contain scale-[1.3] md:scale-[1.5] translate-y-6";
  const mirrorClass = isMirrored ? "-scale-x-100" : "";
  const shadowClass = isMirrored
    ? "drop-shadow-[-15px_10px_7px_rgba(0,0,0,0.3)]"
    : "drop-shadow-[15px_10px_7px_rgba(0,0,0,0.3)]";

  return (
    <div className="relative w-full aspect-3/4 sm:aspect-auto sm:h-112 md:h-125 2xl:h-162 flex items-center justify-center mx-auto transition-transform duration-500">
      <div className={`relative w-full h-full ${mirrorClass}`}>
        {/* LAYER 1: Background Card */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/assets/kabinet/card-1.webp"
            alt=""
            fill
            className={`object-contain ${shadowClass}`}
          />
        </div>

        {/* LAYER 2: Badan (Terpotong Masking Bawah) */}
        <div
          className="absolute inset-0 z-20"
          style={{
            WebkitMaskImage: 'url("/assets/kabinet/card-1.webp")',
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            maskImage: 'url("/assets/kabinet/card-1.webp")',
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
          }}
        >
          <div className={`relative w-full h-full ${mirrorClass}`}>
            <Image
              src={
                data.foto_anggota || "/assets/kabinet/placeholder-person.webp"
              }
              alt=""
              fill
              className={imageStyle}
            />
          </div>
        </div>

        {/* LAYER 3: Kepala Keluar Frame */}
        <div
          className="absolute inset-0 z-30"
          style={{ clipPath: "inset(0 0 40% 0)" }}
        >
          <div className={`relative w-full h-full ${mirrorClass}`}>
            <Image
              src={
                data.foto_anggota || "/assets/kabinet/placeholder-person.webp"
              }
              alt=""
              fill
              className={imageStyle}
            />
          </div>
        </div>

        {/* Nametag */}
        <div className="absolute inset-0 z-40 justify-center drop-shadow-2xl">
          <div className="relative w-[108%] h-full top-[32%] md:top-[37%] -left-[5%]">
            <Image
              src="/assets/kabinet/nametag.webp"
              alt=""
              fill
              className="object-contain -scale-x-100 opacity-60 scale-y-[2.5] md:scale-y-100"
            />

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${mirrorClass}`}
            >
              <div className="flex items-center justify-center mt-[53%] md:mt-[22%] h-16 md:h-10 w-[80%]">
                <h3 className="text-[#2D2D51] text-center font-bold text-2xs md:text-sm leading-tight">
                  {data.nama_anggota}
                </h3>
              </div>
              <p className="text-[#2D2D51] md:mt-2 text-2xs md:text-sm font-bold md:font-semibold">
                {data.jabatan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
