
import {
  ContentLayer,
  OverlayLayer,
  DecorationLayer,
} from "@/components/layout/Layer";
import { CalendarLeftDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";
import { getEvents } from "../services/eventService";
import { DynamicCalendar } from "../components/Calendar";
import { EventCardProps } from "../types";

function CalendarOverlay() {
  return (
    <div className="relative w-full pointer-events-none">
      <div className="mx-auto md:w-[1000px] xl:w-[1300px] h-fit flex justify-end mb-25 md:mb-10">
        <div className="w-[120px] md:w-[347.93px] h-[100px] md:h-[282.38px] bg-[url('/assets/kegiatan/Corak-kalendar-2.webp')] bg-contain bg-center rotate-12 bg-no-repeat" />
      </div>
    </div>
  );
}
function CalendarDecoration() {
  return (
    <div className="relative grid grid-rows-2 w-full gap-15 pointer-events-none">
      <div className="h-fit mx-auto w-full md:w-[900px] xl:w-[1200px] mt-10">
        <div className="w-[150px] md:w-[387.93px] h-[100px] md:h-[282.38px] bg-[url('/assets/kegiatan/Corak-kalendar.webp')] bg-contain bg-center rotate-30 bg-no-repeat" />
      </div>
      <div className="relative w-full row-start-2 h-40 md:h-60 lg:h-80">
        <CalendarLeftDecoration className="absolute" />
        <CalendarRightDecoration className="absolute  " />
      </div>
    </div>
  );
}

function CalendarContent({ events }: { events: EventCardProps[] }) {
  return (
    <div className="relative flex flex-col gap-5 max-w-[870px]">
      <h1 className="py-5 md:py-4 md:py-10 text-center font-bold text-xl md:text-4xl xl:text-6xl text-[var(--color-nile-blue)]">
        Kegiatan
      </h1>
      <DynamicCalendar className="border-[#456882] border-6" events={events} />
      <div className="mx-2 md:mx-0 flex flex-col gap-[16px] px-3 md:px-5 py-3 border-2 border-[var(--color-dark-blue)] rounded-[10px] bg-white">
        <h2 className="font-bold text-[18px] text-[var(--color-dark-blue)]">Keterangan</h2>
        <div className="flex flex-row gap-3 md:gap-6 items-center md:items-start justify-center md:justify-start">
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-7 md:h-7 bg-gradient-to-b from-[#1B3C53] to-[#456882] rounded-[5px] aspect-square"></div>
            <span className="text-[13px] md:text-[18px] font-semibold text-[var(--color-dark-blue)]">Acara Hima</span>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-7 md:h-7 bg-gradient-to-b from-[#7F1D1D] to-[#DC2626] rounded-[5px] aspect-square"></div>
            <span className="text-[13px] md:text-[18px] font-semibold text-[var(--color-dark-blue)]">Beasiswa</span>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="w-5 h-5 md:w-7 md:h-7 bg-gradient-to-b from-[#CA8A04] to-[#EAB308] rounded-[5px] aspect-square"></div>
            <span className="text-[13px] md:text-[18px] font-semibold text-[var(--color-dark-blue)]">Lomba</span>
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
      <DecorationLayer >
        <CalendarDecoration />
      </DecorationLayer>
      <ContentLayer className="md:px-20 xl:px-60 pb-10 flex justify-center">
        <CalendarContent events={events} />
      </ContentLayer>
      <OverlayLayer className="inset-0 flex justify-center items-end pointer-events-none">
        <CalendarOverlay />
      </OverlayLayer>
    </section>
  );
}
