import { 
    DecorationLayer, 
    ContentLayer, 
 } from '@/components/layout/Layer'   
import { getEvents } from '../services/eventService';
import { EventCardProps } from '../types';
import { formatMonthName } from '../utils/FormatDate';
import { createEventIndex } from '../utils/EventIndexer';
import { findEventByMonthYear } from '../utils/GetEventNow';
import { EventCard } from '../components/EventCard';
import { FilterComp } from '../components/FilterComp';

function EventListContent({ events }: { events: EventCardProps[]}) {
  return (
    <div className="relative justify-center items-center">
      <h2 className="text-base md:text-xl w-full h-fit py-3 md:py-5 border-b-2 border-black">
        Kegiatan / Agenda
      </h2>
      <div className="relative mx-4 md:mx-8">
        <h1 className="text-xl md:text-9xl w-full h-fit text-center py-7 md:py-15 border-b-4 border-black ">
          Agenda
        </h1>
        <div className="text-base md:text-4xl flex flex-row justify-between items-center py-3 md:py-5">
          <FilterComp className="text-xl" />
          <span className="text-[14px] md:text-xl">{events.length} Acara ditemukan</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-5 md:mt-10">
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
      <ContentLayer className="mx-10 md:mx-30">
        <EventListContent events={FindEvent}/>
      </ContentLayer>
    </section>
  );
}
