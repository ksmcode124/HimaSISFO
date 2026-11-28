'use client'
import {
  WisudaYudisium,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"
import { useState } from "react"

/**
 * Hook: useWisudaYudisiumPage
 *
 * Purpose:
 * Provides all data slices and modal state management for the
 * Wisuda & Yudisium page.
 *
 * Architectural Boundary:
 * - JSON data is read-only and extracted via `getSectionData`.
 * - UI components consume the data and the modal state; no DOM manipulation here.
 *
 * Invariants:
 * - selectedId represents the active item.
 * - When selectedId is defined, the modal should be visible.
 *
 * Risks / Failure Modes:
 * - Casting `WisudaYudisium as KemahasiswaanDataFile` bypasses TypeScript type safety.
 * - Missing sections in JSON may result in empty arrays.
 *
 * Maintenance Guidelines:
 * - Keep JSON schema consistent with assumptions.
 * - Avoid adding transformation or presentation logic here.
 */
export function useWisudaYudisiumPage() {
  // Hero section derived from JSON and enriched with breadcrumbs
  const hero: HeroData = {
    ...WisudaYudisium.hero,
    breadcrumbItems: WisudaYudisium.breadcrumbItems,
  }

  // Accordion section items extracted from JSON
  const accordionItems = getSectionData<ItemDataJSON[]>(
    WisudaYudisium as KemahasiswaanDataFile,
    "accordion"
  )

  // Item collection section items extracted from JSON (for modals/detail views)
  const itemCollectionItems = getSectionData<ItemDataJSON[]>(
    WisudaYudisium as KemahasiswaanDataFile,
    "item-collection"
  )

  // Local state to control which item is selected for modal
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return {
    hero,
    accordionItems,
    itemCollectionItems,
    selectedId,
    openModal: setSelectedId,            // function to open modal with given ID
    closeModal: () => setSelectedId(null), // function to close modal
  }
}