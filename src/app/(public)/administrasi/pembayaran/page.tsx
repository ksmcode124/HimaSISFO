import {
  HeroSection,
  usePembayaranPage,
  PembayaranMainSection,
} from "@/features/kemahasiswaan"

/**
 * Page: Pembayaran
 *
 * Purpose:
 * Composition layer for the Pembayaran page.
 * Assembles UI sections without owning business logic.
 *
 * Architectural Boundary:
 * - Data retrieval and shaping are delegated to usePembayaranPage().
 * - This component must remain declarative and predictable.
 *
 * Invariant:
 * - hero, featuredItems, and otherItems must be fully prepared
 *   before rendering.
 * - The feature layer guarantees data integrity and structure.
 *
 * Maintenance Rule:
 * - If payment categorization logic changes,
 *   update it in the feature hook — not here.
 * - Avoid introducing branching or transformation logic in this file.
 */
export default function Page() {
  /**
   * Data contract:
   * - hero: hero section configuration
   * - featuredItems: prioritized payment entries
   * - otherItems: remaining payment entries
   */
  const { hero, featuredItems, otherItems } = usePembayaranPage()

  return (
    <>
      {/* Contextual hero section */}
      <HeroSection data={hero} />

      {/* Main section with categorized payment content */}
      <PembayaranMainSection
        featuredItems={featuredItems}
        otherItems={otherItems}
      />
    </>
  )
}