
import {
  ContentLayer,
  OverlayLayer,
  DecorationLayer,
} from "@/components/layout/Layer";
import { CalendarLeftDecoration} from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";
import { getEvents } from "../services/eventService";
import { DynamicCalendar } from "../components/Calendar";
import { EventCardProps } from "../types";

function CalendarDecoration() {
    return (
        <div className="w-full overflow-hidden">
            <CalendarLeftDecoration className="absolute" />
            <CalendarRightDecoration className="absolute  " />
        </div>
    );
}

function CalendarContent({ events }: { events: EventCardProps[] }) {
  return (
    <div className="relative flex flex-col gap-5">
      <h1 className="py-5 md:py-4 md:py-10 text-center font-semibold text-xl md:text-4xl xl:text-7xl">
        Kalender
      </h1>
      <DynamicCalendar className="border-[#456882] border-6" events={events} />
      <div className="mx-2 md:mx-0 flex flex-col gap-[16px] p-5 border-2 border-[#1B3C53] rounded-[10px] bg-white">
        <h2 className="font-bold text-[18px] ">Keterangan</h2>
        <div className="flex flex-row gap-3 md:gap-6 items-start">
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-7 md:h-7 bg-gradient-to-b from-[#1B3C53] to-[#456882]"></div>
            <span className="text-[13px] md:text-[18px] font-semibold">Acara Hima</span>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-7 md:h-7 bg-gradient-to-b from-[#7F1D1D] to-[#DC2626]"></div>
            <span className="text-[13px] md:text-[18px] font-semibold">Beasiswa</span>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-7 md:h-7 bg-gradient-to-b from-[#CA8A04] to-[#EAB308]"></div>
            <span className="text-[13px] md:text-[18px] font-semibold">Lomba</span>
          </div>
        </div>
      </div>
    </div>
  )
}



export async function CalendarSection() {
  const events = await getEvents();
  return (
    <section className="relative p-0 m-0 top-0">
      <DecorationLayer className="px-0">
        <CalendarDecoration />
      </DecorationLayer>
      <ContentLayer className="px-1 md:px-20 xl:px-60 pb-30">
        <CalendarContent events={events} />
      </ContentLayer>
      <OverlayLayer className="px-5 justify-center">
       <div></div>
      </OverlayLayer>
    </section>
  );
}
