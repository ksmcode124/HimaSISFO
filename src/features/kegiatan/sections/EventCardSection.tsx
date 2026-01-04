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
        <section className="relative p-0 m-0 items-center justify-center">
            <DecorationLayer className="h-[231px] md:h-[617px] mt-35 md:mt-60">
                <EventCardDecoration />
            </DecorationLayer>
            <ContentLayer className="px-2 md:px-10 xl:px-40 pb-30">
                <EventCardContent events={events} />
            </ContentLayer>
            <OverlayLayer>
                <div></div>
            </OverlayLayer>
        </section>
    )
}