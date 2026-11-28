import Kemahasiswaan from "../data/kemahasiswaan.json"
import { CardProps } from "../types/ui"
import { CTASection } from "../types/ui"

/**
 * Hook: useKemahasiswaanPage
 *
 * Purpose:
 * Provides all the necessary data slices for the Kemahasiswaan page.
 * - hero: configuration for the hero section
 * - alurItems: items for the main carousel/flow section
 * - blankoSection: CTA section data
 *
 * Architectural Boundary:
 * - Pure data selection: this hook does not perform transformations
 *   beyond casting and null checks.
 * - All data is derived from the static Kemahasiswaan JSON file.
 *
 * Invariants:
 * - Hero section always exists in the JSON.
 * - alurItems may be empty if the item-collection section is missing.
 * - blankoSection is null if the section type "section" is not found.
 *
 * Risks / Failure Modes:
 * - JSON schema changes may break type assumptions (e.g., missing `items` array).
 * - Casting with `as CardProps[]` or `as CTASection` bypasses compile-time safety.
 *
 * Maintenance Guidelines:
 * - Keep the Kemahasiswaan JSON schema in sync with these selectors.
 * - Avoid adding business logic here; maintain separation of concerns.
 */
export function useKemahasiswaanPage() {
  const hero = selectHero()
  const alurItems = selectAlurCarouselItems()
  const blankoSection = selectBlankoSection()

  return {
    hero,
    alurItems,
    blankoSection,
  }
}

/**
 * Selects carousel items from the "item-collection" section.
 * Returns an empty array if the section or items are missing.
 */
function selectAlurCarouselItems(): CardProps[] {
  const section = Kemahasiswaan.sections.find(
    (s) => s.type === "item-collection"
  )

  if (!section || !Array.isArray(section.items)) {
    return []
  }

  return section.items as CardProps[]
}

/**
 * Selects the CTA section for Blanko.
 * Returns null if the section is not found.
 */
function selectBlankoSection(): CTASection | null {
  const section = Kemahasiswaan.sections.find(
    (s) => s.type === "section"
  )

  return section?.items as CTASection ?? null
}

/**
 * Selects the hero section from the Kemahasiswaan JSON.
 */
function selectHero() {
  return Kemahasiswaan.hero
}