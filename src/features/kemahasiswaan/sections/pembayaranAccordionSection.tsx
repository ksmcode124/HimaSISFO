"use client"

import { useState } from "react"
import { ItemDataJSON } from "@/features/kemahasiswaan"
import { HorizontalAccordion, FeaturedHorizontalAccordion } from "../components/HorizontalAccordion"
import { AccordionVisualCarousel } from "../components/AccordionVisualCarousel"

interface Props {
  featuredItems: ItemDataJSON[]
  otherItems: ItemDataJSON[]
}

export function PembayaranAccordionSection({
  featuredItems,
  otherItems
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <>
      <div className="grid lg:grid-cols-[3fr_9fr] grid-rows-[200px_auto] gap-x-5 lg:grid-rows-1 justify-items-center items-center mb-4">
        <AccordionVisualCarousel
          items={featuredItems}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <FeaturedHorizontalAccordion
          items={featuredItems}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
      </div>

      <HorizontalAccordion items={otherItems} />
    </>
  )
}
