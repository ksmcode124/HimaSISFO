import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer";
import { ShellLayer } from "@/components/layout/ShellLayer";
import {
  Kemahasiswaan,
  AlurKemahasiswaanCarousel,
  BlankoSection,
  HeroSection
} from "@/features/kemahasiswaan"
import { CardProps, CTASection } from "@/features/kemahasiswaan/types";
import Image from "next/image";

export default function Page() {
  /** Membaca dan mencari data dari type section yang ada dari data json */
  const carouselSection = Kemahasiswaan.sections.find(
    (section) => section.type === "item-collection"
  )
  const items = carouselSection?.items as CardProps[]

  const blankoContent = Kemahasiswaan.sections.find(
    (section) => section.type === "section"
  )?.items as CTASection

  return (
    <>
      <HeroSection {...Kemahasiswaan.hero} />
      <MainContent items={items} />
      <BlankoSection {...blankoContent} />
    </>
  )
}

function MainContent({items} : {items: CardProps[]}) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <div className="flex gap-x-2 justify-between h-full w-full">
          <div className="bg-[radial-gradient(circle_at_left,#7dd3fc_0%,transparent_50%)] w-full h-full" />
          <div className="bg-[radial-gradient(circle_at_right,#7dd3fc_0%,transparent_50%)] w-full h-full" />
        </div>
      </BackgroundLayer>
      <ContentLayer>

        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 min-h-screen">
        <ShellLayer>
          <DecorationLayer>
            <div className="absolute top-10 lg:top-25 right-0 w-100 translate-x-25 sm:w-120 md:w-150 lg:w-200 aspect-4/1 -rotate-z-180">
              <Image src={"/assets/kemahasiswaan/decoration-cloud-2.webp"} alt={""} fill />
            </div>
            <div className="absolute bottom-10 lg:bottom-25 left-0 -translate-x-25 w-100 sm:w-120 md:w-150 lg:w-200 aspect-4/1">
              <Image src={"/assets/kemahasiswaan/decoration-cloud-2.webp"} alt={""} fill />
            </div>
          </DecorationLayer>
          <ContentLayer>
            <section className="w-full flex items-center justify-center min-h-screen">
              <AlurKemahasiswaanCarousel data={items} />
            </section>
          </ContentLayer>
        </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}