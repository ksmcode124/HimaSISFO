import { HeroData } from "../types/hero"

export function useHeroSection(hero: HeroData) {
  const hasBreadcrumb =
    Array.isArray(hero.breadcrumbItems) &&
    hero.breadcrumbItems.length > 0

  const minHeightClass = "min-h-[25vh] h-full lg:min-h-[75vh]"

  return {
    hasBreadcrumb,
    minHeightClass,
  }
}
