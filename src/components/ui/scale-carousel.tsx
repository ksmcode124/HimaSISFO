'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'

const TWEEN_FACTOR = 0.52

const clamp = (v: number, min = 0.75, max = 1) => Math.min(Math.max(v, min), max)

type ScaleCarouselProps = {
  children: React.ReactNode[]
  className?: string
}

export function ScaleCarousel({ children, className }: ScaleCarouselProps) {
  const emblaApiRef = React.useRef<EmblaCarouselType | undefined | null>(null)
  const itemsRef = React.useRef<HTMLElement[]>([])

  const onInitApi = (api: CarouselApi | undefined) => {
    if (!api) {
      emblaApiRef.current = null
      itemsRef.current = []
      return
    }

    emblaApiRef.current = api
    itemsRef.current = api
      .slideNodes()
      .map((node) => node.querySelector('[data-scale]') as HTMLElement)
    applyScale(api)
    api.on('scroll', applyScale)
    api.on('reInit', applyScale)
  }

  const applyScale = (embla: EmblaCarouselType, event?: EmblaEventType) => {
    const progress = embla.scrollProgress()
    embla.scrollSnapList().forEach((snap, idx) => {
      let diff = snap - progress
      const scale = clamp(1 - Math.abs(diff * TWEEN_FACTOR))
      const el = itemsRef.current[idx]
      if (el) el.style.transform = `scale(${scale})`
    })
  }

  return (
    <Carousel
      className={className}
      opts={{ loop: true, align: 'start' }}
      setApi={onInitApi}
    >
      <CarouselContent>
        {children.map((child, i) => (
          <CarouselItem key={i} className='basis-1/3'>
            <div data-scale className="transition-transform duration-50">
              {child}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
