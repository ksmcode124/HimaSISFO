
import { EventDetailContent } from "../components/layer/ContentLayer"
import { getEvents } from "../services/eventService";
import { ContentLayer } from "@/components/layout/Layer";
export async function EventDetailSection({id} : {id: string}) {
    const events = await getEvents();
    return (
        <section className="relative p-0 m-0 top-0">
            <ContentLayer className="mx-10 md:mx-30">
                <EventDetailContent events={events} search={id} />
            </ContentLayer>
        </section>
    )
}