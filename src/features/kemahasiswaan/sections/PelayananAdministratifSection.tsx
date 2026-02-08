import { ShellLayer } from "@/components/layout/ShellLayer"
import { VerticalAccordion } from "../components/VerticalAccordion"
import { ItemDataJSON } from "../types/data"
import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer"
import Image from "next/image"
import RadialBackground from "@/components/ui/radial-bg"

interface Props {
  items: ItemDataJSON[]
}

export function PelayananAdministratifSection({ items }: Props) {
  return (
   
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <DecorationLayer>
        <div className="absolute w-full aspect-square scale-x-150 lg:scale-y-90 translate-y-[35%] lg:-translate-y-[35%]">
          <Image
            src="/assets/kemahasiswaan/bg-shape-1.webp"
            alt=""
            fill
          />
        </div>
      </DecorationLayer>

      <ContentLayer>
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 mx-auto lg:pt-30 pb-10">
          <ShellLayer>
            <ContentLayer>
              <section className="max-w-7xl min-h-[55vh] flex justify-center">
                <VerticalAccordion items={items} />
              </section>
            </ContentLayer>
          </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}
