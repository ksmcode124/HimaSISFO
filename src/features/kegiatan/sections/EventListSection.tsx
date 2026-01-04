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
    <section className="relative px-0 m-0">
      <ContentLayer className="mx-10">
        <EventListContent events={events} />
      </ContentLayer>
    </section>
  );
}
