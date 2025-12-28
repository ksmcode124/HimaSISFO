import { 
    DecorationLayer, 
    ContentLayer, 
    OverlayLayer, 
    ModalLayer
 } from '@/components/layout/Layer'
import { EventCardContent } from '../components/layer/ContentLayer'
import { EventCardDecoration } from '../components/layer/DecorationLayer'
export function EventCardSection() {
    return (
        <section className="relative">
            <DecorationLayer className="h-[231px] md:h-[617px] mt-35 md:mt-60">
                <EventCardDecoration />
            </DecorationLayer>
            <ContentLayer className="px-5 md:px-40 pb-30">
                <EventCardContent />
            </ContentLayer>
            <OverlayLayer>
                <div></div>
            </OverlayLayer>
            <ModalLayer>
                <div></div>
            </ModalLayer>
        </section>
    )
}