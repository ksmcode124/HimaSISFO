import {
  DecorationLayer,
  ContentLayer,
} from '@/components/layout/Layer'
import { getEvents } from '../services/eventService';
import { EventCardProps } from '../types';
import { formatMonthName } from '../utils/FormatDate';
import { createEventIndex } from '../utils/EventIndexer';
import { findEventByMonthYear } from '../utils/FindEvent';
import { EventCard } from '../components/EventCard';
import { FilterComp } from '../components/FilterComp';
import { breadcrumbItems  } from '../data/routedata.json';
import BreadcrumbSection from './BreadcrumbSection';

function EventListContent({ events }: { events: EventCardProps[] }) {
  return (
    <div className="relative justify-center items-center">
      <BreadcrumbSection items={breadcrumbItems} />
      <div className="relative mx-4 md:mx-8 text-[var(--color-dark-blue)]">
        <h1 className="text-xl md:text-4xl xl:text-7xl font-bold w-full h-fit text-center pb-5 md:pb-15 border-b-4 border-[var(--color-dark-blue)]">
          Agenda
        </h1>
        <div className="text-base md:text-4xl flex flex-row justify-between items-center py-3 md:py-5">
          <FilterComp className="text-xl" type="list" selected="none"/>
          <span className="text-[14px] md:text-xl px-2 md:px-3 py-1 md:py-2 bg-gradient-to-b from-[#F0F4F8] to-[#E6EEF5] rounded-full">{events.length} Acara ditemukan</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 mt-5 md:mt-10">
          {events.map((event) => (
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
    </div>
  );
}
export async function EventListSection({ filter }: { filter?: string }) {
  const tahunIni = new Date().getFullYear();
  const bulan = filter || formatMonthName(new Date().getMonth());
  const events = await getEvents();
  const HelperEvent = createEventIndex(events);
  const FindEvent = findEventByMonthYear({ month: bulan, year: tahunIni, indexedEvents: HelperEvent });

  return (
    <section className="relative p-0 m-0 top-0">
      <DecorationLayer>
        <div></div>
      </DecorationLayer>
      <ContentLayer className="mx-4 md:mx-30">
        <EventListContent events={FindEvent} />
      </ContentLayer>
    </section>
  );
}
