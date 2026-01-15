import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import { berandaData } from '@/features/beranda'
import Pita from '@/components/beranda/pita';
export default function Vision() {
    const data = berandaData.vision_mission;
    return <div className="relative">
        <div className="min-h-screen flex items-center justify-center lg:my-30 mx-16">
            <div className="grid md:grid-cols-2 h-full w-full">
                <div className="flex items-center justify-center">
                    <img src={'/assets/shared/logos/logo-himasisfo.webp'}
                        alt="" className="h-3/4" />
                </div>
                <div className="flex w-full items-center">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="visi">
                            <AccordionTrigger>Visi</AccordionTrigger>
                            <AccordionContent className="text-justify">
                                {data.vision}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="misi">
                            <AccordionTrigger>misi</AccordionTrigger>
                            <AccordionContent className="text-justify">
                                <ol className="gap-2 grid">

                                    {data.missions.map((misiPoint, index) => (
                                        <li key={index}>{index + 1}. {misiPoint}</li>
                                    ))}
                                </ol>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="tujuan">
                            <AccordionTrigger>tujuan</AccordionTrigger>
                            <AccordionContent className="text-justify">
                                {data.objective}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
        <Pita />
    </div>

}
