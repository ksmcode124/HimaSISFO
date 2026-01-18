"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  CarouselApi,
} from "@/components/ui/carousel"

import { CardProps } from "../types/ui"
import { getCarouselItemState } from "../utils/getCarouselItemState"
import { getCarouselItemClass } from "../utils/getCarouselItemClass"
import { KemahasiswaanCard } from "./KemahasiswaanCard"
import { KemahasiswaanCarouselSpacer } from "./KemahasiswaanCarouselSpacer"
import { useCarouselSync } from "../hooks/useCarouselSync"
import { useState } from "react"

interface Props {
  data: CardProps[]
}

export function AlurKemahasiswaanCarousel({ data }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const selectedIndex = useCarouselSync(api, data)
  const scrollTo = (index: number) => api?.scrollTo(index, false)

  return (
    <div className="relative w-full max-w-7xl">
      <Carousel setApi={setApi} opts={{ align: "center" }}>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />

        <CarouselContent>
          <KemahasiswaanCarouselSpacer />

          {data.map((item, index) => {
            const state = getCarouselItemState(index, selectedIndex)

            return (
              <CarouselItem
                key={item.id}
                onClick={() => scrollTo(index)}
                className={getCarouselItemClass(state)}
              >
                <KemahasiswaanCard data={item} active={state.isActive} />
              </CarouselItem>
            )
          })}

          <KemahasiswaanCarouselSpacer />
        </CarouselContent>

        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>

      {api && (
        <CarouselIndicators
          count={data.length}
          selectedIndex={selectedIndex}
          onSelect={scrollTo}
        />
      )}
    </div>
  )
}