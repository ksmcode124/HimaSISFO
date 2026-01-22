import {
  BackgroundLayer,
  ContentLayer,
  DecorationLayer,
} from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"
import RadialBackground from "@/components/ui/radial-bg"
import { AlurKemahasiswaanCarousel } from "../components/AlurKemahasiswaanCarousel"
import { CardProps } from "../types/ui"
import { ShapeDecoration } from "./ShapeDecoration"

interface KemahasiswaanMainProps {
  items: CardProps[]
}

/**
 * WHY:
 * Section owns layout & decoration.
 * Page should not care about visual details.
 */
export function KemahasiswaanMainSection({ items }: KemahasiswaanMainProps) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>
      <DecorationLayer>
        <ShapeDecoration position="top-right" />
        <ShapeDecoration position="bottom-left" />
      </DecorationLayer>
      <ContentLayer>
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 min-h-[60vh] sm:min-h-[75vh] pb-10">
          <ShellLayer>
            <ContentLayer>
              <section className="w-full flex items-center justify-center h-full min-h-[60vh] sm:min-h-[75vh]">
                <AlurKemahasiswaanCarousel data={items} />
              </section>
            </ContentLayer>
          </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}