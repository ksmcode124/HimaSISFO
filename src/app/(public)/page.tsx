import HeroBeranda from "@/features/beranda/sections/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Vision from "@/features/beranda/sections/vision";
import History from "@/features/beranda/sections/history";
import Information from "@/features/beranda/sections/information";
import Kabinet from "@/features/beranda/sections/kabinet";
import Spotify from "@/features/beranda/sections/spotify";
import Awan from "@/features/beranda/components/awan";
import Pita from "@/features/beranda/components/pita";
import { ShellLayer } from "@/components/layout/ShellLayer";
import { SiteFooter } from "@/components/layout";
import { berandaData } from "@/features/beranda";


export default function Page() {
  return <ShellLayer>
    <HeroBeranda />
    <Vision />
    <History />
    <Information />
    <Awan className="" variant={'head'} />
    <Kabinet />
    <Graphics />
    <BehindTheWeb />
    <Spotify />
    <SiteFooter />
  </ShellLayer>
}

function Graphics() {
  return <div className="-mt-10 pb-30">
    <div className="relative flex items-center justify-center w-full h-full">
      <img src="/assets/beranda/web-prodi.png" className="w-full" alt="" />
      <div className="absolute bottom-10 md:bottom-20 p-[3px] rounded-full bg-linear-to-b from-columbia-blue to-[#3385FF] hover:scale-105 transition-transform">
        <a href="http://si.upnyk.ac.id" target="_blank" className="md:text-2xl font-bold text-white bg-linear-to-b from-primary to-[#456882] rounded-full px-4 py-2 block">
          WEB PRODI SISTEM INFORMASI
        </a>
      </div>
    </div>
    <Awan variant={'tail'} className="-mt-5 sm:-mt-8 md:-mt-10 -z-1" />
    <Pita className="mt-20 sm:mt-15 md:mt-20 lg:mt-10" />
  </div>
}

function BehindTheWeb() {
  const data = berandaData;

  return (
    <div className="md:min-h-screen relative grid w-screen aspect-16/10 text-white bg-center items-end mb-30 bg-cover z-0">

      <img src="/assets/beranda/code124-bg.png" className="w-full h-full inset-0 absolute object-cover z-15" alt="" />
      {/* CONTENT */}
      <div className="absolute bottom-15 sm:bottom-25 md:bottom-30 lg:bottom-60 w-screen z-20 flex flex-col h-full justify-end items-start px-4 lg:px-16">
        <p className="text-lg">{data.behind_the_web.title}</p>
        <div className="flex justify-between w-full items-center">
          <span className="sm:text-7xl text-4xl md:text-[128px]">{data.behind_the_web.author}</span>
          <a href={data.behind_the_web.url} className="bg-primary-foreground/5 text-lg lg:text-2xl flex flex-items-center rounded-full px-4 py-2 gap-2 items-center border-white border-2">Selengkapnya <ArrowRight className="size-8" /></a>
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