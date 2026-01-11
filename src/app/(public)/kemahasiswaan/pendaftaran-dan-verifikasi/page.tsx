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

      <section className="max-w-7xl min-h-[55vh] mx-auto space-y-5">
        <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
          <div className="relative h-50 w-50">
            <Image src="/assets/kemahasiswaan/icon-pendaftaran-dan-verifikasi.webp" alt={""} fill className="object-contain" />
          </div>
          <HorizontalAccordion items={ktmItems} />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto py-5 border border-black rounded-2xl mb-5">
        {itemCollectionData?.map((item) => {
          return (
            <Link
              key={item.id}
              href={`pendaftaran-dan-verifikasi/${item.id}`}
              className="border bg-rl-gradient-primary aspect-square h-80 flex flex-col justify-end p-5"
            >
              <span className="text-white font-semibold text-xl">
                {item.title}
              </span>
            </Link>
          )
        })}
      </section>

    </>
  )
}
