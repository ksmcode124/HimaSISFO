
import { ArrowRight } from "lucide-react"
import DynamicCalendar from "../Calendar"
import { EventCard } from "../EventCard"
import { Button } from "@/components/ui/button";
import { formatMonthName } from "../../utils/FormatDate";
import { findEventById, FindEventByMonthYear, sortEvents, toEventsWithVariant } from "../../utils/GetEventNow";
import { EventCardProps } from "../../types";
import { createEventIndex, createEventIndexByNameDate } from "../../utils/EventIndexer";
import { create } from "domain";

export function CalendarContent({ events }: { events: any }) {
  return (
    <div className="relative flex flex-col gap-5">
      <h1 className="py-5 md:py-4 md:py-10 text-center font-semibold text-xl md:text-7xl">
        Kalender
      </h1>
      <DynamicCalendar className="border-[#456882] border-6" events={events}/>
      <div className="mx-2 md:mx-0 flex flex-col gap-[16px] p-5 border-2 border-[#1B3C53] rounded-[10px] bg-white">
        <h2 className="font-bold text-[18px] ">Keterangan</h2>
        <p>Ini adalah keterangan untuk kalender.</p>
      </div>
    </div>
  )
}

export function EventCardContent({ events }: { events: EventCardProps[] }) {
  const eventsWithVariant = toEventsWithVariant(events);
  const { pastNotGoing, nextOnGoing, futureNotGoing } = sortEvents(eventsWithVariant);
  return (
    <div className="relative flex flex-col gap-2 md:gap-5  justify-center w-full mx-auto">
      <h1 className="w-full h-fit text-center font-semibold text-xl md:text-7xl">
        Agenda
      </h1>
      <div className="grid grid-cols-3 xl:grid-cols-[285fr_479fr_285fr] gap-1 md:gap-8">
        <div>
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10 font-semibold text-[12px] md:text-3xl">Sebelum</h2>
          {pastNotGoing && <EventCard variant="notGoing" {...pastNotGoing} />}
        </div>
        <div>
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10 font-semibold text-[12px] md:text-3xl">Berikutnya</h2>
          {nextOnGoing && <EventCard variant="onGoing" {...nextOnGoing} />}
        </div>
        <div>
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10 font-semibold text-[12px] md:text-3xl">Mendatang</h2>
          {futureNotGoing && <EventCard variant="notGoing" {...futureNotGoing} />}
        </div>
      </div>
      <div className="w-full justify-center flex flex-row py-5 md:py-10">
        <Button
          variant="default"
          route={`kegiatan/agenda`}
          className="text-[12px] md:text-sm flex flex-row gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-3 rounded-full "
        >Selengkapnya<ArrowRight className="text-sm md:text-xl" /></Button>
      </div>

    </div>

  )
}

export function EventListContent({ events }: { events: EventCardProps[] }) {
  const tahunIni = new Date().getFullYear();
  const bulanIni = formatMonthName(new Date().getMonth());
  const HelperEvent = createEventIndex(events);
  const FindEvent = FindEventByMonthYear(bulanIni, tahunIni, HelperEvent);
  console.log(FindEvent);
  return (
    <>
      <h2 className="text-xl w-full h-fit py-5 border-b-2 border-black">Kegiatan / Agenda</h2>
      <div className="relative">
        <h1 className="text-9xl w-full h-fit text-center py-15 border-b-4 border-black ">Agenda</h1>
        <div className="flex flex-row justify-between items-center">
          <span>{bulanIni}</span>
          <span>{FindEvent.length} Acara ditemukan</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-5 md:mt-10">
          {FindEvent.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              img={event.img ?? ""}
              slug={event.slug}
              description={event.description}
              variant="detail"
            />
          ))}
        </div>
        {/* {visibleCount < events.length && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setVisibleCount(prev => prev + STEP)}
              className="px-6 py-2 border rounded"
            >
              Load more
            </Button>
          </div>
        )} */}
      </div>
    </>
  );
}
interface EventDetailContentProps {
  events: EventCardProps[];
  search: string; 
}

export function EventDetailContent({ events, search }: EventDetailContentProps) {
  const HelperEvent = createEventIndexByNameDate(events);
  const key = decodeURIComponent(search).split("-").pop();
  const FindEventDetail = findEventById(Number(key), HelperEvent);
  console.log(FindEventDetail);
  return (
    <div className="relative w-full gap-5 flex flex-col">
      <img src={`/assets/kegiatan/${FindEventDetail?.img}`} alt="detail event" className="object-cover relative w-full h-[600px]" />
      <p>{FindEventDetail?.description}</p>
    </div>
  )
}