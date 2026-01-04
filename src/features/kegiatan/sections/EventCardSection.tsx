import { 
    DecorationLayer, 
    ContentLayer, 
    OverlayLayer, 
 } from '@/components/layout/Layer'
import { EventCardContent } from '../components/layer/ContentLayer'
import { EventCardDecoration } from '../components/layer/DecorationLayer'
import { getEvents } from '../services/eventService';
 
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