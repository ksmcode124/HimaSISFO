
import { CalendarSection } from "@/features/kegiatan/sections/CalendarSection";
import { EventCardSection } from "@/features/kegiatan/sections/EventCardSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";

export default function Page() {
  return (
    <>
      <BackgroundLayer>
        <RoundedBg align="start" />
        <RoundedBg align="end" />
      </BackgroundLayer>
      <div className="relative flex-col items-start mt-10">
        <CalendarSection />
        <EventCardSection />
      </div>
      <div></div>
    </>
  );
}
