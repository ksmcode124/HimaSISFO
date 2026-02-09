"use client";

import { Ornament2, Ornament3 } from "../components/KabinetOrnaments";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProkerCardProps {
  image: string | null;
  nama: string;
  deskripsi: string | null;
  isActive: boolean;
  gradientOrnament2: string
}

export default function ProkerCard({
  image,
  nama,
  deskripsi,
  isActive,
  gradientOrnament2
}: ProkerCardProps) {
  return (
    <Card
      className={cn(
        "w-76 h-125 transition-all duration-700 ease-in-out border-none md:drop-shadow-[6px_10px_3px_rgba(0,0,0,0.1)] bg-transparent p-0 gap-0 relative",
        isActive
          ? "z-20 md:scale-200 lg:scale-210 rounded-[2rem]"
          : "z-10 scale-44 md:scale-80 xl:scale-100 rounded-[2.5rem]",
      )}
    >
      <div
        className={cn(
          "relative w-full grow overflow-hidden transition-all duration-700 z-10",
          isActive ? "rounded-t-[2rem]" : "rounded-[2.5rem]",
        )}
      >
        {/* Foto */}
        <CardHeader className="w-full h-full relative">
          <Image
            src={image || "/assets/kabinet/placeholder-person.webp"}
            alt={nama}
            fill
            className="object-cover pointer-events-none"
          />
        </CardHeader>
      </div>

      {/* Kotak Putih: Judul & Deskripsi */}
      {isActive && (
        <CardContent className="relative w-full h-auto rounded-b-[2rem] text-center bg-white/60 p-6 pt-10 z-20">
          <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-[60%] pointer-events-none">
            <div className="scale-130 translate-x-2">
              <Ornament2 gradient={gradientOrnament2} />
            </div>
          </div>

          <CardTitle className="text-xl font-black -mt-5">{nama}</CardTitle>

          <CardDescription className="text-xs font-light text-[#2D2D51] overflow-hidden">
            {deskripsi || "Deskripsi program kerja belum tersedia."}
          </CardDescription>
        </CardContent>
      )}

      {isActive && (
        <div className="absolute top-2 -right-34 z-10 pointer-events-none">
          <div className="relative w-80 scale-130 rotate-90">
            <Ornament3 />
          </div>
        </div>
      )}
    </Card>
  );
}
