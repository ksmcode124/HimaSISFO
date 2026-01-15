
import { getEvents } from "../services/eventService";
import { ContentLayer } from "@/components/layout/Layer";
import { createEventIndexByNameDate } from "../utils/EventIndexer";
import { findEventById } from "../utils/GetEventNow";
import { EventCardProps } from "../types"
import Image from "next/image";
import { breadcrumbItems } from "../data/routedata.json";
import { ListBreadcrumb } from "@/components/ui/ListBreadCrumb";
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
      <ListBreadcrumb items={newBreadcrumbItems} />
      <div className="relative mx-4 md:mx-8 flex flex-col gap-10 md:gap-20 mt-10 md:mt-20 text-[var(--color-dark-blue)]">
        <Image
          src={`/assets/kegiatan/${events.img}`}
          alt="detail event"
          className="w-full aspect-[2/1] object-cover border-gradient-y rounded-[20px] md:rounded-[40px]"
          width={1600}
          height={1000}
        />
        <div className="flex flex-col gap-5">
          <h1 className="text-xl md:text-3xl font-bold">
            {events.title}
          </h1>
          <p className="text-[14px] md:text-xl">
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
  console.log(FindEventDetail);
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