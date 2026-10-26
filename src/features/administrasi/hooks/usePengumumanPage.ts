import {
  Pengumuman,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

/**
 * Hook: usePengumumanPage
 *
 * Purpose:
 * Provides all data needed to render the Pengumuman (Announcements) page.
 * - hero: hero section configuration with breadcrumbs.
 * - informasiItems: structured content for the main announcement section (accordion style).
 *
 * Architectural Boundary:
 * - Purely a data hook; no UI logic or side effects.
 * - Relies on `getSectionData` to extract sections from static JSON.
 *
 * Invariants:
 * - hero.breadcrumbItems must be defined and array-like.
 * - informasiItems corresponds to the "accordion" section in JSON.
 *
 * Risks / Failure Modes:
 * - Casting `Pengumuman as KemahasiswaanDataFile` bypasses TypeScript safety.
 * - If JSON is missing the "accordion" section or items, informasiItems may be empty.
 *
 * Maintenance Guidelines:
 * - Keep Pengumuman JSON schema aligned with these expectations.
 * - Avoid transformation or filtering logic here; let UI components handle rendering variations.
 */
export function usePengumumanPage() {
  // Hero section derived from static JSON and enriched with breadcrumbs
  const hero: HeroData = {
    ...Pengumuman.hero,
    breadcrumbItems: Pengumuman.breadcrumbItems,
  }

  // Accordion items extracted from JSON for announcements
  const informasiItems = getSectionData<ItemDataJSON[]>(
    Pengumuman as KemahasiswaanDataFile,
    "accordion"
  )

  return {
    hero,
    informasiItems
  }
}