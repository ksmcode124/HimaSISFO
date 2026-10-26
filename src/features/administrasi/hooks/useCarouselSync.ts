"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { CarouselApi } from "@/components/ui/carousel"

/**
 * Hook: useCarouselSync
 *
 * Purpose:
 * Synchronizes a carousel component with URL query parameters.
 * - Scrolls the carousel to the item indicated by `?item=<id>` on load.
 * - Updates URL query whenever the carousel selection changes.
 *
 * Architectural Boundary:
 * - Carousel behavior is controlled exclusively through the CarouselApi.
 * - URL sync is read-only on mount and updated on selection events.
 * - Does not mutate external state outside the carousel and URL.
 *
 * Invariants:
 * - `api` must be a valid CarouselApi instance before scrolling.
 * - `items` array must maintain stable order; index corresponds to item.id.
 * - `?item` query parameter matches an item.id in the items array.
 *
 * Runtime Behavior:
 * - Returns the current `selectedIndex` of the carousel.
 * - Silent no-op if `api` is null, item not found, or items array is empty.
 *
 * Risks / Failure Modes:
 * - If `items` array order changes dynamically, URL sync may select the wrong item.
 * - Missing or invalid `item` query param will leave carousel at default index 0.
 * - Multiple carousel instances sharing the same query parameter could conflict.
 *
 * Maintenance Guidelines:
 * - Keep the `items` array stable to preserve index-based mapping.
 * - Ensure that CarouselApi consistently triggers 'select' events.
 * - Avoid introducing side-effects outside carousel and URL manipulation.
 */
export function useCarouselSync(
  api: CarouselApi | null,
  items: { id: string }[],
) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedIndex, setSelectedIndex] = useState(0)

  /**
   * Effect: Initialize carousel position based on URL query.
   * - Runs on mount and whenever api, searchParams, or items change.
   */
  useEffect(() => {
    if (!api) return

    const itemId = searchParams.get("item")
    if (!itemId) return

    const index = items.findIndex((i) => i.id === itemId)
    if (index === -1) return

    api.scrollTo(index, true)
    setSelectedIndex(index)
  }, [api, searchParams, items])

  /**
   * Effect: Update selectedIndex and URL when carousel selection changes.
   * - Registers 'select' event listener on the carousel API.
   * - Cleans up listener on unmount or dependency change.
   */
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const index = api.selectedScrollSnap()
      const id = items[index]?.id
      if (!id) return

      setSelectedIndex(index)

      router.replace(`?item=${id}`, { scroll: false })
    }

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, items, router])

  // Returns current carousel index for UI binding
  return selectedIndex
}