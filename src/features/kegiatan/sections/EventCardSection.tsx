import {
  DecorationLayer,
  ContentLayer,
} from '@/components/layout/Layer'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"
import { getEvents } from '../services/eventService';
import { EventCardProps } from '../types';
import { sortEvents } from '../utils/SortEvent';
import { EventCard } from '../components/EventCard';
import { formatMonthName } from '../utils/FormatDate';
import { ShowNextEvent } from '../components/ShowNextEvent';
import { EventCardEmpty } from '../components/EventCardEmpty';

function EventCardDecoration() {
  return (
    <div className="h-full bg-gradient-to-b from-[#486EAB] to-[#EDF3F6]"/>
  );
}

function EventCardContent({ events }: { events: EventCardProps[] }) {
  const { pastNotGoing, nextOnGoing, futureNotGoing } = sortEvents(events);
  return (
    <div className="relative flex flex-col gap-2 md:gap-5 justify-center w-full max-w-[1120px]">
      <h1 className="w-full h-fit text-center font-bold text-xl md:text-4xl xl:text-6xl text-[var(--color-nile-blue)]">
        Agenda
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-[2fr_3fr_2fr] gap-1 sm:gap-4 xl:gap-8 items-stretch">
        <div className="grid grid-rows-[auto_1fr] min-h-full">
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10 font-semibold text-[12px] md:text-2xl xl:text-3xl text-[var(--color-nile-blue)]">Sebelum</h2>
          {pastNotGoing ? <EventCard variant="notGoing" {...pastNotGoing} /> : <EventCardEmpty />}
        </div>
        <div className="grid grid-rows-[auto_1fr] min-h-full">
          {nextOnGoing && (
            <div className="flex justify-center items-center gap-1 md:gap-5">
              <h2 className="h-fit w-fit text-center uppercase py-5 md:py-10 font-semibold text-[12px] md:text-2xl xl:text-3xl text-[var(--color-nile-blue)]">Berikutnya</h2>
              {nextOnGoing.length > 1 ? <span className="bg-[var(--color-nile-blue)] rounded-full w-5 md:w-10 h-5 md:h-10 flex items-center justify-center font-normal text-[12px] md:text-xl xl:text-2xl text-white">{nextOnGoing.length}</span> : null}
            </div>
          )}

          {nextOnGoing ? (<ShowNextEvent events={nextOnGoing} />) : <EventCardEmpty />}
        </div>
        <div className="grid grid-rows-[auto_1fr] min-h-full">
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10 font-semibold text-[12px] md:text-2xl xl:text-3xl text-[var(--color-nile-blue)]">Mendatang</h2>
          {futureNotGoing ? <EventCard variant="notGoing" {...futureNotGoing} /> : <EventCardEmpty />}
        </div>
      </div>
      <div className="w-full justify-center flex flex-row py-5 md:py-10">
        <Button
          variant="default"
          route={`kegiatan/agenda?bulan=${formatMonthName(new Date().getMonth())}`}
          className="text-[12px] md:text-sm flex flex-row gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-3 rounded-full items-center shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
          size="lg"
        >Selengkapnya<ArrowRight className="text-sm md:text-xl" /></Button>
      </div>

    </div>

  )
}

export async function EventCardSection() {
  const events = await getEvents();
  return (
    <section className="relative p-0 m-0 top-0">
      <DecorationLayer className="top-1/3 md:top-1/4 pointer-events-none">
        <EventCardDecoration />
      </DecorationLayer>
      <ContentLayer className="px-3 pb-0 md:pb-30 flex justify-center">
        <EventCardContent events={events} />
      </ContentLayer>
    </section>
  )
}