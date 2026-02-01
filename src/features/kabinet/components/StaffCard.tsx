"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DepartemenResponse } from "../types";

interface StaffCardProps {
  data: DepartemenResponse["anggota"][0];
  index: number;
  customCard?: number;
}

export default function StaffCard({ data, index, customCard }: StaffCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // LOGIC SKALA FOTO
  const getStyleConfig = () => {
    const jabatan = data.jabatan.toLowerCase();
    if (jabatan === "kepala departemen") {
      return {
        scale: "scale-[1.2]",
        margin: "-mt-6",
        clip: "inset(0 0 40% 0)",
      };
    }
    if (
      jabatan.toLowerCase().includes("wakil") ||
      jabatan.toLowerCase().includes("sekben")
    ) {
      return {
        scale: "scale-[0.9]",
        margin: "-mt-5",
        clip: "inset(0 0 42% 0)",
      };
    }
    return {
      scale: "scale-[1.6]",
      margin: "mt-8",
      clip: "inset(0 0 40% 0)",
    };
  };

  const config = getStyleConfig();

  const imageStyle = `object-contain ${config.scale} ${config.margin} transition-all duration-300 ease-out`;

  // LOGIC PEMILIHAN CARD
  let activeBg;
  if (customCard) {
    // custom card buat Inti Departemen, pake card-5
    activeBg = customCard;
  } else {
    // kalo buat Staff, pake card-2 -3 -4
    const bgDesktop = (index % 3) + 2;
    const mobilePattern = [2, 4, 3, 3];
    activeBg = isMobile ? mobilePattern[index % 4] : bgDesktop;
  }

  const cardPath = `/assets/kabinet/card-${activeBg}.webp`;

  // LOGIC ANIMASI & UKURAN
  const containerClass = isMobile ? "scale-90" : "scale-100";
  const translateClass = isMobile
    ? "translate-y-0"
    : "group-hover:-translate-y-10";
  const nameTagClass = isMobile
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-20 group-hover:opacity-100 group-hover:translate-y-0";

  return (
    <div
      className={`group relative w-full h-100 flex items-center justify-center transition-transform duration-300 ${containerClass}`}
    >
      <div className="relative w-full h-full">
        {/* LAYER 1: Background Card */}
        <div
          className={`absolute inset-0 z-10 transition-all duration-300 ease-out ${translateClass}`}
        >
          <Image
            src={cardPath}
            alt="Background"
            fill
            className="object-contain"
            priority={customCard === 5}
          />
        </div>

        {/* LAYER 2: Badan (Terpotong Masking Bawah) */}
        <div
          className={`absolute inset-0 z-20 transition-all duration-300 ease-out ${translateClass}`}
          style={{
            WebkitMaskImage: `url("${cardPath}")`,
            maskImage: `url("${cardPath}")`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
          }}
        >
          <Image
            src={data.foto_anggota || "/assets/kabinet/placeholder-person.webp"}
            alt={data.nama_anggota}
            fill
            className={imageStyle}
          />
        </div>

        {/* LAYER 3: Kepala Keluar Frame */}
        <div
          className={`absolute inset-0 z-30 transition-all duration-300 ease-out ${translateClass}`}
          style={{ clipPath: config.clip }}
        >
          <Image
            src={data.foto_anggota || "/assets/kabinet/placeholder-person.webp"}
            alt={data.nama_anggota}
            fill
            className={imageStyle}
          />
        </div>

        {/* Nametag */}
        <div className="absolute inset-0 z-40 flex justify-center items-center drop-shadow-[15px_10px_7px_rgba(0,0,0,0.3)] pointer-events-none">
          <div
            className={`relative w-full h-full mt-52 md:mt-64 transition-all duration-300 ease-out ${nameTagClass}`}
          >
            <div className="absolute inset-0 flex flex-col text-center justify-center">
              {!data.jabatan.toLowerCase().includes("staff") && (
                <span className="text-[#2D2D51] font-bold text-xs md:text-md drop-shadow-md">
                  {data.jabatan}
                </span>
              )}
              <span className="text-[#2D2D51] text-xs md:text-md font-bold">
                {data.nama_anggota}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
