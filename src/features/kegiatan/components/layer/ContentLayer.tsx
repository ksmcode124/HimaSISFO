
import { ArrowRight } from "lucide-react"
import { DynamicCalendar } from "../Calendar"
import { EventCard } from "../EventCard"
import { Button } from "@/components/ui/button";
import { formatMonthName } from "../../utils/FormatDate";
import { createEventIndex, createEventIndexByNameDate } from "../../utils/EventIndexer";
import { findEventById, findEventByMonthYear, sortEvents } from "../../utils/GetEventNow";
import { EventCardProps } from "../../types";
import { EventDetailContentProps } from "../../types"
import { FilterComp } from "../FilterComp";

export function CalendarContent({ events }: { events: any }) {
  return (
    <div className="relative flex flex-col gap-5">
      <h1 className="py-5 md:py-4 md:py-10 text-center font-semibold text-xl md:text-7xl">
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

export function EventCardContent({ events }: { events: EventCardProps[] }) {
  const { pastNotGoing, nextOnGoing, futureNotGoing } = sortEvents(events);
  return (
    <div className="relative flex flex-col gap-3 md:gap-5  justify-center w-full mx-auto">
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
          className="text-[12px] md:text-sm flex flex-row gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-3 rounded-full items-center"
        >Selengkapnya<ArrowRight className="text-sm md:text-xl" /></Button>
      </div>

    </div>

  )
}

export function EventListContent({ events, filter }: { events: EventCardProps[] , filter?: string }) {
  const tahunIni = new Date().getFullYear();
  const bulan = filter || formatMonthName(new Date().getMonth());
  const HelperEvent = createEventIndex(events);
  const FindEvent = findEventByMonthYear({ month: bulan, year: tahunIni, indexedEvents: HelperEvent });
  return (
    <>
      <h2 className="text-base md:text-xl w-full h-fit py-3 md:py-5 border-b-2 border-black">Kegiatan / Agenda</h2>
      <div className="relative">
        <h1 className="text-xl md:text-9xl w-full h-fit text-center py-7 md:py-15 border-b-4 border-black ">Agenda</h1>
        <div className="text-base md:text-4xl flex flex-row justify-between items-center py-3 md:py-5">
          <FilterComp className="text-xl"/>
          <span className="text-[14px] md:text-xl">{FindEvent.length} Acara ditemukan</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-5 md:mt-10">
          {FindEvent.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              start={event.start}
              end={event.end}
              img={event.img ?? ""}
              description={event.description}
              variant="detail"
              type={event.type}
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

export function EventDetailContent({ events, search }: EventDetailContentProps) {
  const HelperEvent = createEventIndexByNameDate(events);
  const key = decodeURIComponent(search).split("-").pop();
  const FindEventDetail = findEventById({ id: Number(key), indexedEvents: HelperEvent });
  return (
    <div className="relative w-full flex flex-col gap-10 md:gap-20">
      <h2 className="text-base md:text-xl w-full h-fit py-3 md:py-5 border-b-2 border-black">Kegiatan / Agenda / Berita</h2>
      <img src={`/assets/kegiatan/${FindEventDetail?.img}`} alt="detail event" className="object-cover relative w-full  border-gradient-y rounded-[40px]" />
      <div className="flex flex-col gap-5">
        <h1 className="text-xl md:text-3xl font-bold">{FindEventDetail?.title}</h1>
        <p className="text-[14px] md:text-xl">{FindEventDetail?.description}</p>
      </div>
    </div>
  )
}