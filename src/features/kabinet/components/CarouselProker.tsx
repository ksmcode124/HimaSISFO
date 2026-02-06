"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ProkerCard from "@/features/kabinet/components/ProkerCard";
import { DepartemenResponse } from "../types";

interface CarouselProkerProps {
  prokerList: DepartemenResponse["proker"];
  gradientOrnament2: string
}

export default function CarouselProker({
  prokerList = [],
  gradientOrnament2
}: CarouselProkerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const DRAG_THRESHOLD = 50;
  const totalData = prokerList.length;

  const getLoopIndex = (index: number) => {
    return (index + totalData) % totalData;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => getLoopIndex(prev + (isMobile ? 1 : 2)));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => getLoopIndex(prev - (isMobile ? 1 : 2)));
  };

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -DRAG_THRESHOLD) {
      handleNext();
    } else if (info.offset.x > DRAG_THRESHOLD) {
      handlePrev();
    }
  };

  if (totalData === 0) return null;

  const renderSingleCard = (index: number, isActive: boolean, positionLabel: string) => {
    const proker = prokerList[index];
    if (!proker) return null;

    return (
      <motion.div
        key={`card-${positionLabel}-${index}-${currentIndex}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: isActive ? 0.5 : 0.8,
          zIndex: isActive ? 20 : 10,
        }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "transition-opacity duration-300 shrink-0",
          isMobile ? (isActive ? "w-fit" : "-mx-44") : "w-auto md:gap-16",
          !isActive && "opacity-60",
        )}
      >
        <ProkerCard
          gradientOrnament2={gradientOrnament2}
          nama={proker.nama_proker}
          deskripsi={proker.deskripsi_proker}
          image={proker.foto_proker}
          isActive={isActive}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative flex flex-col items-center w-full overflow-visible touch-none">
      <div className="flex items-center justify-center gap-4 md:gap-16 min-h-150 w-full overflow-visible">
        <AnimatePresence mode="popLayout">
          <div 
            key={`container-${currentIndex}`} 
            className="flex items-center justify-center gap-4 md:gap-16 w-full overflow-visible"
          >
            {/* KIRI (inactive) */}
            {renderSingleCard(
              getLoopIndex(isMobile ? currentIndex - 1 : currentIndex), 
              false, 
              "left"
            )}

            {/* TENGAH (active) */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              className="flex gap-4 md:gap-16 cursor-grab active:cursor-grabbing z-30"
            >
              {isMobile ? (
                renderSingleCard(getLoopIndex(currentIndex), true, "mid-mob")
              ) : (
                <>
                  {renderSingleCard(getLoopIndex(currentIndex + 1), true, "mid-1")}
                  {renderSingleCard(getLoopIndex(currentIndex + 2), true, "mid-2")}
                </>
              )}
            </motion.div>

            {/* KANAN (inactive) */}
            {renderSingleCard(
              getLoopIndex(isMobile ? currentIndex + 1 : currentIndex + 3), 
              false, 
              "right"
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}