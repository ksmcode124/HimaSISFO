import { HeroData } from "../types/hero"

export function useHeroSection(hero: HeroData) {
  const hasBreadcrumb =
    Array.isArray(hero.breadcrumbItems) &&
    hero.breadcrumbItems.length > 0

  const minHeightClass = "min-h-[40vh] sm:min-h-[50vh] md:min-h-[45svh] lg:min-h-[75vh]"


  return {
    hasBreadcrumb,
    minHeightClass,
  }
}
