"use client"
import { Glass } from '@/components/ui/Glass'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import { berandaData } from '..'
import { Button } from '@/components/ui/button'

export default function VisionAccordion() {
    const data = berandaData.vision_mission;

    const accordionItems = [
        {
            value: "visi",
            title: "Visi",
            content: data.vision,
        },
        {
            value: "misi",
            title: "Misi",
            content: (
                <ol className="grid gap-2">
                    {data.missions.map((misiPoint, index) => (
                        <li key={index}>
                            {index + 1}. {misiPoint}
                        </li>
                    ))}
                </ol>
            ),
            contentClass: "text-justify",
        },
        {
            value: "tujuan",
            title: "Tujuan",
            content: data.objective,
            contentClass: "text-justify",
        },
    ];

    const accordionContentClass = "text-justify mt-4 p-6 rounded-full w-full";
    const accordionTriggerClass = "rounded-full w-full *:w-full";
    return (
        <Accordion type="single" collapsible className="w-full space-y-8">
            {accordionItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <Glass borderRadius={25} className='*:w-full'>
                        <AccordionTrigger hasChevron={false} className={accordionTriggerClass}>
                            <span>{item.title}</span>
                        </AccordionTrigger>
                    </Glass>

                    <Glass borderRadius={25} className='mt-4'>
                        <AccordionContent
                            className={`${accordionContentClass} ${item.contentClass ?? ""}`}
                        >
                            {item.content}
                        </AccordionContent>
                    </Glass>
                </AccordionItem>
            ))}
        </Accordion>

    )
}