"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import * as motion from "motion/react-client"

export default function HeroBeranda() {
    return (
        <div className='relative'>
            <Carousel plugins={[
                Autoplay({
                    delay: 2000
                }),
                Fade()
            ]}>
                <CarouselContent className='w-screen aspect-4/3 m-0'>
                    <CarouselItem className="w-full h-full bg-accent"></CarouselItem>
                    <CarouselItem className="w-full h-full bg-red-400"></CarouselItem>
                    <CarouselItem className="w-full h-full bg-green-400"></CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="flex flex-col justify-center items-center h-full text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">Selamat Datang di</h1>
                    <div className="overflow-hidden h-14">
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <h1 className="mt-2 text-6xl md:text-9xl font-extrabold text-white drop-shadow-lg">HIMASISFO</h1>
                        </motion.div>
                    </div>
                    <p className="mt-4 text-lg md:text-2xl text-white drop-shadow-lg">Himpunan Mahasiswa Sistem Informasi</p>
                </div>
            </div>
        </div>
    )
}
