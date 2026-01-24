"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import kabinetDataRaw from "../data/kabinet.json";
import ProkerCard from "@/features/kabinet/components/ProkerCard";

export default function CarouselProker() {
  const prokerList =
    kabinetDataRaw.kabinet_list[0]?.departemen[0]?.program_kerja || [];
  const [currentIndex, setCurrentIndex] = useState(0);

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
    info: PanInfo
  ) => {
    if (info.offset.x < -DRAG_THRESHOLD) {
      handleNext();
    } else if (info.offset.x > DRAG_THRESHOLD) {
      handlePrev();
    }
  };

  const visibleIndices = [
    getLoopIndex(currentIndex),
    getLoopIndex(currentIndex + 1),
    getLoopIndex(currentIndex + 2),
    getLoopIndex(currentIndex + 3),
  ];

  return (
    <div className="relative flex flex-col items-center w-full overflow-visible touch-none">
      <div className="flex items-center justify-center gap-4 md:gap-16 min-h-[600px] w-full overflow-visible">
        {visibleIndices.map((dataIndex, displayOrder) => {
          const isActive = displayOrder === 1 || displayOrder === 2;
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
                scale: isActive ? 1 : 0.8,
                zIndex: isActive ? 20 : 10,
              }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className={cn(
                "cursor-grab active:cursor-grabbing transition-opacity duration-300",
                !isActive && "opacity-60"
              )}
            >
              <ProkerCard
                nama={proker.nama}
                deskripsi={proker.deskripsi}
                image_url={proker.image_url}
                isActive={isActive}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
