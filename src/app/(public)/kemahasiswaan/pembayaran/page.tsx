import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"
import RadialBackground from "@/components/ui/radial-bg"
import {
  Pembayaran,
  HeroSection,
  PembayaranSection,
  ItemDataJSON,
  getSectionData,
  KemahasiswaanDataFile
} from "@/features/kemahasiswaan"
import Image from "next/image"

export default function Page() {
  const pembayaranItems = getSectionData<ItemDataJSON[]>(
    Pembayaran as KemahasiswaanDataFile,
    "accordion"
  )

  return (
    <>
      <HeroSection {...Pembayaran.hero} breadcrumbItems={Pembayaran.breadcrumbItems} />

    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>
      <DecorationLayer>
        <div className="absolute w-full aspect-square scale-x-150 lg:scale-y-90 translate-y-[35%] lg:-translate-y-[35%] rotate-y-190">
          <Image src={"/assets/kemahasiswaan/bg-shape-1.webp"} alt={""} fill className=""/>
        </div>
      </DecorationLayer>
      <ContentLayer>
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 mx-auto pt-30 pb-10">
          <ShellLayer>
            <ContentLayer>
              <section className="max-w-7xl min-h-[55vh] mx-auto">
                <PembayaranSection
                  featuredItems={pembayaranItems.slice(0, 3)}
                  otherItems={pembayaranItems.slice(3)}
                />
              </section>
            </ContentLayer>
          </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>

      
    </>
  )
}
