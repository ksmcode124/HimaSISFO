import {
  BlankoMainSection,
  HeroSection,
  useBlankoPage,
} from "@/features/kemahasiswaan"

/**
 * Page: Blanko
 *
 * Purpose:
 * Composition layer for the Blanko page.
 * Responsible only for assembling UI sections.
 *
 * Architectural Boundary:
 * - No business logic or data transformation is allowed here.
 * - All data preparation must occur inside useBlankoPage().
 *
 * Invariant:
 * - hero and items must be fully prepared and UI-ready
 *   when returned from the feature hook.
 *
 * Maintenance Rule:
 * - If data shape changes, update the feature layer.
 * - Keep this file declarative and predictable.
 */
export default function Page() {
  /**
   * Data contract:
   * - hero: required hero section data
   * - items: required list for main section
   *
   * This hook acts as the feature boundary.
   */
  const { hero, items } = useBlankoPage()

  return (
    <>
      {/* Static hero section for page context */}
      <HeroSection data={hero} />

      {/* Main content section rendering blanko items */}
      <BlankoMainSection items={items} />
    </>
  )
}