"use client"
import { Button } from "@/components/ui/button";
import { WithVariantEventCardPropsArray } from "../types";
import { EventCard } from "./EventCard";
import { useState } from "react";

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
            {...event}
            variant="onGoing"
            actions={
                <>
                    <Button onClick={prev} size="sm">Prev</Button>
                    <Button onClick={next} size="sm">Next</Button>
                </>
            }
        />
    );
}