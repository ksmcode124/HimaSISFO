import { 
    DecorationLayer, 
    ContentLayer, 
    OverlayLayer, 
 } from '@/components/layout/Layer'   
import { EventListContent } from '../components/layer/ContentLayer';
import { getEvents } from '../services/eventService';

export async function EventListSection() {
  const events = await getEvents();
  return (
    <section className="relative p-0 m-0 items-center justify-center">
      <ContentLayer className="mx-10 md:mx-30">
        <EventListContent events={events} />
      </ContentLayer>
    </section>
  );
}
