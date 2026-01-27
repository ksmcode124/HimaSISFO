import {
  DecorationLayer,
  ContentLayer,
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
import { CalendarLeftDecoration } from '../../../../public/assets/kegiatan/decoration/CalendarLeft';
import { CalendarRightDecoration } from '../../../../public/assets/kegiatan/decoration/CalendarRight';

function EventListContent({ events }: { events: EventCardProps[] }) {
  return (
    <div className="relative justify-center items-center text-[var(--color-dark-blue)] w-full px-auto">
      <div className="px-8 md:px-16 xl:px-32">
        <BreadcrumbSection items={breadcrumbItems.breadcrumbItems} />
      </div>
      <div className="px-10 md:px-20 xl:px-40">
        <h1 className="text-xl md:text-4xl xl:text-7xl font-bold w-full h-fit text-center pb-5 md:pb-15 border-b-4 border-[var(--color-dark-blue)]">
          Agenda
        </h1>
      </div>
      <div className="flex flex-row justify-between items-center pt-3 md:pt-5 px-10 md:px-20 xl:px-40">
        <FilterComp className="text-[14px] md:text-xl" type="list" selected="none" />
        <span className="text-[14px] md:text-xl px-2 md:px-3 py-1 md:py-2 bg-gradient-to-b from-[#F0F4F8] to-[#E6EEF5] rounded-full">{events.length} Acara ditemukan</span>
      </div>
      <EventList events={events}/>
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
      <DecorationLayer className="w-full h-[600px] overflow-hidden top-1/5">
        <CalendarLeftDecoration className="absolute" />
        <CalendarRightDecoration className="absolute  " />
      </DecorationLayer>
      <DecorationLayer className="w-full h-[600px] overflow-hidden top-2/5 md:top-3/5">
        <CalendarLeftDecoration className="absolute" />
        <CalendarRightDecoration className="absolute  " />
      </DecorationLayer>
      <DecorationLayer className="w-full overflow-hidden top-4/5 ">
        <CalendarLeftDecoration className="absolute md:hidden" />
        <CalendarRightDecoration className="absolute md:hidden" />
      </DecorationLayer>
      <ContentLayer>
        <EventListContent events={FindEvent} />
      </ContentLayer>
    </section>
  );
}
