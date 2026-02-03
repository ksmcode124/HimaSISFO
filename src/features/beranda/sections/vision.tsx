import React from 'react'
import { berandaData } from '@/features/beranda'
import Pita from '@/components/beranda/pita';
import Logo from '../components/logo';
import VisionAccordion from '../components/vision-accordion';
export default function Vision() {
    const data = berandaData.vision_mission;
    return <div className="relative">
        <div className="min-h-screen flex items-center justify-center lg:my-30 mx-16 bg-radial from-blue-200 to-transparent to-80%">
            <div className="grid md:grid-cols-2 h-full w-full">
                <div className="flex items-center justify-center">
                    <Logo />
                </div>
                <div className="flex w-full items-center">
                    <VisionAccordion />
                </div>
            </div>
        </div>
        <img src="/assets/beranda/awan/visitop.svg" className='w-1/4 absolute top-0 right-0 -scale-x-100' alt="" />
        <img src="/assets/beranda/awan/visitop.svg" className='w-1/4 absolute top-0 left-0' alt="" />
        <img src="/assets/beranda/awan/visibottom.svg" className='w-1/8 absolute bottom-0 right-0' alt="" />
        <img src="/assets/beranda/awan/visibottom.svg" className='w-1/8 absolute bottom-0 left-0 -scale-x-100' alt="" />
        <Pita />
    </div>

}
