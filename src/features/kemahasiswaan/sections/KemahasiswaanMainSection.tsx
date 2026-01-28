import {
  BackgroundLayer,
  ContentLayer,
} from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"
import RadialBackground from "@/components/ui/radial-bg"
import { AlurKemahasiswaanCarousel } from "../components/AlurKemahasiswaanCarousel"
import { CardProps } from "../types/ui"
import { ShapeDecoration } from "./ShapeDecoration"

interface KemahasiswaanMainProps {
  items: CardProps[]
}

export function KemahasiswaanMainSection({ items }: KemahasiswaanMainProps) {
  return (
    <ShellLayer className="relative">
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <ContentLayer>
        <section
          className="
            relative
            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18
            py-10

            min-h-105
            md:min-h-120
            lg:min-h-[70vh]

            flex flex-col
            justify-center
            gap-4
          "
        >
          {/* Top decoration — ikut flow */}
          <ShapeDecoration position="top-right" />

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center">
            <AlurKemahasiswaanCarousel data={items} />
          </div>

          {/* Bottom decoration — ikut flow */}
          <ShapeDecoration position="bottom-left" />
        </section>
      </ContentLayer>
    </ShellLayer>

  )
}