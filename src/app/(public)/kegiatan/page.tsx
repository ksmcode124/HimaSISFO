"use client"
import { BackgroundLayer } from "@/components/layout/Layer";
import { EventCard } from "@/features/kegiatan/components/EventCard";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";
import { CalendarSection } from "@/features/kegiatan/sections/CalendarSection";
import { EventCardSection } from "@/features/kegiatan/sections/EventCardSection";

export default function Page() {
  return (
    <div>
      <BackgroundLayer>
        <RoundedBg align="start" className="absolute" />
        <RoundedBg align="end" className="absolute" />
      </BackgroundLayer>
      <div></div>
      <CalendarSection />
      <EventCardSection />
      <div></div>
    </div>
  );
}
