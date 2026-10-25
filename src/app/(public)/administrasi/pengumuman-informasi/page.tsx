import {
  HeroSection,
  PengumumanMainSection,
  usePengumumanPage,
} from "@/features/kemahasiswaan"

/**
 * Page: Pengumuman
 *
 * Purpose:
 * Declarative composition layer for the Pengumuman page.
 *
 * Architectural Boundary:
 * - This file must remain presentation-only.
 * - Data sourcing, filtering, and normalization
 *   are handled inside usePengumumanPage().
 *
 * Invariant:
 * - hero and informasiItems must be fully prepared
 *   before rendering.
 * - The feature layer guarantees structural correctness.
 *
 * Maintenance Rule:
 * - Any change to announcement grouping, sorting,
 *   or formatting must occur in the feature hook.
 * - Avoid adding conditional data logic in this page.
 */
export default function Page() {
  /**
   * Data contract:
   * - hero: configuration for the page hero section
   * - informasiItems: collection of announcement entries
   */
  const { hero, informasiItems } = usePengumumanPage()

  return (
    <>
      {/* Contextual hero section for page identity */}
      <HeroSection data={hero} />

      {/* Main section rendering announcement content */}
      <PengumumanMainSection informasiItems={informasiItems} />
    </>
  )
}