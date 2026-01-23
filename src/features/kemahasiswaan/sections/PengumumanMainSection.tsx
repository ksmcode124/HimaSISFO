import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"
import Image from "next/image"
import RadialBackground from "@/components/ui/radial-bg"
import { HorizontalAccordion } from "../components/HorizontalAccordion"
import { ItemDataJSON } from "../types/data"

interface Props {
  informasiItems: ItemDataJSON[]
}

export function PengumumanMainSection({informasiItems}: Props) {
  return (
    <ShellLayer className="mt-[5vh] lg:mt-[15vh]">
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>
      <DecorationLayer>
        <div className="absolute w-full aspect-square sm:aspect-3/1 scale-x-140 lg:scale-y-130 translate-y-[40%]">
          <Image src={"/assets/kemahasiswaan/bg-shape-1.webp"} alt={""} fill className=""/>
        </div>
        <div className="absolute w-full aspect-square sm:aspect-3/1 scale-x-140 lg:scale-y-130 -translate-y-[25%] rotate-y-180">
          <Image src={"/assets/kemahasiswaan/bg-shape-1.webp"} alt={""} fill className=""/>
        </div>
      </DecorationLayer>
      <ContentLayer>
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 grid justify-items-center items-center pb-10">
          <ShellLayer>
            <ContentLayer>
              <section className="max-w-7xl min-h-[55vh] mx-auto pt-10 sm:pt-30">
                <HorizontalAccordion items={informasiItems} />
              </section>
            </ContentLayer>
          </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}