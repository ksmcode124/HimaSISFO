import {
  Pengumuman,
  HeroSection,
  getSectionData,
  AccordionItemBlock,
  KemahasiswaanDataFile,
  HorizontalAccordion
} from "@/features/kemahasiswaan"

export default function Page() {
  const informasiItems = getSectionData<AccordionItemBlock[]>(Pengumuman as KemahasiswaanDataFile, "accordion")

  return (
    <>
      <HeroSection {...Pengumuman.hero} breadcrumbItems={Pengumuman.breadcrumbItems} />

      <section className="max-w-7xl min-h-[55vh] mx-auto">
        <HorizontalAccordion items={informasiItems} />
      </section>

    </>
  )
}
