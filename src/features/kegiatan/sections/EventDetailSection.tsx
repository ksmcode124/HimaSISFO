
import { getEvents } from "../services/eventService";
import { ContentLayer, DecorationLayer, OverlayLayer } from "@/components/layout/Layer";
import { createEventIndexByNameDate } from "../utils/EventIndexer";
import { findEventById } from "../utils/FindEvent";
import { EventCardProps } from "../types"
import Image from "next/image";
import breadcrumbItems from "../data/routedata.json";
import BreadcrumbSection from "./BreadcrumbSection";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";
import { CalendarLeftDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
const newBreadcrumbItems = [
  ...breadcrumbItems.breadcrumbItems,
  {
    display: "Berita",
    link: `/kegiatan/agenda/detail`
  }
]

function AwanOverlay() {
  return (
    <div className="relative w-[850px] lg:w-[1120px] flex flex-col justify-between pointer-events-none">
      <div className="mx-auto flex w-full justify-end ">
        <div className="translate-x-1/2 w-[120px] md:w-[347.93px] aspect-[3/2] bg-[url('/assets/kegiatan/Awan-2.webp')] bg-contain bg-center bg-no-repeat" />
      </div>
      <div className="flex w-full justify-start">
        <div className="-translate-x-1/2 w-[120px] md:w-[500px] aspect-[3/2] bg-[url('/assets/kegiatan/Awan.webp')] bg-contain bg-center bg-no-repeat" />
      </div>
    </div>
  )
}

function EventDetailContent({ events }: { events: EventCardProps }) {
  return (
    <div className="relative justify-center items-center w-[850px] lg:w-[1120px] px-5">
      <BreadcrumbSection items={newBreadcrumbItems} />
      <div className="relative mx-4 md:mx-0 mt-5 flex flex-col gap-10 md:gap-20 xl:gap-30 text-[var(--color-dark-blue)]">
        <OverlayLayer className="inset-0 w-full -translate-y-1/7 aspect-[3/2] flex justify-center pointer-events-none">
          <AwanOverlay />
        </OverlayLayer>
        <Image
          src={`/assets/kegiatan/${events.img}`}
          alt="detail event"
          className="w-full aspect-[2/1] object-cover border-gradient-y rounded-[20px] md:rounded-[40px]"
          width={1600}
          height={1200}
        />

        <div className="flex flex-col gap-6 md:gap-8 xl:gap-12">
          <h1 className="text-xl md:text-3xl xl:text-6xl font-bold">
            {events.title}
          </h1>
          <p className="text-[12px] md:text-[18px] xl:text-xl font-normal h-[150px] md:h-[400px] overflow-hidden ">
            {events.description}
          </p>
        </div>
      </div>
    </div>
  )
}
export async function EventDetailSection({ id, tahun }: { id: string; tahun?: string }) {
  const tahunIni = tahun ? new Date().getFullYear().toString() : new Date().getFullYear().toString();
  const events = await getEvents(tahunIni);
  const HelperEvent = createEventIndexByNameDate(events);
  // console.log("HelperEvent in Detail:", HelperEvent);
  const key = decodeURIComponent(id).split("-").pop();
  const FindEventDetail = findEventById({ id: Number(key), indexedEvents: HelperEvent });
  if (!FindEventDetail) {
    return <div>Event not found</div>;
  }

  return (
    <section className="relative p-0 m-0 top-0">
      <DecorationLayer className="w-full overflow-hidden">
        <CalendarLeftDecoration className="absolute" />
        <CalendarRightDecoration className="absolute  " />
      </DecorationLayer>
      <ContentLayer className="px-5 md:px-20 flex justify-center">
        <EventDetailContent events={FindEventDetail} />
      </ContentLayer>
    </section>
  )
}