"use client"

import { HeroSection, Modal } from "@/features/kemahasiswaan"
import { useProsesAkademikPage } from "@/features/kemahasiswaan/hooks/useProsesAkademik"
import { ProsesAkademikMainSection } from "@/features/kemahasiswaan/sections/ProsesAkademikMainSection"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLocked"

/**
 * Page: Proses Akademik
 *
 * Type: Client Component
 *
 * Purpose:
 * Handles interactive state (modal open/close) for the
 * Proses Akademik page.
 *
 * Architectural Boundary:
 * - All state management lives inside useProsesAkademikPage.
 * - This component orchestrates UI + side effects only.
 *
 * Invariant:
 * - selectedId represents the currently active item.
 * - When selectedId is defined, modal must be visible.
 *
 * Maintenance Rule:
 * - Do not introduce data transformation logic here.
 * - Keep global side effects (e.g., body scroll lock)
 *   isolated and predictable.
 */
export default function ProsesAkademikPage() {
  /**
   * Data + state contract:
   * - hero: hero section configuration
   * - items: collection of akademik entries
   * - selectedId: active item identifier
   * - openModal / closeModal: state mutators
   */
  const {
    hero,
    items,
    selectedId,
    openModal,
    closeModal,
  } = useProsesAkademikPage()

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
      {/* Static hero section */}
      <HeroSection data={hero} />

      {/* Main interactive section */}
      <ProsesAkademikMainSection
        selectedId={selectedId}
        items={items}
        openModal={openModal}
      />

      {/* Modal visibility derived from selectedId invariant */}
      <Modal
        open={!!selectedId}
        onCloseAction={closeModal}
        selectedId={selectedId}
        items={items}
      />
    </>
  )
}