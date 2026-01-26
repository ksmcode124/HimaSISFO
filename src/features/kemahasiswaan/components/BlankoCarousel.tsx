"use client"
import { useState } from "react"
import { Card, CardAction, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicators,
  type CarouselApi,
  useCarousel,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

import { BlankoItem } from "../types/ui"
import Link from "next/link"
import { cn } from "@/lib/utils/cn"
import { Download } from "lucide-react"
import { useCarouselSync } from "../hooks/useCarouselSync"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface BlankoCarouselProps {
  blankoItems: BlankoItem[]
}

export function BlankoCarousel({ blankoItems }: BlankoCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const selectedIndex = useCarouselSync(api, blankoItems)
  const scrollTo = (index: number) => api?.scrollTo(index)

  return (
    <div className="relative w-full max-w-7xl mx-auto py-8">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", containScroll: "trimSnaps" }}
        className="w-full flex items-center overflow-visible"
      >
        <CarouselPrevious className="z-20 opacity-60" />
        <CarouselContent className="flex-1">
          <CarouselSpacer />

          {blankoItems.map((card, index) => (
            <BlankoCardItem
              key={card.id}
              card={card}
              index={index}
              selectedIndex={selectedIndex}
            />
          ))}

          <CarouselSpacer />
        </CarouselContent>
        <CarouselNext className="z-20 opacity-60" />
      </Carousel>

      {api && (
        <CarouselIndicators
          count={blankoItems.length}
          selectedIndex={selectedIndex}
          onSelect={scrollTo}
        />
      )}
    </div>
  )
}

/** --- Internal Components --- */
function BlankoCardItem({
  card,
  index,
  selectedIndex,
}: {
  card: BlankoItem
  index: number
  selectedIndex: number
}) {
  const isGoogleDocs = card.filepath.startsWith(
    "https://docs.google.com/"
  )

  const diff = index - selectedIndex
  const isActive = diff === 0
  const isNeighbor = Math.abs(diff) === 1

  const scale = isActive ? 1 : isNeighbor ? 0.85 : 0.7
  const opacity = isActive ? 1 : isNeighbor ? 0.9 : 0.6
  const zIndex = isActive ? 30 : isNeighbor ? 20 : 10

  return (
    <CarouselItem className="h-110 basis-full sm:basis-full lg:basis-1/3">
      <motion.div
        layout
        animate={{ scale, opacity, zIndex }}
        transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.8 }}
        className="h-full px-2"
      >
        <Card
          style={{ backgroundImage: `url(${card.image})` }}
          className="relative h-full flex flex-col bg-cover bg-center bg-no-repeat rounded-xl"
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 80%",
            }}
          />
          <CardContent className="flex flex-col flex-1 p-4 z-10 justify-end text-center">
            <motion.p
              key={card.id + "-title"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-semibold text-3xs sm:text-xs md:text-sm lg:text-xl 2xl:text-xl text-white"
            >
              {card.title}
            </motion.p>
          </CardContent>

          <CardAction className="pb-4 w-full grid z-10 justify-items-center">
            <motion.div
              key={card.id + "-action"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="w-full flex items-center justify-center"
            >
              <Button variant={"hima"} asChild>
                <Link
                  href={isGoogleDocs ? `${encodeURIComponent(card.filepath)}/export?format=docx` : "#"}
                  className="flex gap-2 min-w-[70%] items-center text-xs lg:text-sm px-3.5 py-1 sm:px-6 sm:py-1.5 md:px-8.5 md:py-2 lg:px-11 lg:py-4 2xl:px-11 2xl:py-5" 
                  >
                  Unduh <Download size={14} />
                </Link>
              </Button>
            </motion.div>
          </CardAction>
        </Card>
      </motion.div>
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
        "block min-w-0 shrink-0 grow-0 sm:basis-full md:basis-1/3 z-10",
        orientation === "horizontal" ? "pl-0 sm:pl-2 md:pl-4" : "pt-4"
      )}
    />
  )
}
