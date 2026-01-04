
import { EventDetailContent } from "../components/layer/ContentLayer"
import { getEvents } from "../services/eventService";
export async function EventDetailSection({searchKeyword} : {searchKeyword: string}) {
    const events = await getEvents();
    return (
        <section className="relative">
            <EventDetailContent events={events} search={searchKeyword} />
        </section>
    )
}