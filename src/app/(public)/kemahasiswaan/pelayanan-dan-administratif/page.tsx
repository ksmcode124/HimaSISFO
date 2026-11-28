import {
  HeroSection,
  usePelayananAdministratifPage,
  PelayananAdministratifSection,
} from "@/features/kemahasiswaan"

/**
 * Page: Pelayanan Administratif
 *
 * Purpose:
 * Declarative composition layer for the Pelayanan Administratif page.
 *
 * Architectural Boundary:
 * - Must remain free of business logic.
 * - Data fetching, validation, and transformation
 *   belong to the feature hook (usePelayananAdministratifPage).
 *
 * Invariant:
 * - hero and items must be defined and UI-ready.
 * - This component assumes the feature layer enforces data integrity.
 *
 * Maintenance Rule:
 * - Any changes to data structure must be handled in the feature layer.
 * - Avoid conditional rendering complexity here.
 */
export default function Page() {
  /**
   * Data contract for this page:
   * - hero: configuration for top hero section
   * - items: structured list for pelayanan content
   */
  const { hero, items } = usePelayananAdministratifPage()

  return (
    <>
      {/* Contextual hero section */}
      <HeroSection data={hero} />

      {/* Core content section rendering administrative services */}
      <PelayananAdministratifSection items={items} />
    </>
  )
}