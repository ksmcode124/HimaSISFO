import {
  Pembayaran,
  HeroSection,
  PembayaranSection,
  AccordionItemBlock,
  getSectionData,
  KemahasiswaanDataFile
} from "@/features/kemahasiswaan"

export default function Page() {
  const pembayaranItems = getSectionData<AccordionItemBlock[]>(
    Pembayaran as KemahasiswaanDataFile,
    "accordion"
  )

  return (
    <>
      <HeroSection {...Pembayaran.hero} breadcrumbItems={Pembayaran.breadcrumbItems} />

      <section className="max-w-7xl min-h-[55vh] mx-auto space-y-5">
        <PembayaranSection
          featuredItems={pembayaranItems.slice(0, 3)}
          otherItems={pembayaranItems.slice(3)}
        />
      </section>
    </>
  )
}
