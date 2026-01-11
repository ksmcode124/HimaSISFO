"use client"

import * as React from "react"
import { Card, CardAction, CardContent } from "@/components/ui/Card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  CarouselIndicators,
  KemahasiswaanCarouselSpacer,
} from "@/components/ui/Carousel"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CardProps } from "../types"

interface AlurKemahasiswaanCarouselProps {
  data: CardProps[]
}

export default function AlurKemahasiswaanCarousel({
  data,
}: AlurKemahasiswaanCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on("select", onSelect)
    return () => { api.off("select", onSelect) }
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
          <KemahasiswaanCarouselSpacer />

          {data.map((card, index) => {
            const diff = index - selectedIndex
            const isActive = diff === 0
            const isNeighbor = Math.abs(diff) === 1

            return (
              <CarouselItem
                key={card.id}
                onClick={() => api?.scrollTo(index, false)}
                className={cn(
                  "h-90 z-20 ease-in",
                  isActive && "transition-[flex,margin] basis-full sm:basis-1/2 z-30 duration-900",
                  isNeighbor && "transition-[flex,margin] basis-full sm:basis-1/3 sm:-mx-30 z-20 duration-500",
                  !isActive && !isNeighbor && "transition-[flex,margin] basis-full sm:basis-1/3 sm:mx-30 z-10 duration-700"
                )}
              >
                <div className="h-full px-2 sm:px-0">
                  <Card
                    className={cn(
                      "h-full flex flex-col will-change-transform",
                      "transition-[transform,opacity] duration-2000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-90 sm:scale-65 opacity-70 bg-lr-gradient-primary text-white text-center"
                    )}
                  >
                    <CardContent
                      className={cn(
                        "flex flex-col flex-1 gap-2 sm:gap-3 p-4 lg:p-6",
                        "transition-all duration-800 ease-out delay-700",
                        isActive ? "justify-start" : "justify-center"
                      )}
                    >
                      {/* TITLE */}
                      <p
                        className={cn(
                          "font-semibold transtition-colors duration-0",
                          isActive
                            ? "text-base sm:text-sm lg:text-md delay-0"
                            : "mx-15 text-sm sm:text-lg lg:text-xl delay-250"
                        )}
                      >
                        {card.title}
                      </p>

                      {/* DESCRIPTION */}
                      <p
                        className={cn(
                          "text-xs sm:text-[10px] lg:text-md text-justify",
                          "transition-[opacity,transform,max-height] duration-0 ease-in",
                          isActive
                            ? "opacity-100 translate-y-0 max-h-96 delay-1000"
                            : "opacity-0 translate-y-2 max-h-0 overflow-hidden delay-0"
                        )}
                      >
                        {card.description}
                      </p>
                    </CardContent>

                    {/* ACTION */}
                    <CardAction
                      className={cn(
                        "pb-4 w-full grid justify-items-center text-center",
                        "transition-[opacity,transform,max-height] duration-200 ease-in",
                        isActive
                          ? "opacity-100 translate-y-0 max-h-20 delay-1000"
                          : "opacity-0 translate-y-2 max-h-0 overflow-hidden pointer-events-none delay-0"
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

          <KemahasiswaanCarouselSpacer />
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
