// components/FlipCard.tsx
"use client"
import { useState } from "react";

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
};

export default function FlipCard({ front, back, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`perspective-midrange w-full max-w-sm rounded-xl ${className ?? ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-3d cursor-pointer ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded-xl bg-rl-gradient-primary text-white p-6">
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