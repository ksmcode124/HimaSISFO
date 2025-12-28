"use client"
import { EventCard } from "@/features/kegiatan/components/EventCard";
import { CalendarSection } from "@/features/kegiatan/sections/CalendarSection";
import { EventCardSection } from "@/features/kegiatan/sections/EventCardSection";

export default function Page() {
  return (
    <div>
      <CalendarSection />
      <EventCardSection />
    </div>
  );
}
