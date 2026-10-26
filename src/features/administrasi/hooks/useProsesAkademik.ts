'use client'
import { useState } from "react"
import {
  ProsesAkademik,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

/**
 * Hook: useProsesAkademikPage
 *
 * Purpose:
 * Provides structured data and modal state management for the
 * Proses Akademik page.
 * - hero: configuration for the hero section including breadcrumbs.
 * - items: main content items for the page.
 * - selectedId: ID of the currently active item (for modal display).
 * - openModal / closeModal: functions to control modal visibility.
 *
 * Architectural Boundary:
 * - Data is extracted from static JSON via `getSectionData`.
 * - Modal state is local to this hook; UI components should consume it.
 *
 * Invariants:
 * - selectedId represents the active item in the modal.
 * - When selectedId is non-null, a modal should be visible.
 *
 * Risks / Failure Modes:
 * - Casting `ProsesAkademik as KemahasiswaanDataFile` bypasses TypeScript safety.
 * - If JSON is missing the "item-collection" section, items may be empty.
 *
 * Maintenance Guidelines:
 * - Keep JSON schema consistent with these expectations.
 * - Avoid adding transformation logic; let UI components handle presentation.
 */
export function useProsesAkademikPage() {
  // Hero section derived from static JSON and enriched with breadcrumbs
  const hero: HeroData = {
    ...ProsesAkademik.hero,
    breadcrumbItems: ProsesAkademik.breadcrumbItems,
  }

  // Main page items extracted from JSON "item-collection" section
  const items = getSectionData<ItemDataJSON[]>(
    ProsesAkademik as KemahasiswaanDataFile,
    "item-collection"
  )

  // Local state for controlling which item is selected in the modal
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return {
    hero,
    items,
    selectedId,
    openModal: setSelectedId,            // function to open modal with given ID
    closeModal: () => setSelectedId(null), // function to close modal
  }
}