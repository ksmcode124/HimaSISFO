import {
  PendaftaranVerifikasi,
  HeroSection,
  AccordionItemBlock,
  KemahasiswaanDataFile,
  getSectionData,
  HorizontalAccordion,
} from "@/features/kemahasiswaan"

import Link from "next/link"
import Image from "next/image"

export default function Page() {
  const itemCollectionData = getSectionData<AccordionItemBlock[]>(PendaftaranVerifikasi as KemahasiswaanDataFile, "item-collection")
  const ktmItems = getSectionData<AccordionItemBlock[]>(PendaftaranVerifikasi as KemahasiswaanDataFile, "accordion")

  return (
    <>
      <HeroSection {...PendaftaranVerifikasi.hero} breadcrumbItems={PendaftaranVerifikasi.breadcrumbItems} />
      <AccordionSection items={ktmItems} />
      <ItemCollectionSection items={itemCollectionData} />
    </>
  )
}

function ItemCollectionSection({items} : {items: AccordionItemBlock[]}){ 
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto py-5 border border-black rounded-2xl mb-5">
      {items?.map((item) => 
        <ItemCard item={item} key={item.id}/>
      )}
    </section>
  )
}

function ItemCard({item} : {item: AccordionItemBlock}) {
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

function AccordionSection({items} : {items: AccordionItemBlock[]}){
  return(
    <section className="max-w-7xl min-h-[55vh] mx-auto space-y-5">
      <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
        <div className="relative h-50 w-50">
          <Image src="/assets/kemahasiswaan/icon-pendaftaran-dan-verifikasi.webp" alt={""} fill className="object-contain" />
        </div>
        <HorizontalAccordion items={items} />
      </div>
    </section>
  )
}
