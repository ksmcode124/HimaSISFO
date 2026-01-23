"use client"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Glass } from "@/components/ui/Glass"
import { KemahasiswaanCard } from "./KemahasiswaanCard"
import { Triangle } from "lucide-react"

import 'swiper/css'
import 'swiper/css/navigation'
import { CardProps } from "../types/ui"

const MOBILE_BREAKPOINT = 540
const TABLET_BREAKPOINT = 768

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
  const device = useDeviceType()

  return (
    <div className="relative w-full max-w-7xl py-8">
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
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        centeredSlides={device !== 'mobile'}
        slidesPerView={device === 'mobile' ? 1 : 3}
        spaceBetween={device === 'mobile' ? 16 : 24}
        loop={false}
        speed={900}
        grabCursor
        watchSlidesProgress
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 16,
          },
          540: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 24,
          },
        }}
        className="!overflow-visible"
      >
        {data.map((item, index) => {
          const isActive = index === activeIndex
          const diff = Math.abs(index - activeIndex)
          const isNeighbor = diff === 1

          return (
            <SwiperSlide key={item.id} className="!h-auto">
              {({ isActive: swiperActive }) => (
                <div
                  className="w-full aspect-square cursor-pointer py-4"
                  onClick={() => {
                    if (!swiperActive && swiper) {
                      swiper.slideTo(index)
                    }
                  }}
                >
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      scale: device === 'mobile'
                        ? 1
                        : device === 'tablet'
                        ? isActive
                          ? 1
                          : 0.85
                        : isActive
                        ? 1
                        : 0.75,
                      opacity: device === 'mobile'
                        ? 1
                        : isActive
                        ? 1
                        : isNeighbor
                        ? 0.8
                        : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 26,
                      mass: 0.9,
                    }}
                  >
                    <Glass className="w-full h-full flex items-center justify-center">
                      <KemahasiswaanCard
                        data={item}
                        active={isActive}
                        device={device}
                      />
                    </Glass>
                  </motion.div>
                </div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiper?.slidePrev()}
        disabled={activeIndex === 0}
        className={cn(
          "absolute -left-12 top-1/2 translate-x-[50%] lg:translate-x-0 -translate-y-1/2 z-50",
          "h-20 w-20 sm:h-24 sm:w-24 rounded-full",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-opacity"
        )}
      >
        <Glass
          borderRadius={9999}
          className="flex items-center justify-center w-full h-full"
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
        onClick={() => swiper?.slideNext()}
        disabled={activeIndex === data.length - 1}
        className={cn(
          "absolute -right-12 top-1/2 -translate-x-[50%] lg:translate-x-0 -translate-y-1/2 z-50",
          "h-20 w-20 sm:h-24 sm:w-24 rounded-full",
          "disabled:opacity-0 disabled:cursor-not-allowed",
          "transition-opacity"
        )}
      >
        <Glass
          borderRadius={9999}
          className="flex items-center justify-center w-full h-full"
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
              onClick={() => swiper?.slideTo(index)}
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