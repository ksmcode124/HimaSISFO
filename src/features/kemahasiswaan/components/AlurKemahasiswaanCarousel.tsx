"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicators,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

import { CardProps } from "../types/ui"
import { getCarouselItemState } from "../utils/getCarouselItemState"
import { getCarouselItemClass } from "../utils/getCarouselItemClass"
import { KemahasiswaanCard } from "./KemahasiswaanCard"
import { KemahasiswaanCarouselSpacer } from "./KemahasiswaanCarouselSpacer"
import { useCarouselSync } from "../hooks/useCarouselSync"
import { useEffect, useState } from "react"
import { LiquidGlass } from "@liquidglass/react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Glass } from "@/components/ui/Glass"

const MOBILE_BREAKPOINT = 768
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

interface Props {
  data: CardProps[]
}

export function AlurKemahasiswaanCarousel({ data }: Props) {
  const isMobile = useIsMobile()
  const [api, setApi] = useState<CarouselApi | null>(null)
  const selectedIndex = useCarouselSync(api, data)
  const scrollTo = (index: number) => api?.scrollTo(index)

  return (
    <div className="relative w-full max-w-7xl">
      <Carousel className="py-8" setApi={setApi} opts={{ align: isMobile ? "start" : "center" }}>
        <CarouselPrevious className="z-20 opacity-60" />

        <CarouselContent className="touch-pan-x flex-1">
          {!isMobile && <KemahasiswaanCarouselSpacer />}

          {data.map((item, index) => {
            const state = getCarouselItemState(index, selectedIndex)

            return (
             <CarouselItem
                key={item.id}
                className={cn(
                  getCarouselItemClass(state),
                  isMobile && "basis-full shrink-0"
                )}
              >
                <div
                  className="h-full cursor-pointer"
                  onClick={() => {
                    if (!state.isActive) scrollTo(index)
                  }}
                >
                  <motion.div
                    className="h-full"
                    animate={{
                      scale: isMobile ? 1 : state.isActive ? 1 : 0.75,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 26,
                      mass: 0.9,
                    }}
                  >
                    {isMobile ? (
                      <div className="h-full rounded-xl border bg-white/5">
                        <KemahasiswaanCard
                          data={item}
                          active={state.isActive}
                        />
                      </div>
                    ) : (
                      <Glass
                        className="flex items-center justify-center"
                      >
                        <KemahasiswaanCard
                          data={item}
                          active={state.isActive}
                        />
                      </Glass>
                    )}
                  </motion.div>
                </div>
              </CarouselItem>
            )
          })}

          {!isMobile && <KemahasiswaanCarouselSpacer />}
        </CarouselContent>

        <CarouselNext className="z-20 opacity-60"/>
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
