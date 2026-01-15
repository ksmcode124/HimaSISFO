import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer";
import { ShellLayer } from "@/components/layout/ShellLayer";
import {
  Blanko,
  BlankoCarousel,
  HeroSection,
  BlankoItem,
  KemahasiswaanDataFile,
  getSectionData
} from "@/features/kemahasiswaan"
import { Suspense } from "react";
import Image from "next/image";
import RadialBackground from "@/components/ui/radial-bg";

export default function Page() {
  const blankoItems = getSectionData<BlankoItem[]>(Blanko as KemahasiswaanDataFile, "item-collection");

  return (
    <>
      <HeroSection {...Blanko.hero} breadcrumbItems={Blanko.breadcrumbItems} />
      <MainContent items={blankoItems} />
    </>
  )
}

function MainContent({items}: {items:BlankoItem[]}) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>
      <ContentLayer>
        <section className="px-6 lg:px-12 overflow-clip pb-10">
          <ShellLayer>
            <DecorationLayer>
              <div className="absolute left-0 rotate-27 -translate-x-[20%] w-50 sm:w-60 lg:w-80 aspect-2/1">
                <Image src={"/assets/kemahasiswaan/decoration-cloud-1.webp"} alt={""} fill />
              </div>
              <div className="absolute bottom-0 rotate-13 right-0 translate-x-[40%] w-50 sm:w-60 lg:w-80 aspect-2/1">
                <Image src={"/assets/kemahasiswaan/decoration-cloud-1.webp"} alt={""} fill />
              </div>
              <div className="absolute bottom-0 translate-y-[15%] -translate-x-[4%] aspect-3/3 max-w-6xl w-full">
                <Image src={"/assets/kemahasiswaan/decoration-shape-1.webp"} alt={""} fill />
              </div>
              <div className="absolute right-0 -translate-y-[40%] translate-x-[4%] aspect-3/3 max-w-6xl w-full">
                <Image src={"/assets/kemahasiswaan/decoration-shape-2.webp"} alt={""} fill />
              </div>
            </DecorationLayer>
            <ContentLayer>
              <div className="flex items-center justify-center min-h-screen">
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