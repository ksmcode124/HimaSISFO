import Image from "next/image"
import { BreadcrumbSection } from "./BreadcrumbSection"
import { ShellLayer } from "@/components/layout/ShellLayer"
import {
  BackgroundLayer,
  ContentLayer,
} from "@/components/layout/Layer"
import { HeroData } from "../types/hero"
import { useHeroSection } from "../hooks/useHeroSection"
import { HeroView } from "../components/HeroView"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  const { hasBreadcrumb, minHeightClass } = useHeroSection(data)

  return (
    <ShellLayer className="z-10 mb-[3svh] md:mb-[2svh] lg:mb-[15vh]">
      <BackgroundLayer
        className="
          bg-[url('/assets/kemahasiswaan/bg-hero.webp')]
          bg-cover
          bg-center
        "
      >
      </BackgroundLayer>

      <ContentLayer className={cn(minHeightClass, "relative flex flex-col")}>
        {hasBreadcrumb && (
          <BreadcrumbSection items={data.breadcrumbItems!} />
        )}

        <div className={cn("flex-1 flex justify-center items-center", hasBreadcrumb ? "" : "pt-[72px] lg:pt-[96px]")}> {/* Ubah setinggi Navbar & BreadCrumbs*/}
          <HeroView
            title={data.title}
            subtitle={data.subtitle}
          />
        </div>

        <PitaDecoration />
      </ContentLayer>
    </ShellLayer>
  )
}

function PitaDecoration() {
  return (
    <div className="absolute bottom-[5%] max-sm:bottom-0 lg:-bottom-[20%] left-0 z-5 w-full aspect-5/1 pointer-events-none">
      <Image
        src="/assets/kemahasiswaan/decoration-pita.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

