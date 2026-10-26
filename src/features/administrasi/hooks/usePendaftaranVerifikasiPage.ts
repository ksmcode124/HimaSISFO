import {
  PendaftaranVerifikasi,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

/**
 * Hook: usePendaftaranVerifikasiPage
 *
 * Purpose:
 * Provides all data slices necessary to render the Pendaftaran & Verifikasi page.
 * - hero: configuration for the hero section including breadcrumbs
 * - accordionItems: structured collapsible content
 * - itemCollectionItems: grouped supporting content
 *
 * Architectural Boundary:
 * - Purely a data hook; no UI logic or side effects.
 * - Delegates JSON section extraction to `getSectionData`.
 *
 * Invariants:
 * - hero.breadcrumbItems must be defined and array-like.
 * - accordionItems corresponds to the "accordion" section in JSON.
 * - itemCollectionItems corresponds to the "item-collection" section in JSON.
 *
 * Risks / Failure Modes:
 * - Casting `PendaftaranVerifikasi as KemahasiswaanDataFile` bypasses TypeScript type safety.
 * - If JSON schema changes (missing sections or malformed items), returned arrays may be empty.
 *
 * Maintenance Guidelines:
 * - Keep PendaftaranVerifikasi JSON schema consistent with these assumptions.
 * - Avoid adding transformation or filtering logic here; keep data preparation minimal.
 */
export function usePendaftaranVerifikasiPage() {
  // Hero section derived from static JSON, enriched with breadcrumbs
  const hero: HeroData = {
    ...PendaftaranVerifikasi.hero,
    breadcrumbItems: PendaftaranVerifikasi.breadcrumbItems,
  }

  // Accordion section items extracted from JSON
  const accordionItems = getSectionData<ItemDataJSON[]>(
    PendaftaranVerifikasi as KemahasiswaanDataFile,
    "accordion"
  )

  // Item collection section items extracted from JSON
  const itemCollectionItems = getSectionData<ItemDataJSON[]>(
    PendaftaranVerifikasi as KemahasiswaanDataFile,
    "item-collection"
  )

  return {
    hero,
    accordionItems,
    itemCollectionItems,
  }
}