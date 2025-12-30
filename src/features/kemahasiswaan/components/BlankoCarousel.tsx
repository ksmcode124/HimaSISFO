"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/Card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSpacer,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"
import { CardProps } from "../types"

interface BlankoProps {
  data: CardProps[]
}

export default function BlankoCarousel({
  data,
}: BlankoProps) {
  if (!Array.isArray(data)) return null

  return (
    <Carousel
      opts={{ align: "center" }}
      className="w-full"
    >
      <CarouselContent>
        <CarouselSpacer />

        {data.map((card) => (
          <CarouselItem
            key={card.id}
            className="basis-2/3 sm:basis-1/2 lg:basis-1/3"
          >
            <div className="p-2 h-full">
              <Card className="h-full">
                <CardContent className="
                  flex flex-col
                  aspect-square
                  lg:aspect-3/2
                  justify-center
                  gap-3
                  p-4
                  lg:p-6
                ">
                  <p className="font-semibold text-sm lg:text-md">
                    {card.title}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}

        <CarouselSpacer />
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
