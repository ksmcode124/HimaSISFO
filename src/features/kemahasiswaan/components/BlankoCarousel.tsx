"use client"

import * as React from "react"
import { Card, CardAction, CardContent } from "@/components/ui/Card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSpacer,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  CarouselApi,
} from "@/components/ui/Carousel"
import { BlankoProps } from "../types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"

interface BlankoCarouselProps {
  data: BlankoProps[]
}

export default function BlankoCarousel({
  data,
}: BlankoCarouselProps) {
  // Embla Carousel API yang digunakan untuk sinkronisasi state carousel & indicator
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // Sinkronisasi index aktif dengan posisi scroll Embla
  // Dipanggil setiap kali user scroll / klik navigation
  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])
  return (
    <div className="relative w-full">
    <Carousel
      setApi={setApi}
      opts={{ align: "center" }}
      className="w-full [--carousel-item-basis:100%] sm:[--carousel-item-basis:33.333%]"
    >
      <CarouselPrevious className="absolute h-15 w-15 left-0 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 rounded-full" />
        <CarouselContent>
          <CarouselSpacer />
            {data.map((card, index) => {
              const diff = index - selectedIndex
              const isActive = diff === 0
              const isNeighbor = Math.abs(diff) === 1
              const isVisible = isActive || isNeighbor

              return (
                <CarouselItem
                  key={card.id}
                  className={cn(
                    "transition-all duration-300 h-100 z-20",
                    "motion-reduce:transition-none motion-reduce:transform-none",
                    "basis-(--carousel-item-basis)",
                    isActive && "basis-full sm:basis-1/4 z-30",
                    isNeighbor && "basis-full sm:basis-1/4 z-20"
                  )}
                >
                  <div
                    className={cn(
                      "h-full px-2 sm:px-1 transition-all duration-300",
                      !isVisible && "opacity-0 pointer-events-none"
                    )}
                  >
                    <Card
                      style={{ backgroundImage: `url(${card.image})` }}
                      className={cn(
                        "h-full flex flex-col transition-transform duration-300",
                        "bg-cover bg-center bg-no-repeat",
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-90 opacity-80 text-center"
                      )}
                    >
                      <CardContent className="flex flex-col flex-1 p-4 lg:p-6 justify-end text-center">
                        <p className="font-semibold text-sm lg:text-md">
                          {card.title}
                        </p>
                      </CardContent>

                      <CardAction className="pb-4 w-full grid justify-items-center">
                        <Link
                          href={`${card.filepath}/export`}
                          className="text-xs flex gap-2 items-center rounded-full border px-4 py-2 bg-tb-gradient-primary text-white"
                        >
                          Unduh <Download size={14} />
                        </Link>
                      </CardAction>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          <CarouselSpacer />
        </CarouselContent>
        <CarouselNext className="absolute h-15 w-15 right-0 sm:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 rounded-full" />
      </Carousel>
      {api && (
        <CarouselIndicators
          count={data.length}
          selectedIndex={selectedIndex}
          onSelect={(index) => api.scrollTo(index)}
        />
      )}
    </div>
  )
}
