import {
  Pembayaran,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

/**
 * Hook: usePembayaranPage
 *
 * Purpose:
 * Provides structured data for the Pembayaran page.
 * - hero: configuration for the hero section including breadcrumbs.
 * - featuredItems: first 3 items from the accordion section.
 * - otherItems: remaining items from the accordion section.
 *
 * Architectural Boundary:
 * - Delegates JSON extraction to `getSectionData`.
 * - Purely a data hook: no UI logic or side effects.
 *
 * Invariants:
 * - hero.breadcrumbItems must be defined and array-like.
 * - items corresponds to the "accordion" section in the JSON.
 * - featuredItems always contains at most 3 items; otherItems contains the rest.
 *
 * Risks / Failure Modes:
 * - Casting `Pembayaran as KemahasiswaanDataFile` bypasses TypeScript type safety.
 * - If the "accordion" section is missing or has fewer than 3 items, slicing may produce empty arrays.
 *
 * Maintenance Guidelines:
 * - Keep the Pembayaran JSON schema consistent with these assumptions.
 * - Avoid adding transformation logic outside of slicing; this hook should only prepare structured data for rendering.
 */
export function usePembayaranPage() {
  // Hero section derived from static JSON, enriched with breadcrumbs
  const hero: HeroData = {
    ...Pembayaran.hero,
    breadcrumbItems: Pembayaran.breadcrumbItems,
  }

  // Extract accordion items from JSON
  const items = getSectionData<ItemDataJSON[]>(
    Pembayaran as KemahasiswaanDataFile,
    "accordion"
  )

  return {
    hero,
    featuredItems: items.slice(0, 3), // First 3 items highlighted as featured
    otherItems: items.slice(3),       // Remaining items for secondary display
  }
}