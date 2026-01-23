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
import { cn } from "@/lib/utils"
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
        className="w-full flex items-center"
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
    <CarouselItem className="h-100 basis-full sm:basis-full md:basis-1/3">
      <motion.div
        layout
        animate={{ scale, opacity, zIndex }}
        transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.8 }}
        className="h-full px-2"
      >
        <Card
          style={{ backgroundImage: `url(${card.image})` }}
          className="h-full flex flex-col bg-cover bg-center bg-no-repeat rounded-xl"
        >
          <CardContent className="flex flex-col flex-1 p-4 justify-end text-center">
            <motion.p
              key={card.id + "-title"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-semibold text-sm lg:text-md text-white"
            >
              {card.title}
            </motion.p>
          </CardContent>

          <CardAction className="pb-4 w-full grid justify-items-center">
            <motion.div
              key={card.id + "-action"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <Button variant={"hima"} asChild>
                <Link
                  href={isGoogleDocs ? `${encodeURIComponent(card.filepath)}/export?format=docx` : "#"}
                  className="flex gap-2 items-center"
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
