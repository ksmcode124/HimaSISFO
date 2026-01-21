"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pita, Ornament2 } from "../components/KabinetOrnaments";
import PhotoSlideshowMobile from "../components/PhotoSlideshowMobile";
import { Kabinet, KabinetListItem } from "../types";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface KabinetHeroSectionProps {
  currentKabinet: Kabinet;
  kabinetList: KabinetListItem[];
}

export default function KabinetHeroSection({
  currentKabinet,
  kabinetList,
}: KabinetHeroSectionProps) {
  const router = useRouter();

  // SLIDESHOW LOGIC
  const images = currentKabinet?.foto_kabinet || [];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!currentKabinet) return null;

  // YEAR BUTTON LOGIC
  const currentIndex = kabinetList.findIndex(
    (k) => Number(k.id_kabinet) === Number(currentKabinet.id),
  );

  const nextKabinet = kabinetList[currentIndex - 1];
  const prevKabinet = kabinetList[currentIndex + 1];

  return (
    <div className="relative w-full">
      <section className="relative w-full min-h-[60vh] md:min-h-screen lg:min-h-[130vh] xl:min-h-[110vh] 2xl:min-h-screen flex flex-col items-center justify-center bg-pink-100 text-white overflow-hidden">
        <DesktopBackground images={images} activeIndex={currentImgIndex} />
        <MobileBackground />
        <div className="absolute top-10 sm:top-12 md:top-25 z-20 w-full flex justify-center items-start">
          <div className="relative flex items-start justify-center gap-4 sm:gap-10 md:gap-16 lg:gap-24">
            <div className="flex flex-col items-center relative">
              <YearButton
                label={prevKabinet?.tahun_kerja || "___/___"}
                onClick={() =>
                  prevKabinet &&
                  router.push(`/kabinet/${prevKabinet.id_kabinet}`)
                }
                disabled={!prevKabinet}
              />
              <OrnamentWrapper position="left" />
            </div>
            <KabinetLogo
              src={
                currentKabinet.logo ||
                "/assets/shared/logos/logo-himasisfo.webp"
              }
            />
            <div className="flex flex-col items-center relative">
              <YearButton
                label={nextKabinet?.tahun_kerja || "___/___"}
                onClick={() =>
                  nextKabinet
                    ? router.push(`/kabinet/${nextKabinet.id_kabinet}`)
                    : router.push("/coming-soon")
                }
                disabled={false}
              />
              <OrnamentWrapper position="right" />
            </div>
          </div>
        </div>

        <div className="grow" />
        <div className="relative z-10 flex flex-col items-center text-center mt-35 md:mt-80">
          <div className="drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] md:mb-10 lg:mb-44 xl:mb-10 2xl:mb-52 md:mt-4">
            <div className="text-xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl font-bold leading-15 md:leading-relaxed">
              <h1>SELAMAT DATANG DI</h1>
              <h2>HIMASISFO {currentKabinet.tahun_kerja}</h2>
            </div>
            <h3 className="text-xl mt-4 sm:text-3xl md:text-4xl lg:text-5xl lg:mb-[-20%] xl:mb-[8%] 2xl:mb-[-15%] font-bold bg-clip-text text-transparent bg-linear-to-r from-[#E63258] to-[#A43DA5]">
              Kabinet {currentKabinet.nama_kabinet}
            </h3>
          </div>
        </div>

        {/* Mobile Elements */}
        {images.length > 0 && (
          <PhotoSlideshowMobile imageSrc={images[currentImgIndex]} />
        )}
        <div className="hidden md:block absolute bottom-0 left-0 w-full h-48 lg:h-64 bg-linear-to-t from-white via-white/20 to-transparent z-0" />
      </section>

      <div className="absolute -bottom-4 md:-bottom-10 w-full z-10 translate-y-1/2">
        <Pita />
      </div>
    </div>
  );
}

const DesktopBackground = ({
  images,
  activeIndex,
}: {
  images: string[];
  activeIndex: number;
}) => (
  <div className="absolute inset-0 hidden md:block z-0">
    {images.map((src, index) => (
      <motion.div
        key={src}
        initial={false}
        animate={{ opacity: index === activeIndex ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{ zIndex: index === activeIndex ? 10 : 0 }}
      >
        <Image
          src={src}
          alt="Foto Kabinet"
          fill
          className="object-cover"
          priority={index === 0}
          sizes="100vw"
        />
      </motion.div>
    ))}
  </div>
);

const MobileBackground = () => (
  <div className="absolute inset-0 md:hidden">
    <Image
      src="/assets/kabinet/hero-bg.webp"
      alt="Background"
      fill
      className="object-cover"
      priority
    />
  </div>
);

const KabinetLogo = ({ src }: { src: string }) => (
  <div className="shrink-0 z-30 flex flex-col items-center">
    <div className="relative w-16 h-16 sm:w-28 sm:h-28 lg:w-40 lg:h-40 aspect-square">
      <Image
        src={src}
        alt="Logo Kabinet"
        fill
        className="object-contain rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-xs drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)]"
        priority
      />
    </div>
  </div>
);

const OrnamentWrapper = ({ position }: { position: "left" | "right" }) => {
  const styles =
    position === "left"
      ? "-scale-x-100 -right-10 sm:-right-12 md:-right-32 lg:-right-48"
      : "-left-10 sm:-left-12 md:-left-32 lg:-left-48";
  return (
    <div
      className={`absolute top-full mt-2 sm:mt-4 w-40 sm:w-56 md:w-100 lg:w-130 drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] pointer-events-none ${styles}`}
    >
      <Ornament2 />
    </div>
  );
};

const YearButton = ({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="group relative overflow-hidden w-fit h-8 md:h-auto px-3 md:px-8 py-2 rounded-full border md:border-2 border-white/50 bg-white/20 text-white text-xs md:text-xl font-medium backdrop-blur-3xl drop-shadow-[5px_5px_2px_rgba(0,0,0,0.4)] hover:bg-black/95 transition-all duration-400 bg-[linear-gradient(to_right,black_50%,transparent_50%)] bg-size-[210%_100%] bg-position-[99%_0] hover:bg-position-[0%_0]! hover:border-white/50! disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <motion.div
      initial={{ x: "-250%", skewX: 45 }}
      animate={{ x: "350%", skewX: 45 }}
      transition={{
        repeat: Infinity,
        duration: 0.5,
        repeatDelay: 2,
        ease: "linear",
      }}
      className="absolute inset-y-0 w-12 bg-linear-to-r from-transparent via-white/40 to-transparent z-10"
    />
    <span className="relative z-20">{label}</span>
  </Button>
);
