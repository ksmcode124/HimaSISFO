"use client";

import Image from "next/image";
import { Ornament2, Ornament3 } from "../components/KabinetOrnaments";
import { motion } from "framer-motion";

interface Props {
  imageSrc: string;
}

export default function PhotoSlideshowMobile({ imageSrc }: Props) {
  return (
    <div className="relative z-10 mt-10 w-[90%] max-w-100 mx-auto -left-[10%] mb-10 md:hidden">
      <div className="absolute -top-6 -left-[30%] w-[90%] aspect-square z-30 [&_svg]:w-full [&_svg]:h-auto">
        <Ornament3 />
      </div>

      {/* Foto Utama */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden z-20 shadow-xl">
        <div></div>
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

        <div className="absolute right-[-30%] -bottom-[123%] w-[90%] aspect-square [&_svg]:w-full [&_svg]:h-auto">
          <Ornament2 />
        </div>
      </div>

      <div className="absolute w-[105%] h-[105%] -left-[2.5%] top-[1%] aspect-video rounded-2xl drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] overflow-hidden z-10 pointer-events-none">
        <Image
          src="/assets/kabinet/layer-photo-mobile.webp"
          alt="Photo"
          fill
          className="object-cover opacity-80"
        />
      </div>
    </div>
  );
}
