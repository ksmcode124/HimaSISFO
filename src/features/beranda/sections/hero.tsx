"use client"
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import * as motion from "motion/react-client"
import { type HeroSection } from '@/features/beranda/types'
import { berandaData } from '..'
import { Button } from '@/features/shared/components/ui/button'


export default function HeroBeranda() {
    const data = berandaData.hero as HeroSection;
    return (
        <section className={`relative w-full h-[494px] md:h-[650px] lg:h-screen overflow-hidden`}>
            <Carousel plugins={[
                Autoplay({
                    delay: 3500
                }),
                Fade()
            ]}>
                <CarouselContent className='w-full h-[494px] md:h-[650px] lg:h-screen m-0 p-0'>
                {data.images.map((image, index) => (
                    <CarouselItem key={index} 
                    className="w-full h-full bg-cover bg-center lg:bg-[position:center_85%]" 
                    style={{ backgroundImage: `url('/assets/beranda/hero/${image}')` }}></CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>

                

            <div className="absolute inset-0 w-full h-[494px] md:h-[650px] lg:h-screen flex flex-col justify-center items-center text-center px-4 z-10 ">
                <div className="w-[353px] md:w-[450px] lg:w-[700px] mx-auto flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6">
                    <h1 className="font-title text-4xl md:text-5xl lg:text-5xl font-bold whitespace-nowrap text-white drop-shadow-lg">{data.title}</h1>
                    <div className="flex items-center justify-center">
                        <div>
                            <h1 className="font-heading italic text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg tracking-wide">
                             HIMA <span className="text-blue-500">SISFO</span>
                            </h1>
                        </div>
                    </div>
                    <p className="body2 md:text-xl lg:text-2xl tracking-normal text-white drop-shadow-lg">{data.description}</p>
                </div>
               <Button className="bg-[#E3F2FD55] hover:bg-[#E3F2FD33] mt-2"> 
                <a href="#profileKabinet">Lanjut Jelajahi</a> 
               </Button>
            </div>

        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-px z-[5] h-[90px] md:h-[130px] lg:h-[180px] bg-gradient-to-t from-white via-white/60 to-transparent"
            />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-px z-[5] h-[80px] md:h-[100px] lg:h-[150px] bg-white opacity-60"
            style={{
            WebkitMaskImage:
            'radial-gradient(140% 100% at 50% 100%, #000 0%, transparent 78%)',
             maskImage:
            'radial-gradient(140% 100% at 50% 100%, #000 0%, transparent 78%)',
        }}
        />
    </section>
    )
}
