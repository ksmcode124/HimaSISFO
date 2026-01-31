"use client"
import { useState } from "react"
import { Card, CardAction, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  type CarouselApi,
  useCarousel,
} from "@/components/ui/carousel"

import { BlankoItem } from "../types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"
import { useCarouselSync } from "../hooks/useCarouselSync"

interface BlankoCarouselProps {
  blankoItems: BlankoItem[]
}

export default function BlankoCarousel({ blankoItems }: BlankoCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const selectedIndex = useCarouselSync(api, blankoItems)

  // function untuk menentukan styling carousel item berdasarkan posisi
  const getItemStyle = (index: number) => {
    const diff = index - selectedIndex
    const isActive = diff === 0
    const isNeighbor = Math.abs(diff) === 1

    return cn(
      "basis-full h-100 z-20 transition-all duration-300",
      isActive && "sm:basis-1/3 z-30",
      isNeighbor && "scale-[0.8] sm:basis-1/3 z-20",
      !isActive && !isNeighbor && "scale-[0.6] sm:basis-1/3 z-10"
    )
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", containScroll: "trimSnaps" }}
        className="w-full"
      >
        {/* Navigation arrows */}
        <CarouselPrevious className="absolute h-15 w-15 left-0 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 rounded-full" />
        <CarouselNext className="absolute h-15 w-15 right-0 sm:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 rounded-full" />

        <CarouselContent>
          <CarouselSpacer />

          {blankoItems.map((card, index) => (
            <BlankoCardItem key={card.id} card={card} className={getItemStyle(index)} />
          ))}

          <CarouselSpacer />
        </CarouselContent>
      </Carousel>

      {/* Indicators */}
      {api && (
        <CarouselIndicators
          count={blankoItems.length}
          selectedIndex={selectedIndex}
          onSelect={(index) => api.scrollTo(index)}
        />
      )}
    </div>
  )
}

/** --- Internal Components --- */
function BlankoCardItem({ card, className }: { card: BlankoItem; className: string }) {
  return (
    <CarouselItem className={className}>
      <div className="h-full px-3 sm:px-1">
        <Card
          style={{ backgroundImage: `url(${card.image})` }}
          className="h-full flex flex-col bg-cover bg-center bg-no-repeat transition-transform duration-300 will-change-transform"
        >
          <CardContent className="flex flex-col flex-1 p-4 lg:p-6 justify-end text-center">
            <p className="font-semibold text-sm lg:text-md">{card.title}</p>
          </CardContent>

          <CardAction className="pb-4 w-full grid justify-items-center">
            <Link
              href={`${card.filepath}/export?format=docx`}
              className="text-xs flex gap-2 items-center rounded-full border px-4 py-2 bg-linear-to-t from-[#456882] to-[#1B3C53] text-white"
            >
              Unduh <Download size={14} />
            </Link>
          </CardAction>
        </Card>
      </div>
    </CarouselItem>
  )
}

function CarouselSpacer() {
  const { orientation } = useCarousel()

  return (
    <div
      aria-hidden
      data-embla-ignore
      className={cn(
        "block min-w-0 shrink-0 grow-0 sm:basis-1/3 z-10",
        orientation === "horizontal" ? "pl-0 sm:pl-4" : "pt-4",
      )}
    />
  )
}