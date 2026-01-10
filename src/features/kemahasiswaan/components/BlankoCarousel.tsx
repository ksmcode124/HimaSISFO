"use client"
import { useState, useEffect } from "react"
import { Card, CardAction, CardContent } from "@/components/ui/Card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  type CarouselApi,
  CarouselSpacer,
} from "@/components/ui/Carousel"

import { BlankoItem } from "../types"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { Download } from "lucide-react"

interface BlankoCarouselProps {
  blankoItems: BlankoItem[]
}

export default function BlankoCarousel({ blankoItems }: BlankoCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Sinkronisasi index aktif dengan posisi scroll Embla
  // Dipanggil setiap kali user scroll / klik navigation
  useEffect(() => {
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
        opts={{
          align: "center",
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselPrevious className="absolute h-15 w-15 left-0 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 rounded-full" />

        <CarouselContent>
          <CarouselSpacer />

          {blankoItems?.map((card, index) => {
            const diff = index - selectedIndex
            const isActive = diff === 0
            const isNeighbor = Math.abs(diff) === 1

            return (
              <CarouselItem
                key={card.id}
                className={cn(
                  "basis-full h-100 z-20 transition-all duration-300",
                  isActive && "sm:basis-1/3 z-30",
                  isNeighbor && "sm:basis-1/3 z-20",
                  !isActive && !isNeighbor && "sm:basis-1/3 z-10"
                )}
              >
                <div className="h-full px-3 sm:px-1">
                  <Card
                    style={{ backgroundImage: `url(${card.image})` }}
                    className={cn(
                      "h-full flex flex-col bg-cover bg-center bg-no-repeat",
                      "transition-transform duration-300 will-change-transform",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-80"
                    )}
                  >
                    <CardContent className="flex flex-col flex-1 p-4 lg:p-6 justify-end text-center">
                      <p className="font-semibold text-sm lg:text-md">
                        {card.title}
                      </p>
                    </CardContent>

                    <CardAction className="pb-4 w-full grid justify-items-center">
                      <Link
                        href={`${card.filepath}/export?format=docx`}
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
          count={blankoItems.length}
          selectedIndex={selectedIndex}
          onSelect={(index) => api.scrollTo(index)}
        />
      )}
    </div>
  )
}
