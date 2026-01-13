"use client";

import React, { useState, useEffect } from "react";
import kabinetDataRaw from "../data/kabinet.json";
import { Button } from "@/components/ui/button";
import { Pita, Ornament2 } from "../components/KabinetOrnaments";
import PhotoSlideshowMobile from "../components/PhotoSlideshowMobile";
import { KabinetDataJSON, Kabinet } from "../types";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const data = kabinetDataRaw as unknown as KabinetDataJSON;

export default function KabinetHeroSection({
  currentKabinet,
}: {
  currentKabinet: Kabinet;
}) {
  const router = useRouter();
  const allKabinet = data.kabinet_list;

  // Slideshow
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = currentKabinet?.image_url || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  //

  if (!currentKabinet) return null;

  // YearButton (tahun kepengurusan)
  const getRelativeYear = (currentYear: string, offset: number) => {
    const years = currentYear.split("/");
    return `${parseInt(years[0]) + offset}/${parseInt(years[1]) + offset}`;
  };

  const prevYearLabel = getRelativeYear(currentKabinet.tahun_akademik, -1);
  const nextYearLabel = getRelativeYear(currentKabinet.tahun_akademik, 1);

  const prevKabinet = allKabinet.find(
    (k) => k.tahun_akademik === prevYearLabel
  );
  const nextKabinet = allKabinet.find(
    (k) => k.tahun_akademik === nextYearLabel
  );

  return (
    <div
      className="relative w-full"
      style={
        {
          ["--primary-color" as string]: currentKabinet.colors.primary,
          ["--secondary-color" as string]: currentKabinet.colors.secondary,
          ["--bg-kabinet" as string]: currentKabinet.colors.background,
        } as React.CSSProperties
      }
    >
      <section className="relative w-full h-[700px] flex flex-col items-center justify-center bg-pink-100 text-white overflow-hidden">
        {/* Background Desktop */}
        <div className="absolute inset-0 hidden md:block z-0">
          {images.map((src: string, index: number) => (
            <motion.div
              key={`${src}-${index}`}
              initial={false}
              animate={{ opacity: index === currentImgIndex ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
              style={{ zIndex: index === currentImgIndex ? 10 : 0 }}
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

        {/* Background Mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/assets/kabinet/hero-bg.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute top-15 md:top-20 md:left-0 z-10  md:w-full flex justify-between items-center lg:px-60">
          <YearButton
            label={prevYearLabel}
            onClick={() => {
              if (prevKabinet) router.push(`/kabinet/${prevKabinet.id}`);
              else router.push("/kabinet/aksayapatra"); // Fallback ke kabinet lalu
            }}
            className="mt-5 md:mt-0 mr-6"
          />

          {/* Logo Kabinet */}
          <div className=" relative w-15 h-15 mt-15 md:mt-0 md:w-40 md:h-40 flex items-center justify-center ">
            <Image
              src={currentKabinet.logo_url}
              alt="Logo Kabinet"
              fill
              className="object-contain -mt-2 md:mt-6 rounded-full border md:border-2 border-white/50 bg-white/20 backdrop-blur-xs drop-shadow-[5px_5px_2px_rgba(0,0,0,0.4)]"
            />
          </div>
          <YearButton
            label={nextYearLabel}
            onClick={() => {
              if (nextKabinet) router.push(`/kabinet/${nextKabinet.id}`);
              else router.push("/kabinet/coming-soon");
            }}
            className="mt-5 md:mt-0 ml-6"
          />
        </div>

        <div className="absolute inset-0 flex justify-center items-center mb-[360px] md:mb-50">
          <div className="grid grid-cols-2 w-full max-w-[1200px] drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)]">
            <div className="flex justify-start -scale-x-100">
              <Ornament2 />
            </div>
            <div className="flex justify-start">
              <Ornament2 />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mt-35 md:mt-80">
          <div className="drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] md:mb-0 md:mt-4">
            <div className="text-2xl md:text-7xl font-bold leading-15 md:leading-relaxed">
              <h1>SELAMAT DATANG DI</h1>
              <h2>HIMASISFO {currentKabinet.tahun_akademik}</h2>
            </div>
            <h3
              className="text-2xl mt-4 md:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
              }}
            >
              Kabinet {currentKabinet.nama_kabinet}
            </h3>
          </div>
        </div>
        <PhotoSlideshowMobile
          imageSrc={images[currentImgIndex] || "/assets/kabinet/fallback.webp"}
        />

        <div className="hidden md:block absolute bottom-0 left-0 w-full h-48 lg:h-64 bg-linear-to-t from-white via-white/20 to-transparent z-0" />
      </section>

      <div className="absolute -bottom-4 md:-bottom-10 w-full z-10 translate-y-1/2">
        <Pita />
      </div>
    </div>
  );
}

const YearButton = ({
  label,
  onClick,
  className = "",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) => (
  <Button
    onClick={onClick}
    className={`group relative overflow-hidden w-fit h-8 md:h-auto px-3 md:px-8 py-2 rounded-full border md:border-2 border-white/50 bg-white/20 text-white text-xs md:text-xl font-medium backdrop-blur-3xl drop-shadow-[5px_5px_2px_rgba(0,0,0,0.4)] hover:bg-black/95 transition-all cubic-bezier duration-400
            bg-[linear-gradient(to_right,black_50%,transparent_50%)] bg-size-[210%_100%] bg-position-[99%_0] 
            hover:bg-position-[0%_0]! hover:border-white/50! ${className}`}
  >
    {/* Shine Effect */}
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
