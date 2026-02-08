import HeroBeranda from "@/features/beranda/sections/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Vision from "@/features/beranda/sections/vision";
import History from "@/features/beranda/sections/history";
import Information from "@/features/beranda/sections/information";
import Kabinet from "@/features/beranda/sections/kabinet";
import Spotify from "@/features/beranda/sections/spotify";
import Awan from "@/features/beranda/components/awan";
import Pita from "@/components/beranda/pita";
import useBeranda from "@/features/beranda/hooks/useBeranda";
import { ShellLayer } from "@/components/layout/ShellLayer";


export default function Page() {
  return <ShellLayer>
    <HeroBeranda />
    {/* <Pita /> */}
    <Vision />
    {/* <Pita /> */}
    <History />
    <Information />
    <Awan className="" variant={'head'} />
    <Kabinet />
    <Graphics />
    <BehindTheWeb />
    <Spotify />
  </ShellLayer>
}

function Graphics() {
  return <div className="-mt-10 pb-30">
    <div className="relative flex items-center justify-center w-full h-full">
      <img src="/assets/beranda/web-prodi.png" className="w-full" alt="" />
    </div>
    <Awan variant={'tail'} className="-mt-5 sm:-mt-8 md:-mt-10 -z-1" />
    <Pita className="mt-20 sm:mt-15 md:mt-20 lg:mt-10" />
  </div>
}

function BehindTheWeb() {
  return (
    <div className="md:min-h-screen relative grid w-screen aspect-16/10 text-white bg-center items-end mb-30 bg-[url(/assets/beranda/code124-bg.png)] bg-cover z-0">

      {/* CONTENT */}
      <div className="absolute bottom-15 sm:bottom-25 md:bottom-30 lg:bottom-60 w-screen z-20 flex flex-col h-full justify-end items-start px-4 lg:px-16">
        <p>Behind The Web</p>
        <div className="flex justify-between w-full items-center">
          <span className="sm:text-7xl text-4xl md:text-[128px]">CODE124</span>
          <Button>Selengkapnya <ArrowRight /></Button>
        </div>
      </div>

      {/* SPOTIFY WAVE */}
      <img
        src="/assets/beranda/spotify-wave.svg"
        className="absolute w-full top-120 md:top-100 lg:top-0 z-10 pointer-events-none"
        alt=""
      />

      <Pita className="relative z-30 -mb-10 lg:-mb-40" />
    </div>
  )

}