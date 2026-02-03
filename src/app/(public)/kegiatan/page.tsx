
import { CalendarSection } from "@/features/kegiatan/sections/CalendarSection";
import { EventCardSection } from "@/features/kegiatan/sections/EventCardSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";
import Image from "next/image";
import { CalendarLeftDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";

function PitaDecoration() {
  return (
    <div className="relative w-full aspect-5/1 pointer-events-none">
      <Image
        src="/assets/kegiatan/Pita.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <BackgroundLayer>
        <div className="w-full overflow-hidden">
          <CalendarLeftDecoration className="absolute h-fit top-1/100 opacity-25" />
          <CalendarRightDecoration className="absolute h-fit top-1/100 opacity-25" />
        </div>
        <RoundedBg align="start" />
        <RoundedBg align="end" />
      </BackgroundLayer>
      <div className="relative flex-col items-start mt-28">
        <CalendarSection />
        <PitaDecoration />
        <EventCardSection />
      </div>
    </>
  );
}
