
import {
  ContentLayer,
  OverlayLayer,
  DecorationLayer,
} from "@/components/layout/Layer";
import { CalendarOverlay } from "../components/layer/OverlayLayer"
import { CalendarContent } from "../components/layer/ContentLayer"
import { CalendarDecoration } from "../components/layer/DecorationLayer"
import { getEvents } from "../services/eventService";
export async function CalendarSection() {
  const events = await getEvents();
  return (
    <section className="relative p-0 m-0 items-center justify-center">
      <DecorationLayer className="px-0">
        <CalendarDecoration />
      </DecorationLayer>
      <ContentLayer className="px-1 md:px-20 xl:px-60 pb-30">
        <CalendarContent events={events} />
      </ContentLayer>
      <OverlayLayer className="px-5 justify-center">
        <CalendarOverlay />
      </OverlayLayer>
    </section>
  );
}
