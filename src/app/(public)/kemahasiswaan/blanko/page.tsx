import {
  Blanko,
  BlankoCarousel,
  HeroSection
} from "@/features/kemahasiswaan"
import { CardProps } from "@/features/kemahasiswaan/types";

export default function Page() {
  const carouselSection = Blanko.sections.find(
    (section) => section.type === "item-collection"
  )
  const items = carouselSection?.items as CardProps[]

  return (
    <>
      <HeroSection {...Blanko.hero} />
      <section className="px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <BlankoCarousel data={items} />
      </section>
    </>
  )
}