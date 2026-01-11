import { 
    DecorationLayer, 
    ContentLayer, 
    OverlayLayer, 
 } from '@/components/layout/Layer'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"
import { getEvents } from '../services/eventService';
import { EventCardProps } from '../types';
import { sortEvents } from '../utils/GetEventNow';
import { EventCard } from '../components/EventCard';

function EventCardDecoration() {
    return (
        <div className="h-full bg-gradient-to-b from-[#486EAB] to-[#EDF3F6] ">ini dekorasi</div>
    );
}

function EventCardContent({ events }: { events: EventCardProps[] }) {
  const { pastNotGoing, nextOnGoing, futureNotGoing } = sortEvents(events);
  return (
    <div className="relative flex flex-col gap-3 md:gap-5 justify-center w-full mx-auto">
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
          className="text-[12px] md:text-sm flex flex-row gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-3 rounded-full items-center shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
        >Selengkapnya<ArrowRight className="text-sm md:text-xl" /></Button>
      </div>

    </div>

  )
}

export async function EventCardSection() {
    const events = await getEvents();
    return (
        <section className="relative p-0 m-0 top-0">
            <DecorationLayer className="h-[231px] md:h-[617px] mt-35 md:mt-60">
                <EventCardDecoration />
            </DecorationLayer>
            <ContentLayer className="px-5 md:px-10 xl:px-40 pb-30">
                <EventCardContent events={events} />
            </ContentLayer>
            <OverlayLayer>
                <div></div>
            </OverlayLayer>
        </section>
    )
}