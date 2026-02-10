// components/SpotifyEpisodePlayer.tsx
"use client";

import "swiper/css";
import "swiper/css/navigation";
import SpotifyCarousel from "../components/spotify-carousel";
import useBeranda from "../hooks/useBeranda";

export default function Spotify() {
  const { data, isLoading, error } = useBeranda();


  return (
    <div className="pr-8 mb-30 md:pr-20 md:pt-15 relative">
      <section className="z-2 relative w-full md:rounded-br-[125px] rounded-br-4xl rounded-tr-lg bg-linear-to-br from-green-500 to-green-800 p-4 sm:p-8 text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2 sm:mb-8">
          <img src="/assets/shared/logos/spotify.png" alt="Spotify" className="h-8" />
        </div>

        <SpotifyCarousel error={error} isLoading={isLoading} episodes={data?.episodes}/>

      </section>
      <div className="md:rounded-br-[125px] rounded-br-4xl h-[calc(100%-4rem)] rounded-tr-lg absolute right-15 w-full overflow-hidden shadow-xl top-30 z-1 backdrop-blur" />
    </div>
  );
}
