// components/SpotifyEpisodePlayer.tsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { berandaData } from "..";
import EpisodeCard from "../components/episodeCard";
import { Card } from "@/components/ui/card";
import SpotifyCarousel from "../components/spotify-carousel";
import { Glass } from "@/components/ui/Glass";

export default function Spotify() {
  const [activeIndex, setActiveIndex] = useState(0);
  const episodes = berandaData.media.spotify;

  return (
    <div className="pr-8 mb-30 md:pr-20 md:pt-15 relative">
      <section className="z-2 relative w-full md:rounded-br-[125px] rounded-br-4xl rounded-tr-lg bg-linear-to-br from-green-500 to-green-800 p-4 sm:p-8 text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2 sm:mb-8">
          <img src="/spotify.svg" alt="Spotify" className="h-8" />
        </div>

        <SpotifyCarousel />

        {/* Info */}
        <div className="md:mb-6">
          <h2 className="md:text-2xl text-sm font-bold">
            {episodes[activeIndex].season} {episodes[activeIndex].episode}:{" "}
            {episodes[activeIndex].title}
          </h2>
          <p className="mt-1 text-xs md:text-sm opacity-80">
            {episodes[activeIndex].date}
          </p>
        </div>

        {/* Player Control */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="range"
            className="w-full max-w-xl accent-white"
          />

          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? episodes.length - 1 : prev - 1
                )
              }
            >
              ⏮
            </button>

            <button className="size-8 text-xs sm:size-10 rounded-full bg-white text-green-600 flex items-center justify-center sm:text-lg">
              ▶
            </button>

            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === episodes.length - 1 ? 0 : prev + 1
                )
              }
            >
              ⏭
            </button>
          </div>
        </div>
      </section>
      <div className="md:rounded-br-[125px] rounded-br-4xl h-[calc(100%-4rem)] rounded-tr-lg absolute right-15 w-full overflow-hidden shadow-lg top-30 z-1">
        <Glass className="w-full h-full" />
      </div>
    </div>
  );
}
