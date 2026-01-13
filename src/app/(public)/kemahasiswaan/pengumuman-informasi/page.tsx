import {
  Pengumuman,
  HeroSection,
  getSectionData,
  ItemDataJSON,
  KemahasiswaanDataFile,
  HorizontalAccordion
} from "@/features/kemahasiswaan"

export default function Page() {
  const informasiItems = getSectionData<ItemDataJSON[]>(Pengumuman as KemahasiswaanDataFile, "accordion")

  return (
    <>
      <HeroSection {...Pengumuman.hero} breadcrumbItems={Pengumuman.breadcrumbItems} />

      <section className="max-w-7xl min-h-[55vh] mx-auto">
        <HorizontalAccordion items={informasiItems} />
      </section>

    </>
  )
}
