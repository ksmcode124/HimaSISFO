import React from "react";
import Image from "next/image";

export interface StaffData {
  nama: string;
  jabatan?: string;
  image_url: string;
}

interface StaffCardProps {
  data: StaffData;
}

export default function StaffCard({ data }: StaffCardProps) {
  const imageStyle = "object-contain scale-[1.5] transition-all ease-out ml-4";

  return (
    <div className="group relative w-[400px] h-[500px] flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* LAYER 1: Background Card */}
        <div
          className={`absolute inset-0 z-10 translate-y-0 transition-all duration-300 ease-out group-hover:-translate-y-10`}
        >
          <Image
            src="/assets/kabinet/card-2.png"
            alt="Background Pattern"
            fill
            className="object-contain"
          />
        </div>

        {/* LAYER 2: Badan (Terpotong Masking Bawah) */}
        <div
          className="absolute inset-0 z-20 transition-all duration-300 ease-out group-hover:-translate-y-10"
          style={{
            WebkitMaskImage: 'url("/assets/kabinet/card-2.png")',
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            maskImage: 'url("/assets/kabinet/card-2.png")',
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
          }}
        >
          <Image
            src={data.image_url}
            alt={data.nama}
            fill
            className={imageStyle}
          />
        </div>

        {/* LAYER 3: Kepala Keluar Frame */}
        <div
          className="absolute inset-0 z-30 transition-all duration-300 ease-out group-hover:-translate-y-10"
          style={{
            clipPath: "inset(0 0 40% 0)",
          }}
        >
          <Image
            src={data.image_url}
            alt={data.nama}
            fill
            className={imageStyle}
          />
        </div>

        {/* Nametag */}
        <div className="absolute inset-0 z-40 flex justify-center items-center drop-shadow-[15px_10px_7px_rgba(0,0,0,0.3)]">
          <div
            className={`relative w-full h-full mt-64 ml-5 opacity-0 translate-y-20 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0`}
          >
            <div className="absolute inset-0 flex flex-col text-center justify-center">
              <span className="text-black font-bold text-md drop-shadow-md">
                {data.jabatan}
              </span>
              <span className="text-black text-md font-semibold">
                {data.nama}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
