import {
  PendaftaranVerifikasi,
  HeroSection,
  ItemDataJSON,
  KemahasiswaanDataFile,
  getSectionData,
  HorizontalAccordion,
} from "@/features/kemahasiswaan"

import Link from "next/link"
import Image from "next/image"
import CloudDecoration from "@/components/ui/cloud-decoration"
import { ShellLayer } from "@/components/layout/ShellLayer"
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer"
import RadialBackground from "@/components/ui/radial-bg"

export default function Page() {
  const itemCollectionData = getSectionData<ItemDataJSON[]>(PendaftaranVerifikasi as KemahasiswaanDataFile, "item-collection")
  const ktmItems = getSectionData<ItemDataJSON[]>(PendaftaranVerifikasi as KemahasiswaanDataFile, "accordion")

  return (
    <>
      <HeroSection {...PendaftaranVerifikasi.hero} breadcrumbItems={PendaftaranVerifikasi.breadcrumbItems} />
      <ShellLayer>
        <BackgroundLayer>
          <RadialBackground />
        </BackgroundLayer>
        <ContentLayer>
          <AccordionSection items={ktmItems} />
          <CloudDecoration className="rotate-z-180" />
          <ItemCollectionSection items={itemCollectionData} />
        </ContentLayer>
      </ShellLayer>
    </>
  )
}

function ItemCollectionSection({items} : {items: ItemDataJSON[]}){ 
  return (
    <section className="relative grid grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto py-5 border border-black rounded-2xl mb-5">
      {items?.map((item) => 
        <ItemCard item={item} key={item.id}/>
      )}
      <div className="aspect-4/3 -z-1 w-120 absolute bottom-0 translate-y-[30%] -translate-x-[45%] rotate-15">
        <Image src={"/assets/kemahasiswaan/decoration-cloud-1.webp"} alt={""} fill className="object-contain" />
      </div>
      <div className="aspect-4/3 -z-1 w-90 absolute bottom-0 right-0 translate-y-[30%] translate-x-[45%] -rotate-10">
        <Image src={"/assets/kemahasiswaan/decoration-cloud-1.webp"} alt={""} fill className="object-contain" />
      </div>
    </section>
  )
}

function ItemCard({item} : {item: ItemDataJSON}) {
  return (
    <Link
      href={`pendaftaran-dan-verifikasi/${item.id}`}
      className="relative aspect-4/3"
    >
      <div
        className="
          absolute inset-0
          bg-[url('/assets/kemahasiswaan/bg-folder.webp')]
          bg-contain bg-no-repeat bg-center
        "
      />

      <div className="absolute bottom-2 left-2 md:bottom-10 md:left-10 z-10 px-8 w-[80%] pt-6">
        <span className="text-white text-xs md:text-sm font-medium">
          {item.title}
        </span>
      </div>
    </Link>
  )
}

function AccordionSection({items} : {items: ItemDataJSON[]}){
  return(
    <section className="max-w-7xl mb-10 mx-auto space-y-5">
      <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
        <div className="relative h-50 w-50">
          <Image src="/assets/kemahasiswaan/icon-pendaftaran-dan-verifikasi.webp" alt={""} fill className="object-contain" />
        </div>
        <HorizontalAccordion items={items} />
      </div>
    </section>
  )
}
