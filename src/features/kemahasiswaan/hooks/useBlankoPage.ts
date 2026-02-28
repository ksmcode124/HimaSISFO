import {
  Blanko,
  BlankoItem,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

/**
 * Hook: useBlankoPage
 *
 * Purpose:
 * Provides the data required to render the Blanko page.
 * This includes the hero section configuration and the collection
 * of items displayed in the main content section.
 *
 * Architectural Notes:
 * - This hook delegates all JSON extraction to getSectionData().
 * - It does not perform any data transformation beyond simple
 *   mapping of hero and breadcrumb items.
 * - Maintains a strict separation of data access (service layer)
 *   from UI rendering (page components).
 *
 * Type Safety Considerations:
 * - `Blanko as KemahasiswaanDataFile` bypasses compile-time checks.
 *   If the structure of Blanko JSON changes, TypeScript will not
 *   catch type mismatches.
 * - `getSectionData<BlankoItem[]>` relies on runtime trust that
 *   the "item-collection" section exists and has the correct shape.
 *
 * Risk / Failure Modes:
 * - If the section "item-collection" is missing, `items` will be undefined.
 *   Calling code must handle this scenario to avoid runtime errors.
 * - Schema changes in Blanko (renamed fields, altered structure)
 *   can silently break this hook.
 *
 * Maintenance Recommendations:
 * - Keep the JSON schema in sync with this hook's expectations.
 * - Avoid adding any filtering or complex transformations here.
 * - For future-proofing, consider validating the JSON structure
 *   before passing it to getSectionData().
 */
export function useBlankoPage() {
  const items = getSectionData<BlankoItem[]>(
    Blanko as KemahasiswaanDataFile,
    "item-collection"
  )

  // Hero section construction combining hero data and breadcrumbs
  const hero: HeroData = {
    ...Blanko.hero,
    breadcrumbItems: Blanko.breadcrumbItems
  }

  return {
    hero,
    items,
  }
}