import {
  HeroSection,
  PendaftaranMainSection,
  usePendaftaranVerifikasiPage,
} from "@/features/kemahasiswaan"

/**
 * Page: Pendaftaran & Verifikasi
 *
 * Purpose:
 * Declarative composition layer for the Pendaftaran & Verifikasi page.
 *
 * Architectural Boundary:
 * - This file must remain presentation-only.
 * - Data sourcing, normalization, and validation
 *   are handled by usePendaftaranVerifikasiPage().
 *
 * Invariant:
 * - hero, accordionItems, and itemCollectionItems
 *   must be UI-ready and structurally valid.
 * - The feature layer owns data integrity.
 *
 * Maintenance Rule:
 * - If business rules or grouping logic change,
 *   update the feature hook — not this page.
 * - Keep this component free from transformation logic
 *   and conditional branching complexity.
 */
export default function Page() {
  /**
   * Data contract:
   * - hero: top-level contextual section
   * - accordionItems: structured items for collapsible content
   * - itemCollectionItems: grouped items for supporting content
   */
  const { hero, accordionItems, itemCollectionItems } =
    usePendaftaranVerifikasiPage()

  return (
    <>
      {/* Page-level hero for context */}
      <HeroSection data={hero} />

      {/* Main content section handling accordion and collection display */}
      <PendaftaranMainSection
        accordionItems={accordionItems}
        itemCollectionItems={itemCollectionItems}
      />
    </>
  )
}