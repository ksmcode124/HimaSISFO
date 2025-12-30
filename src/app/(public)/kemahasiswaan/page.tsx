import {
  Kemahasiswaan,
  AlurKemahasiswaanCarousel,
  BlankoSection,
  HeroSection
} from "@/features/kemahasiswaan"
import { CardProps, CTASection } from "@/features/kemahasiswaan/types";

export default function Page() {
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
      <section className="px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <AlurKemahasiswaanCarousel data={items} />
      </section>
      <BlankoSection {...blankoContent} />
    </>
  )
}