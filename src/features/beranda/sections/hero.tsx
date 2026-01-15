"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import * as motion from "motion/react-client"
import { type HeroSection } from '@/features/beranda/types'
import { berandaData } from '..'
import Pita from '@/components/beranda/pita'

export default function HeroBeranda() {
    const data = berandaData.hero as HeroSection;
    return (
        <div className='relative'>
            <Carousel plugins={[
                Autoplay({
                    delay: 2000
                }),
                Fade()
            ]}>
                <CarouselContent className='w-screen aspect-4/3 min-h-screen m-0'>
                    <CarouselItem className="w-full h-full bg-accent"></CarouselItem>
                    <CarouselItem className="w-full h-full bg-red-400"></CarouselItem>
                    <CarouselItem className="w-full h-full bg-green-400"></CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="absolute top-0 left-0 w-full max-h-full min-h-screen">
                <div className="flex flex-col justify-center items-center min-h-screen max-h-full max-w-200 mx-auto text-center px-4">
                    <h1 className="text-lg md:text-lg font-bold text-white drop-shadow-lg">{data.title}</h1>
                    <div className="overflow-hidden h-14">
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <h1 className="mt-2 text-7xl md:text-9xl font-extrabold text-white drop-shadow-lg">HIMASISFO</h1>
                        </motion.div>
                    </div>
                    <p className="mt-4 text-sm text-white drop-shadow-lg">{data.description}</p>
                </div>
            </div>
            <Pita />
        </div>
    )
}
