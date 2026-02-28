"use client";

import Image from "next/image";
import { Ornament2, Ornament3 } from "../components/KabinetOrnaments";
import { motion } from "framer-motion";
import { ColorMap } from "../types";

interface Props {
  imageSrc: string;
  colorMap: ColorMap;
}

export default function PhotoSlideshowMobile({ imageSrc, colorMap }: Props) {
  return (
    <div className="relative z-10 mt-10 w-[90%] max-w-100 mx-auto -left-[10%] mb-10 md:hidden">
      <div className="absolute -top-6 -left-[30%] w-[90%] aspect-square z-30 [&_svg]:w-full [&_svg]:h-auto">
        <Ornament3 gradient={colorMap.ornament3 ?? ""} />
      </div>

      {/* Foto Utama */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden z-20 shadow-xl">
        {imageSrc ? (
          <motion.div
            key={imageSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Image
              src={imageSrc}
              alt="Foto Kabinet"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white animate-spin rounded-full" />
          </div>
        )}

        <div className="absolute right-[-30%] -bottom-[123%] w-[90%] aspect-square [&_svg]:w-full [&_svg]:h-auto">
          <Ornament2 gradient={colorMap.ornament2 ?? ""} />
        </div>
      </div>

      {/* Layer Group */}
      <div className="absolute w-[105%] h-[105%] -left-[2.5%] top-[1%] aspect-video z-10 pointer-events-none drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)]">
        <div
          className="absolute inset-0 rounded-2xl z-0 border border-white"
          style={{
            background: colorMap.layerBackground ?? "transparent",
          }}
        />
        <Image
          src="/assets/kabinet/hero-layer-mobile.webp"
          alt="Photo Frame"
          fill
          className="object-cover opacity-80 z-10"
        />
      </div>
    </div>
  );
}
