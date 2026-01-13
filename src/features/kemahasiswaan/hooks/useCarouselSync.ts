"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { CarouselApi } from "@/components/ui/Carousel"

export function useCarouselSync(
  api: CarouselApi | null,
  items: { id: string }[],
) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    const itemId = searchParams.get("item")
    if (!itemId) return

    const index = items.findIndex((i) => i.id === itemId)
    if (index === -1) return

    api.scrollTo(index, true)
    setSelectedIndex(index)
  }, [api, searchParams, items])

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

  return selectedIndex
}
