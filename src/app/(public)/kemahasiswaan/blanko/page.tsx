import {
  Blanko,
  BlankoCarousel,
  HeroSection
} from "@/features/kemahasiswaan"
import { BlankoProps } from "@/features/kemahasiswaan/types";

export default function Page() {
  const carouselSection = Blanko.sections.find(
    (section) => section.type === "item-collection"
  )
  const items = carouselSection?.items as BlankoProps[]

  return (
    <>
      <HeroSection {...Blanko.hero} breadcrumbItems={Blanko.breadcrumbItems} />
      <section className="px-6 lg:px-12 max-w-7xl mx-auto min-h-170 pt-10">
        <BlankoCarousel data={items} />
      </section>
    </>
  )
}