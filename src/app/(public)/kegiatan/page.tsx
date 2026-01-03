
import { CalendarSection } from "@/features/kegiatan/sections/CalendarSection";
import { EventCardSection } from "@/features/kegiatan/sections/EventCardSection";


export default function Page() {
  return (
    <>
      <div className="relative mt-[150px]">
        <CalendarSection />
        <EventCardSection />
      </div>
      <div></div>
    </>
  );
}
