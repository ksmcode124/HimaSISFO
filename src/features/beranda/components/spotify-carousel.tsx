'use client'

import { Episode } from '@/lib/types/interface'
import React, { useEffect, useRef, useState } from 'react'
import {
  StackedCarousel,
  ResponsiveContainer,
  StackedCarouselSlideProps,
} from 'react-stacked-center-carousel'
import AudioPlayer from './audio-player'
import { formatTanggalIndonesia } from '../utils/parseDate'
import { Skeleton } from '@/components/ui/skeleton'

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
      ? 40    // kiri
      : -40   // kanan
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
        backgroundImage: `url(${item.coverImage})`,
        backgroundSize: 'cover',
        transform: `
          perspective(1200px)
          rotateY(${rotateY}deg)
          scale(${isCenterSlide ? 1 : 0.9})
        `,
      }}
      onClick={() => !isCenterSlide && swipeTo(slideIndex)}
    >
    </div>
  )
})

/* ======================
 * MAIN CAROUSEL
 * ====================== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SpotifyCarousel({ episodes, error, isLoading }: { episodes?: Episode[], error?: any, isLoading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeEpisode = episodes?.[activeIndex]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const { w, h } = useResponsiveCarousel()

  // if (isLoading) {
  //   return <div className='space-y-2'>
  //     <Skeleton className='w-full h-96' />
  //     <Skeleton className='w-full h-10' />
  //     <Skeleton className='w-full h-4' />
  //     <Skeleton className='w-full h-4' />
  //   </div>
  // }

  if (error) {
    return <div>Error loading data</div>
  }

  const data = episodes?.map((ep, i) => {
    return { title: ep.name, coverImage: ep.images[0].url }
  }) || []

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-7xl">
          <ResponsiveContainer
            carouselRef={ref}
            render={function (width, carouselRef) {
              if (isLoading) {
                return <div>
                  <Skeleton className='w-full h-96 mb-4' />
                </div>
              }
              return <>
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
                  useGrabCursor
                  onActiveSlideChange={(index) => setActiveIndex(index)}
                />
              </>
            }}
          />
        </div>
      </div>

      {activeEpisode && (
        <div className="">
          {isLoading ? (
            <>
              <Skeleton className='w-full h-10 mb-2' />
              <Skeleton className='w-full h-4 mb-4' />
            </>
          ) : (
            <>
              <a href={activeEpisode.external_urls.spotify} className='hover:underline'>
                <h2 className="md:text-2xl text-sm font-bold mb-2">{activeEpisode.name}</h2>
              </a>
              <p className="text-sm mb-4">{formatTanggalIndonesia(activeEpisode.release_date)}</p>
            </>
          )}
        </div >
      )}
      <AudioPlayer onNextClick={() => ref.current?.goNext()} onPrevClick={() => ref.current?.goBack()} src={activeEpisode?.audio_preview_url || ''} />
    </>
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


