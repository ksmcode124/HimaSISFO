import Image from "next/image"
import { Suspense } from "react"
import RadialBackground from "@/components/ui/radial-bg"
import { ShellLayer } from "@/components/layout/ShellLayer"
import {
  BackgroundLayer,
  ContentLayer,
  DecorationLayer,
} from "@/components/layout/Layer"
import { BlankoItem } from "../types/ui"
import { BlankoCarousel } from "../components/BlankoCarousel"

interface Props {
  items: BlankoItem[]
}

export function BlankoMainSection({ items }: Props) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <DecorationLayer>
        <DecorationAssets />
      </DecorationLayer>

      <ContentLayer>
        <section className="pb-10">
          <ShellLayer>
            <ContentLayer>
              <div className="flex items-center justify-center lg:min-h-[65vh]">
                <Suspense fallback={null}>
                  <BlankoCarousel blankoItems={items} />
                </Suspense>
              </div>
            </ContentLayer>
          </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}

/* ---------------- internal ---------------- */

function DecorationAssets() {
  return (
    <>
      <div className="absolute left-0 rotate-27 -translate-x-[20%] w-38 sm:w-48 md:w-64 lg:w-88 aspect-2/1">
        <Image src="/assets/kemahasiswaan/decoration-cloud-1.webp" alt="" fill />
      </div>

      <div className="absolute bottom-0 rotate-13 right-0 translate-x-[40%] w-38 sm:w-48 md:w-64 lg:w-88 aspect-2/1">
        <Image src="/assets/kemahasiswaan/decoration-cloud-1.webp" alt="" fill />
      </div>

      <div className="absolute bottom-0 translate-y-[40%] -translate-x-[4%] aspect-square w-75 sm:w-125 md:w-3xl lg:w-6xl">
        <Image src="/assets/kemahasiswaan/decoration-shape-1.webp" alt="" fill />
      </div>

      <div className="absolute right-0  -translate-y-[50%] translate-x-[4%] aspect-square w-75 sm:w-125 md:w-3xl lg:w-6xl">
        <Image src="/assets/kemahasiswaan/decoration-shape-2.webp" alt="" fill />
      </div>
    </>
  )
}
