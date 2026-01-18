
import { getEvents } from "../services/eventService";
import { ContentLayer } from "@/components/layout/Layer";
import { createEventIndexByNameDate } from "../utils/EventIndexer";
import { findEventById } from "../utils/FindEvent";
import { EventCardProps } from "../types"
import Image from "next/image";
import { breadcrumbItems } from "../data/routedata.json";
import BreadcrumbSection from "./BreadcrumbSection";
 const newBreadcrumbItems = [
    ...breadcrumbItems,
    {
      display: "Detail",
      link: `/kegiatan/agenda/detail`
    }
  ]

function EventDetailContent({ events }: { events: EventCardProps }) {

  return (
    <div className="relative justify-center items-center">
      <BreadcrumbSection items={newBreadcrumbItems} />
      <div className="relative mx-4 md:mx-8 flex flex-col gap-15 md:gap-30 text-[var(--color-dark-blue)]">
        <Image
          src={`/assets/kegiatan/${events.img}`}
          alt="detail event"
          className="w-full aspect-[2/1] object-cover border-gradient-y rounded-[20px] md:rounded-[40px]"
          width={1600}
          height={1000}
        />
        <div className="flex flex-col gap-6 md:gap-12">
          <h1 className="text-xl md:text-6xl font-bold">
            {events.title}
          </h1>
          <p className="text-[12px] md:text-xl font-normal h-[400px] overflow-hidden ">
            {events.description}
          </p>
        </div>
      </div>
    </div>
  )
}
export async function EventDetailSection({ id }: { id: string }) {
  const events = await getEvents();
  const HelperEvent = createEventIndexByNameDate(events);
  const key = decodeURIComponent(id).split("-").pop();
  const FindEventDetail = findEventById({ id: Number(key), indexedEvents: HelperEvent });
  if (!FindEventDetail) {
    return <div>Event not found</div>;
  }

  return (
    <section className="relative p-0 m-0 top-0">
      <ContentLayer className="mx-10 md:mx-30">
        <EventDetailContent events={FindEventDetail} />
      </ContentLayer>
    </section>
  )
}