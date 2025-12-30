
import {
  ContentLayer,
  OverlayLayer,
  DecorationLayer,
} from "@/components/layout/Layer";
import { CalendarOverlay } from "../components/layer/OverlayLayer"
import { CalendarContent } from "../components/layer/ContentLayer"
import { CalendarDecoration } from "../components/layer/DecorationLayer"

export function CalendarSection() {
  return (
    <section className="p-0 m-0 items-center justify-center">
      <DecorationLayer className="px-0 relative">
        <CalendarDecoration />
      </DecorationLayer>
      <ContentLayer className="px-5 md:px-60 pb-30">
        <CalendarContent />
      </ContentLayer>
      <OverlayLayer className="px-5 justify-center">
        <CalendarOverlay />
      </OverlayLayer>
    </section>
  );
}
