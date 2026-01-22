// components/FlipCard.tsx
"use client"
import { useState } from "react";
import { useIsMobile } from "./AlurKemahasiswaanCarousel";

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  id?: string | null,
  setSelectedId: (id: string | null) => void
};

export function FlipCard({ front, back, className, setSelectedId, id }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile()

  const handleClick = () => {
    if (isMobile) {
      if (setSelectedId && id !== undefined) {
        setSelectedId(id); // buka modal dari parent
      }
    } else {
      setFlipped(!flipped); // flip card desktop
    }
  };

  return (
    <div
      className={`perspective-midrange w-full rounded-xl ${className ?? ""}`}
      onClick={handleClick}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="group absolute inset-0 backface-hidden cursor-pointer flex items-center justify-center rounded-xl flip-card transition-all duration-500 text-white p-6">
          {front}
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center rounded-xl bg-[#BCCCDC] text-black p-6">
          {back}
        </div>
      </div>
    </div>
  );
}