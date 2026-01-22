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

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  const { hasBreadcrumb, minHeightClass } = useHeroSection(data)

  return (
    <ShellLayer>
      <BackgroundLayer>
        <Image
          src="/assets/kemahasiswaan/bg-hero.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </BackgroundLayer>

      <ContentLayer className="lg:pt-15">
        {hasBreadcrumb && (
          <BreadcrumbSection items={data.breadcrumbItems!} />
        )}

        <HeroView
          title={data.title}
          subtitle={data.subtitle}
          minHeightClass={minHeightClass}
        />

        <PitaDecoration />
      </ContentLayer>
    </ShellLayer>
  )
}

function PitaDecoration() {
  return (
    <div className="relative z-5 w-full aspect-4/1 lg:translate-y-[5vh] -translate-y-[5vh]">
      <Image
        src="/assets/kemahasiswaan/decoration-pita.webp"
        alt=""
        fill
        className="object-contain pointer-events-none"
        priority
      />
    </div>
  )
}
