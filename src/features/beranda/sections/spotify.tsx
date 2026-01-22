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

export default function Spotify() {
  const [activeIndex, setActiveIndex] = useState(0);
  const episodes = berandaData.media.spotify;

  return (
    <div className="pr-20 pt-15 relative">

      <section className="z-2 relative w-full rounded-br-[15rem] rounded-tr-2xl bg-linear-to-br from-green-500 to-green-800 p-10 text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img src="/spotify.svg" alt="Spotify" className="h-8" />
        </div>

        <SpotifyCarousel />

        {/* Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {episodes[activeIndex].season} {episodes[activeIndex].episode}:{" "}
            {episodes[activeIndex].title}
          </h2>
          <p className="mt-1 text-sm opacity-80">
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

            <button className="h-14 w-14 rounded-full bg-white text-green-600 flex items-center justify-center text-xl">
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
      <div className="rounded-br-[15rem] h-[calc(100%-4rem)] rounded-tr-2xl absolute right-15 w-full border top-30 z-1"></div>
    </div>
  );
}
