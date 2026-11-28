import {
  PelayananAdministratif,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

/**
 * Hook: usePelayananAdministratifPage
 *
 * Purpose:
 * Provides the data required to render the Pelayanan Administratif page.
 * - hero: configuration for the hero section, including breadcrumbs
 * - items: structured accordion items for the main content
 *
 * Architectural Boundary:
 * - Delegates JSON extraction to `getSectionData`.
 * - Purely a data hook; no UI logic or side effects.
 *
 * Invariants:
 * - hero.breadcrumbItems must be defined and array-like.
 * - items corresponds to the "accordion" section in the JSON.
 *
 * Risks / Failure Modes:
 * - Casting `PelayananAdministratif as KemahasiswaanDataFile` bypasses TypeScript type safety.
 * - If "accordion" section is missing or malformed, items may be undefined or empty.
 *
 * Maintenance Guidelines:
 * - Keep PelayananAdministratif JSON schema in sync with expectations.
 * - Avoid adding transformation or filtering logic here; maintain separation of concerns.
 */
export function usePelayananAdministratifPage() {
  // Hero section derived from static JSON, enriched with breadcrumbs
  const hero: HeroData = {
    ...PelayananAdministratif.hero,
    breadcrumbItems: PelayananAdministratif.breadcrumbItems,
  }

  // Accordion items extracted from the JSON using the generic selector
  const items = getSectionData<ItemDataJSON[]>(
    PelayananAdministratif as KemahasiswaanDataFile,
    "accordion"
  )

  return {
    hero,
    items,
  }
}