import { HeroData } from "../types/hero"

export function useHeroSection(hero: HeroData) {
  const hasBreadcrumb =
    Array.isArray(hero.breadcrumbItems) &&
    hero.breadcrumbItems.length > 0

  const minHeightClass = hasBreadcrumb
    ? "min-h-[20vh] lg:min-h-[30vh]"
    : "min-h-[45vh] lg:min-h-[50vh]"

  return {
    hasBreadcrumb,
    minHeightClass,
  }
}