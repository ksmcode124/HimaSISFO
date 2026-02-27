"use client"

import {
  HeroSection,
  Modal,
  useWisudaYudisiumPage,
  WisudaYudisiumMainSection,
} from "@/features/kemahasiswaan"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLocked"

/**
 * Page: Wisuda & Yudisium
 *
 * Type: Client Component
 *
 * Purpose:
 * Handles interactive behavior (modal state) for the
 * Wisuda & Yudisium page while delegating data/state logic
 * to the feature hook.
 *
 * Architectural Boundary:
 * - All state derivation and mutation logic must live
 *   inside useWisudaYudisiumPage().
 * - This component orchestrates layout and global side effects only.
 *
 * Invariant:
 * - selectedId represents the active item.
 * - When selectedId is defined, modal must be visible.
 *
 * Maintenance Rule:
 * - Avoid introducing transformation or filtering logic here.
 * - Keep global DOM side effects isolated and reversible.
 */
export default function WisudaPage() {
  /**
   * Data + state contract:
   * - hero: hero section configuration
   * - accordionItems: structured collapsible content
   * - itemCollectionItems: grouped supporting content
   * - selectedId: active item identifier
   * - openModal / closeModal: state mutators
   */
  const {
    hero,
    accordionItems,
    itemCollectionItems,
    openModal,
    closeModal,
    selectedId,
  } = useWisudaYudisiumPage()

  /**
   * Side Effect: Body Scroll Lock
   *
   * When modal is open, prevent background scrolling.
   *
   * Important:
   * - Always restore overflow on cleanup to avoid
   *   leaking global DOM state across navigation.
   */
  useBodyScrollLock(!!selectedId);

  return (
    <>
      {/* Contextual hero section */}
      <HeroSection data={hero} />

      {/* Main interactive content section */}
      <WisudaYudisiumMainSection
        setSelectedId={openModal}
        accordionItems={accordionItems}
        itemCollectionItems={itemCollectionItems}
      />

      {/* Modal visibility derived from selectedId invariant */}
      <Modal
        open={!!selectedId}
        onCloseAction={closeModal}
        selectedId={selectedId}
        items={itemCollectionItems}
      />
    </>
  )
}