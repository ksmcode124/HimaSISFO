"use client"

import { useState } from "react"
import {
  ItemDataJSON,
  HorizontalAccordion,
  FeaturedHorizontalAccordion
} from "@/features/kemahasiswaan"

import AccordionVisualImage from "../components/AccordionVisualImage"

interface Props {
  featuredItems: ItemDataJSON[]
  otherItems: ItemDataJSON[]
}

export default function PembayaranSection({
  featuredItems,
  otherItems
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
        <AccordionVisualImage
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
