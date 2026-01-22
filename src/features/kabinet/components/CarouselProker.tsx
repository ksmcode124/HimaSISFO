"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import ProkerCard from "@/features/kabinet/components/ProkerCard";
import { DepartemenResponse } from "../types";

interface CarouselProkerProps {
  prokerList: DepartemenResponse["proker"];
}

export default function CarouselProker({
  prokerList = [],
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
    setCurrentIndex((prev) => getLoopIndex(prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => getLoopIndex(prev - 1));
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

  // LOGIC TAMPILAN
  // Desktop: 4 item (inactive - active - active - inactive)
  // Mobile: 3 item (inactive - active - inactive)
  const visibleIndices = isMobile
    ? [
        getLoopIndex(currentIndex - 1),
        getLoopIndex(currentIndex),
        getLoopIndex(currentIndex + 1),
      ]
    : [
        getLoopIndex(currentIndex),
        getLoopIndex(currentIndex + 1),
        getLoopIndex(currentIndex + 2),
        getLoopIndex(currentIndex + 3),
      ];

  return (
    <div className="relative flex flex-col items-center w-full overflow-visible touch-none">
      <div className="flex items-center justify-center gap-4 md:gap-16 min-h-150 w-full overflow-visible">
        {visibleIndices.map((dataIndex, displayOrder) => {
          const isActive = isMobile
            ? displayOrder === 1
            : displayOrder === 1 || displayOrder === 2;

          const proker = prokerList[dataIndex];

          return (
            <motion.div
              key={`${currentIndex}-${dataIndex}-${displayOrder}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: isActive ? 0.5 : 0.8,
                zIndex: isActive ? 20 : 10,
              }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className={cn(
                "cursor-grab active:cursor-grabbing transition-opacity duration-300 shrink-0",

                isMobile ? (isActive ? "w-fit" : "-mx-44") : "w-auto md:gap-16",

                !isActive && "opacity-60",
              )}
            >
              <ProkerCard
                nama={proker.nama_proker}
                deskripsi={proker.deskripsi_proker}
                image={proker.foto_proker}
                isActive={isActive}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
