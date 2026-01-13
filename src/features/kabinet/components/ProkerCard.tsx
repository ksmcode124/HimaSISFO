"use client";

import { Ornament2, Ornament3 } from "../components/KabinetOrnaments";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ProkerCardProps {
  image_url: string;
  nama: string;
  deskripsi: string;
  isActive: boolean;
}

export default function ProkerCard({
  image_url,
  nama,
  deskripsi,
  isActive,
}: ProkerCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-700 ease-in-out border-none shadow-none bg-transparent p-0 gap-0 relative",
        isActive
          ? "w-[280px] h-[500px] z-20"
          : "w-[280px] h-[400px] z-10 scale-80"
      )}
    >
      <div
        className={cn(
          "relative w-full grow overflow-hidden transition-all duration-700 z-10",
          isActive ? "rounded-t-[2rem]" : "rounded-[2.5rem]"
        )}
      >
        {/* Foto */}
        <CardHeader className="w-full h-full relative">
          <Image src={image_url} alt={nama} fill className="object-cover" />
        </CardHeader>
      </div>

      {/* Kotak Putih: Judul & Deskripsi */}
      {isActive && (
        <CardContent className="relative w-full h-auto rounded-b-[2rem] text-center bg-white p-6 pt-10 z-20">
          <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-[60%]">
            <div className="scale-75 -translate-x-16">
              <Ornament2 />
            </div>
          </div>

          <CardTitle className="text-xl font-black -mt-5">{nama}</CardTitle>
          <CardDescription className="text-xs overflow-hidden">
            {deskripsi}
          </CardDescription>
        </CardContent>
      )}

      {isActive && (
        <div className="absolute top-0 left-2 rotate-95 z-10 scale-85">
          <Ornament3 />
        </div>
      )}
    </Card>
  );
}
