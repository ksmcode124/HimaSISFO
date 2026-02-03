'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  StackedCarousel,
  ResponsiveContainer,
  StackedCarouselSlideProps,
} from 'react-stacked-center-carousel'

/* ======================
 * SLIDE COMPONENT
 * ====================== */
const Slide = React.memo(function Slide(
  props: StackedCarouselSlideProps & {
    data: { title: string; color: string }[]
  }
) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props
  const item = data[dataIndex]
  const rotateY = isCenterSlide
    ? 0
    : slideIndex < 0
      ? 18    // kiri
      : -18   // kanan
  return (
    <div
      draggable={false}
      className={`
        aspect-square w-[320px] mx-auto rounded-2xl flex items-center justify-center
        text-4xl font-bold text-white
        transition-all duration-300
        ${isCenterSlide ? 'scale-100' : 'scale-90 cursor-pointer'}
      `}
      style={{
        backgroundColor: item.color,
        transform: `
          perspective(1200px)
          rotateY(${rotateY}deg)
          scale(${isCenterSlide ? 1 : 0.9})
        `,
      }}
      onClick={() => !isCenterSlide && swipeTo(slideIndex)}
    >
      {item.title}
    </div>
  )
})

/* ======================
 * MAIN CAROUSEL
 * ====================== */
export default function SpotifyCarousel() {
  const ref = useRef<any>(null)
  const { w, h } = useResponsiveCarousel()

  const data = [
    { title: 'One', color: '#6366f1' },
    { title: 'Two', color: '#22c55e' },
    { title: 'Three', color: '#f97316' },
    { title: 'Four', color: '#ec4899' },
    { title: 'Five', color: '#06b6d4' },
    { title: 'Five', color: '#06b6d4' },
    { title: 'Five', color: '#06b6d4' },
  ]

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-7xl">
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => (
            <>
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={w}
                height={h}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                customScales={[1, 0.85, 0.7, 0.7]}
                transitionTime={400}
              />
            </>
          )}
        />
      </div>
    </div>
  )
}

function useResponsiveCarousel() {
  const [size, setSize] = useState({ w: 96, h: 360 })

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth

      const w = Math.min(vw * 0.3, 360)
      const h = Math.min(w * 1.3, 360)

      setSize({ w, h })
    }

    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return size
}


