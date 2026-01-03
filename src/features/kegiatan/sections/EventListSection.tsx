import { 
    DecorationLayer, 
    ContentLayer, 
    OverlayLayer, 
 } from '@/components/layout/Layer'
import { EVENTS } from '../data/events';    
import { EventListContent } from '../components/layer/ContentLayer';
export function EventListSection() {
  return (
    <section className="relative px-0 m-0">
      <ContentLayer>
        <EventListContent events={EVENTS as any} />
      </ContentLayer>
    </section>
  );
}
