import {
  Blanko,
  BlankoCarousel,
  HeroSection,
  BlankoItem,
  KemahasiswaanDataFile,
  getSectionData
} from "@/features/kemahasiswaan"

export default function Page() {
  const blankoItems = getSectionData<BlankoItem[]>(Blanko as KemahasiswaanDataFile, "item-collection");

  return (
    <>
      <HeroSection {...Blanko.hero} breadcrumbItems={Blanko.breadcrumbItems} />
      <section className="px-6 lg:px-12 max-w-7xl mx-auto min-h-170 pt-10">
        <BlankoCarousel blankoItems={blankoItems} />
      </section>
    </>
  )
}