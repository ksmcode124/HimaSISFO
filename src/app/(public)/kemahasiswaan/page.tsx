import {
  Kemahasiswaan,
  AlurKemahasiswaanCarousel,
  BlankoSection,
  HeroSection
} from "@/features/kemahasiswaan"
import { CardProps, CTASection } from "@/features/kemahasiswaan/types";

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
      <section className="px-6 lg:px-12 max-w-7xl mx-auto min-h-170 pt-10">
        <AlurKemahasiswaanCarousel data={items} />
      </section>
      <BlankoSection {...blankoContent} />
    </>
  )
}