"use client"
import { useState, useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"
import { Glass } from "@/components/ui/Glass"
import { KemahasiswaanCard } from "./KemahasiswaanCard"
import { Triangle } from "lucide-react"

import 'swiper/css'
import 'swiper/css/navigation'
import { CardProps } from "../types/ui"
import { useRouter, useSearchParams } from "next/navigation"


const MOBILE_BREAKPOINT = 541
const TABLET_BREAKPOINT = 1025

export function useDeviceType() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  

  useEffect(() => {
    const updateDevice = () => {
      const w = window.innerWidth
      if (w < MOBILE_BREAKPOINT) setDevice('mobile')
      else if (w < TABLET_BREAKPOINT) setDevice('tablet')
      else setDevice('desktop')
    }
    window.addEventListener('resize', updateDevice)
    updateDevice()
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  return device
}

interface Props {
  data: CardProps[]
}

export function AlurKemahasiswaanCarousel({ data }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const device = useDeviceType()

  const idToIndexRef = useRef<Map<string, number>>(new Map())
  const hasHydratedRef = useRef(false)

  // build index map once
  useEffect(() => {
    const map = new Map<string, number>()
    data.forEach((d, i) => map.set(String(d.id), i))
    idToIndexRef.current = map
  }, [data])

  /**
   * URL → state (browser back/forward ONLY)
   */
  useEffect(() => {
    if (!swiper || hasHydratedRef.current) return

    const itemId = searchParams.get("item")
    if (!itemId) return

    const index = idToIndexRef.current.get(itemId)
    if (index === undefined) return

    hasHydratedRef.current = true
    setActiveIndex(index)
  }, [swiper, searchParams])


  /**
   * state → Swiper (visual sync ONLY)
   */
  useEffect(() => {
    if (!swiper) return
    swiper.slideToLoop(activeIndex, 400)
  }, [activeIndex, swiper])

  /**
   * state → URL (idempotent)
   */
  useEffect(() => {
    const item = data[activeIndex]
    if (!item) return

    const current = searchParams.get("item")
    if (current === String(item.id)) return

    router.replace(
      `/kemahasiswaan?item=${encodeURIComponent(item.id)}`,
      { scroll: false }
    )
  }, [activeIndex, data, router, searchParams])

  
  return (
    <div className="relative w-full lg:max-w-3xl 2xl:max-w-7xl py-8 min-h-75 h-full">
      <style jsx global>{`
        .swiper {
          overflow: visible !important;
        }
        .swiper-wrapper {
          align-items: center;
        }
        .swiper-slide {
          transition: opacity 0.5s ease;
        }
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
          pointer-events: none;
        }
      `}</style>

      <Swiper
        modules={[Navigation]}
        onSwiper={setSwiper}
        loop
        centeredSlides
        speed={800}
        grabCursor
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: { // sm
            slidesPerView: 1.5,
            spaceBetween: 24,
          },
          768: { // md
            slidesPerView: 1.75,
            spaceBetween: 32,
          },
          1024: { // lg (1024x768)
            slidesPerView: 1.75,
            spaceBetween: -60,
          },
          1280: { // xl
            slidesPerView: 2.5,
            spaceBetween: -80,
          },
        }}
        className="!overflow-visible w-[90%] sm:w-[65%] lg:w-full h-[299px] xl:h-[299px]"
      >
        {data.map((item, index) => {
          const isActive = index === activeIndex
          const diff = Math.abs(index - activeIndex)
          const isNeighbor = diff === 1

          return (
            <SwiperSlide
              key={item.id}
              className={cn(
                "flex justify-center transition-all",
                "w-[300px] h-[300px]",
                "xl:w-[450px] xl:h-[300px]",
                isActive ? "z-30" : "z-10"
              )}
            >
              {({ isActive: swiperActive }) => (
                <motion.div
                  className="w-full h-full cursor-pointer"
                  onClick={() => {
                    if (!swiperActive && swiper) setActiveIndex(index)
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : isNeighbor ? 0.85 : 0,
                    zIndex: isActive ? 30 : 20,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9 }}
                >
                  {isActive ? (
                    <Glass className={cn("w-full h-full flex items-center justify-center rounded-3xl")}>
                      <KemahasiswaanCard data={item} active={isActive} device={device} />
                    </Glass>
                  ): (
                    <KemahasiswaanCard data={item} active={isActive} device={device} />
                  )}
                </motion.div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>


      {/* Custom Navigation Buttons */}
      <button
         onClick={() => {
          setActiveIndex(i => Math.max(i - 1, 0))
        }}
        disabled={activeIndex === 0}
        className={cn(
          "absolute -left-12 top-1/2 translate-x-[50%] lg:-translate-x-full -translate-y-full z-50",
          "h-20 w-20 sm:h-24 sm:w-24 rounded-full",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-opacity"
        )}
      >
        <Glass
          className="flex items-center justify-center w-full h-full rounded-full"
        >
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="triangleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="50%" stopColor="#456882" />
                <stop offset="100%" stopColor="#1B3C53" />
              </linearGradient>
            </defs>
          </svg>
          <Triangle className="-rotate-90 size-12" fill="url(#triangleGradient2)" strokeWidth={0} />
        </Glass>
        <span className="sr-only">Previous slide</span>
      </button>

      <button
         onClick={() => {
          setActiveIndex(i => Math.min(i + 1, data.length - 1))
        }}
        disabled={activeIndex === data.length - 1}
        className={cn(
          "absolute -right-12 top-1/2 -translate-x-[50%] lg:translate-x-full -translate-y-full z-50",
          "h-20 w-20 sm:h-24 sm:w-24 rounded-full",
          "disabled:opacity-300 disabled:cursor-not-allowed",
          "transition-opacity"
        )}
      >
        <Glass
          className="flex items-center justify-center w-full h-full rounded-full"
        >
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="50%" stopColor="#456882" />
                <stop offset="100%" stopColor="#1B3C53" />
              </linearGradient>
            </defs>
          </svg>
          <Triangle className="rotate-90 size-12" fill="url(#triangleGradient)" strokeWidth={0}/>
        </Glass>
        <span className="sr-only">Next slide</span>
      </button>

      {/* Custom Indicators */}
      <div className="mt-8 flex justify-center items-center gap-2">
        {Array.from({ length: data.length }).map((_, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                "focus:outline-none",
                isActive
                  ? "bg-gradient-to-r from-[#456882] via-[#1F445F] to-[#1B3C53] h-4 w-4"
                  : "bg-neutral-300 hover:bg-[#456882] h-3 w-3"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

// Utility functions (keep for compatibility)
interface Params {
  isActive: boolean
  isNeighbor: boolean
}

export function getCarouselItemClass({ isActive, isNeighbor }: Params) {
  return cn(
    "h-90 ease-in transition-all",
    isActive && "z-30",
    isNeighbor && "z-20",
    !isActive && !isNeighbor && "z-10"
  )
}

export function getCarouselItemState(
  index: number,
  selectedIndex: number
) {
  const diff = index - selectedIndex

  return {
    isActive: diff === 0,
    isNeighbor: Math.abs(diff) === 1,
  }
}