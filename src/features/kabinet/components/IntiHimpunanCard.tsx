import React from "react";
import Image from "next/image";

export interface Anggota {
  nama: string;
  jabatan: string;
  image_url: string;
}

interface CardProps {
  data: Anggota;
  index: number;
}

export default function IntiHimpunanCard({ data, index }: CardProps) {
  const isMirrored = index % 2 !== 0;
  const imageStyle = "object-contain scale-[1.3] md:scale-[1.5] translate-y-6";

  return (
    <div className="relative w-full max-w-[320px] md:max-w-[400px] h-[450px] md:h-[500px] flex items-center justify-center mx-auto">
      <div
        className={`relative w-full h-full ${isMirrored ? "-scale-x-100" : ""}`}
      >
        {/* LAYER 1: Background Card */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/assets/kabinet/card-1.png"
            alt="Background Pattern"
            fill
            className={`object-contain ${
              isMirrored
                ? "drop-shadow-[-15px_10px_7px_rgba(0,0,0,0.3)]"
                : "drop-shadow-[15px_10px_7px_rgba(0,0,0,0.3)]"
            }`}
          />
        </div>
        {/* LAYER 2: Badan (Terpotong Masking Bawah) */}
        <div
          className="absolute inset-0 z-20"
          style={{
            WebkitMaskImage: 'url("/assets/kabinet/card-1.png")',
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            maskImage: 'url("/assets/kabinet/card-1.png")',
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
          }}
        >
          <div
            className={`relative w-full h-full ${
              isMirrored ? "-scale-x-100" : ""
            }`}
          >
            <Image
              src={data.image_url}
              alt={data.nama}
              fill
              className={imageStyle}
            />
          </div>
        </div>
        {/* LAYER 3: Kepala Keluar Frame */}
        <div
          className="absolute inset-0 z-30"
          style={{
            clipPath: "inset(0 0 40% 0)",
          }}
        >
          <div
            className={`relative w-full h-full ${
              isMirrored ? "-scale-x-100" : ""
            }`}
          >
            <Image
              src={data.image_url}
              alt={data.nama}
              fill
              className={imageStyle}
            />
          </div>
        </div>
        {/* Nametag */}
        <div className="absolute inset-0 z-40 justify-center drop-shadow-2xl">
          <div className="relative w-[108%] h-full top-[32%] md:top-[37%] -left-[5%]">
            <Image
              src="/assets/kabinet/nametag.png"
              alt="Nametag"
              fill
              className="object-contain -scale-x-100 opacity-60 scale-y-[2.2] md:scale-y-100"
            />
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${
                isMirrored ? "-scale-x-100" : ""
              }`}
            >
              <div className="flex items-center justify-center mt-[52%] md:mt-[22%] h-16 md:h-10 w-[80%]">
                <h3 className="text-black text-center font-bold text-lg md:text-sm">
                  {data.nama}
                </h3>
              </div>
              <p className="text-black mt-6 md:mt-2 text-lg md:text-sm font-bold md:font-semibold">
                {data.jabatan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
