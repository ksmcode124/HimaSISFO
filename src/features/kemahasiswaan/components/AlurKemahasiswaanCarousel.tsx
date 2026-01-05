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
  type CarouselApi,
} from "@/components/ui/Carousel"
import LiquidGlass from 'liquid-glass-react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CardProps } from "../types"
import { GlassMorph } from "@/components/ui/GlassMorph"

interface AlurKemahasiswaanCarouselProps {
  data: CardProps[]
}

export default function AlurKemahasiswaanCarousel({
  data,
}: AlurKemahasiswaanCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

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
        className="w-full"
      >
        <CarouselPrevious className="absolute h-15 w-15 left-0 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 rounded-full" />
        <CarouselContent>
          <CarouselSpacer />

          {data.map((card, index) => {
            const isActive = index === selectedIndex

            return (
              <CarouselItem
                key={card.id}
                className={cn(
                  "transition-all duration-300 h-90 z-20",
                  "motion-reduce:transition-none motion-reduce:transform-none",
                  isActive
                    ? "basis-full sm:basis-1/2"
                    : "basis-full sm:basis-1/3 sm:-mx-10 z-10"
                )}
              >
                <div className="h-full px-2 sm:px-0">
                  <Card className={cn(
                    "h-full flex flex-col transition-transform duration-300",
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-90 sm:scale-65 opacity-70 sm:opacity-90 bg-lr-gradient-primary text-white text-center"
                  )}>
                    <CardContent
                      className={cn(
                        "flex flex-col flex-1 gap-2 sm:gap-3 p-4 lg:p-6 transition-all duration-500",
                        isActive ? "justify-start" : "justify-center"
                      )}
                    >
                      <p className={cn(
                        "font-semibold transition-all duration-300",
                        isActive 
                          ? "text-base sm:text-sm lg:text-md" 
                          : "text-sm sm:text-lg lg:text-xl"
                        )}>
                        {card.title}
                      </p>

                      <p
                        className={cn(
                          "text-xs sm:text-[10px] lg:text-md text-justify transition-all duration-300",
                          isActive 
                            ? "opacity-100 max-h-96" 
                            : "opacity-0 max-h-0 overflow-hidden"
                        )}
                      >
                        {card.description}
                      </p>
                    </CardContent>

                    <CardAction
                      className={cn(
                        "pb-4 w-full grid justify-items-center text-center transition-all duration-300",
                        isActive 
                          ? "opacity-100 max-h-20" 
                          : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
                      )}
                    >
                      <Link
                        href={`kemahasiswaan/${card.id}`}
                        className="text-xs rounded-full border px-4 py-2 bg-tb-gradient-primary text-white"
                      >
                        Selengkapnya ➔
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
    </div>
  )
}