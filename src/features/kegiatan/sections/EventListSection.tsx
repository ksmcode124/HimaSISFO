import {
  ContentLayer,
  DecorationLayer,
} from '@/components/layout/Layer'
import { getEvents } from '../services/eventService';
import { EventCardProps } from '../types';
import { formatMonthName } from '../utils/FormatDate';
import { createEventIndex } from '../utils/EventIndexer';
import { findEventByMonthYear } from '../utils/FindEvent';
import { FilterComp } from '../components/FilterComp';
import breadcrumbItems from '../data/routedata.json';
import BreadcrumbSection from './BreadcrumbSection';
import { EventList } from '../components/EventList';
import { DecorationRepeater } from '../components/DecorationRepeater';

function EventListContent({ events }: { events: EventCardProps[] }) {
  return (
    <div className="relative justify-center items-center text-[#323257] w-[850px] lg:w-[1120px]">
      <div className="px-5">
        <BreadcrumbSection items={breadcrumbItems.breadcrumbItems} />
        <div className="px-5">
          <h1 className="text-xl md:text-4xl xl:text-7xl font-bold w-full h-fit text-center pb-5 md:pb-15 border-b-4 border-[#323257]">
            Agenda
          </h1>
        </div>
        <div className="flex w-full px-5 flex-row justify-between items-center pt-3 md:pt-5">
          <FilterComp className="text-[14px] md:text-xl" type="list" selected="none" />
          <span className="text-[12px] md:text-xl px-2 md:px-3 py-1 md:py-2 bg-gradient-to-b from-[#F0F4F8] to-[#E6EEF5] rounded-full">{events.length} Acara</span>
        </div>
        <EventList events={events} />
      </div>

    </div>
  );
}
export async function EventListSection({ filter, tahun }: { filter?: string, tahun?: string }) {
  const tahunIni = tahun ? new Date().getFullYear().toString() : new Date().getFullYear().toString();
  const bulan = filter || formatMonthName(new Date().getMonth());
  const events = await getEvents(tahunIni);
  const HelperEvent = createEventIndex(events);

  console.log("HelperEvent:", HelperEvent);
  const FindEvent = findEventByMonthYear({ month: bulan, year: tahunIni, indexedEvents: HelperEvent });
  return (
    <section className="relative p-0 m-0 top-0 h-fit overflow-hidden">
      <DecorationLayer>
        <DecorationRepeater />
      </DecorationLayer>
      <ContentLayer className="flex justify-center">
        <EventListContent events={FindEvent} />
      </ContentLayer>
    </section>
  );
}
