"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IntiHimpunanCard from "./IntiHimpunanCard";
import { Anggota } from "../types";

interface CarouselProps {
  anggota: Anggota[];
}

export default function CarouselIntiHimpunan({ anggota }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // sorting menurut id
  const sortedAnggota = useMemo(() => {
    return [...anggota].sort((a, b) => Number(a.id) - Number(b.id));
  }, [anggota]);

  const totalPages = Math.ceil(sortedAnggota.length / 2);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const navBtnClass =
    "hidden lg:flex absolute top-1/2 -translate-y-1/2 z-50 p-4 md:p-5 rounded-full bg-linear-to-r from-[#E63258] to-[#A43DA5] hover:bg-none hover:bg-white group transition-all";
  const iconClass =
    "text-white group-hover:text-[#E63258] w-8 h-8 md:w-10 md:h-10 transition-colors";

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center min-h-62 md:min-h-150 2xl:min-h-186 overflow-visible px-4">
        {/* Navigation Buttons */}
        <button
          onClick={slidePrev}
          className={`${navBtnClass} -left-4 xl:left-12 2xl:-left-32`}
        >
          <ChevronLeft className={iconClass} />
        </button>

        <button
          onClick={slideNext}
          className={`${navBtnClass} -right-4 xl:right-12 2xl:-right-32`}
        >
          <ChevronRight className={iconClass} />
        </button>

        {/* Carousel Content */}
        <div className="relative w-full max-w-6xl h-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 },
              }}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, { offset }) => {
                if (offset.x < -50) slideNext();
                else if (offset.x > 50) slidePrev();
              }}
              className={`absolute inset-0 flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 
                ${isMobile ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            >
              {sortedAnggota
                .slice(currentIndex * 2, currentIndex * 2 + 2)
                .map((item, idx) => (
                  <div
                    key={item.id}
                    className="w-40 sm:w-70 md:w-87 lg:w-100 2xl:w-125 shrink-0 transition-all duration-500"
                  >
                    <IntiHimpunanCard
                      data={item}
                      index={currentIndex * 2 + idx}
                    />
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <motion.div
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            animate={{
              width:
                currentIndex === idx
                  ? isMobile? 30: 50
                  : isMobile? 10: 20,
              height: isMobile ? 10 : 20,
              backgroundColor: currentIndex === idx ? "#A43DA5" : "#FFFFFF",
            }}
            className="h-2.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
