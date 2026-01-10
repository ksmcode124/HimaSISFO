"use client"

import { useState } from "react"
import {
  AccordionItemBlock,
  HorizontalAccordion,
  FeaturedHorizontalAccordion
} from "@/features/kemahasiswaan"

import AccordionVisualImage from "../components/AccordionVisualImage"

interface Props {
  featuredItems: AccordionItemBlock[]
  otherItems: AccordionItemBlock[]
}

export default function PembayaranSection({
  featuredItems,
  otherItems
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-[1fr_3fr] lg:grid-rows-1 justify-items-center items-center">
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
