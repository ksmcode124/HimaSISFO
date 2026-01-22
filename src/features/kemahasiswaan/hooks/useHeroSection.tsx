import { HeroData } from "../types/hero"

export function useHeroSection(hero: HeroData) {
  const hasBreadcrumb =
    Array.isArray(hero.breadcrumbItems) &&
    hero.breadcrumbItems.length > 0

  const minHeightClass = hasBreadcrumb
    ? "min-h-[20vh] lg:min-h-[30vh] -translate-y-[7vh] lg:translate-y-0"
    : "min-h-[50vh] lg:min-h-[55vh] translate-y-[8vh] lg:translate-y-[12vh]"

  return {
    hasBreadcrumb,
    minHeightClass,
  }
}