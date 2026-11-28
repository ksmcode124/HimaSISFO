"use client"
import { WithVariantEventCardPropsArray } from "../types";
import { EventCard } from "./EventCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ShowNextEvent({ events }: WithVariantEventCardPropsArray) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const event = events[currentIndex];

    if (!events.length) return null;
    if (!event) return null;

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };
    return (
        <EventCard
            key={currentIndex}
            {...event}
            variant="onGoing"
            actions={events.length > 1 ?
                <div className="absolute inset-0 flex justify-between items-center px-2 md:px-4 z-40 opacity-0 hover:opacity-100 bg-black/10">
                    <div className="text-[10px] text-white p-2 md:p-4 rounded-full bg-[#000000]/25 cursor-pointer">
                        <ChevronLeft onClick={prev} />
                    </div>

                    <div className="text-[10px] text-white p-2 md:p-4 rounded-full bg-[#000000]/25 cursor-pointer">
                        <ChevronRight onClick={next} />
                    </div>
                </div>
                : null}
        />
    );
}