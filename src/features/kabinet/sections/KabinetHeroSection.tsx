"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Glass } from "@/components/ui/Glass";
import { Button } from "@/components/ui/button";
import { Pita, Ornament2 } from "../components/KabinetOrnaments";
import PhotoSlideshowMobile from "../components/PhotoSlideshowMobile";
import { ColorMap, Kabinet, KabinetListItem } from "../types";
import { cn } from "@/lib/utils";

interface KabinetHeroSectionProps {
  currentKabinet: Kabinet;
  kabinetList: KabinetListItem[];
  colorMap: ColorMap;
}

export default function KabinetHeroSection({
  currentKabinet,
  kabinetList,
  colorMap,
}: KabinetHeroSectionProps) {
  const router = useRouter();
  const images = useMemo(() => {
    const raw = currentKabinet?.foto_kabinet || [];
    return Array.isArray(raw) ? raw : [raw];
  }, [currentKabinet]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const navigation = useMemo(() => {
    if (!currentKabinet || !kabinetList) return null;

    const sorted = [...kabinetList].sort(
      (a, b) =>
        parseInt(a.tahun_kerja.split("/")[0]) -
        parseInt(b.tahun_kerja.split("/")[0]),
    );

    const currentIndex = sorted.findIndex(
      (k) => Number(k.id_kabinet) === Number(currentKabinet.id),
    );

    const prev = sorted[currentIndex - 1];
    const next = sorted[currentIndex + 1];

    return { prev, next };
  }, [currentKabinet, kabinetList]);

  // SLIDESHOW TIMER
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!currentKabinet) return null;

  // HELPER FOR LABELS
  const getYearLabel = (
    targetKabinet: KabinetListItem | undefined,
    offset: number,
  ) => {
    return (
      targetKabinet?.tahun_kerja ||
      getOffsetYear(currentKabinet.tahun_kerja, offset)
    );
  };

  return (
    <div className="relative w-full">
      <section className="relative w-full min-h-[60vh] md:min-h-screen lg:min-h-[130vh] xl:min-h-[110vh] 2xl:min-h-screen flex flex-col items-center justify-center text-white bg-[#F4E8FF] overflow-hidden">
        <DesktopBackground images={images} activeIndex={currentImgIndex} />
        <MobileBackground />

        <div className="absolute top-30 sm:top-32 md:top-30 z-20 w-full flex justify-center items-start">
          <div className="relative flex items-start justify-center gap-4 sm:gap-10 md:gap-16 lg:gap-24">
            <div className="flex flex-col items-center relative">
              <YearButton
                label={getYearLabel(navigation?.prev, -1)}
                onClick={() =>
                  navigation?.prev &&
                  router.push(`/kabinet/${navigation.prev.id_kabinet}`)
                }
                disabled={!navigation?.prev}
              />
              <OrnamentWrapper position="left" gradient={colorMap.ornament2 ?? ''} />
            </div>
            <KabinetLogo
              src={
                currentKabinet.logo ||
                "/assets/shared/logos/logo-himasisfo.webp"
              }
            />
            <div className="flex flex-col items-center relative">
              <YearButton
                label={getYearLabel(navigation?.next, 1)}
                onClick={() => {
                  if (navigation?.next) {
                    router.push(`/kabinet/${navigation.next.id_kabinet}`);
                  } else {
                    router.push("/kabinet/coming-soon");
                  }
                }}
              />
              <OrnamentWrapper position="right" gradient={colorMap.ornament2 ?? ''} />
            </div>
          </div>
        </div>

        <div className="grow" />
        <div className="relative z-10 flex flex-col items-center text-center mt-55 md:mt-80">
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

      <div className="absolute -bottom-4 md:-bottom-10 w-full z-10 translate-y-1/2 h-100">
        <Pita pitaGradient={colorMap.pita ?? ''} />
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
}) => {
  if (!images || images.length === 0) return null;

  // Kalo bukan array (cuma 1 image), render image itu aja
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 hidden md:block z-0">
        <Image
          src={images[0]}
          alt="Foto Kabinet"
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // Kalo array (image > 1), render slideshow
  return (
    <div className="absolute inset-0 hidden md:block z-0">
      <AnimatePresence initial={false}>
        {images.map(
          (src, index) =>
            index === activeIndex && (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt="Slideshow"
                  fill
                  className="object-cover"
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};

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

const OrnamentWrapper = ({ position, gradient }: { position: "left" | "right", gradient: string }) => {
  const styles =
    position === "left"
      ? "-scale-x-100 -right-10 sm:-right-12 md:-right-32 lg:-right-48"
      : "-left-10 sm:-left-12 md:-left-32 lg:-left-48";
  return (
    <div
      className={cn(
        "absolute top-full mt-2 sm:mt-4 w-40 sm:w-56 md:w-100 lg:w-130 drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] pointer-events-none",
        styles,
      )}
    >
      <Ornament2 gradient={gradient} />
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
  <div className="relative group">
    <Glass preset="medium" className="rounded-full" depth={100}>
      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "group relative w-fit h-8 md:h-auto px-3 md:px-8 py-2 rounded-3xl border md:border-2 border-white/50 bg-transparent text-white text-xs md:text-xl font-medium hover:bg-black/90 transition-all duration-400 bg-[linear-gradient(to_right,black_50%,transparent_50%)] bg-size-[210%_100%] bg-position-[99%_0] hover:bg-position-[0%_0]! hover:border-white/50! disabled:opacity-50",
        )}
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
    </Glass>
  </div>
);

const getOffsetYear = (currentYear: string, offset: number) => {
  if (!currentYear || !currentYear.includes("/")) return "___/___";
  const [start, end] = currentYear.split("/").map((y) => parseInt(y) + offset);
  return `${start}/${end}`;
};
