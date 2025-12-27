import { ShellLayer } from "@/components/layout/ShellLayer";
import {
  ContentLayer,
  OverlayLayer,
  DecorationLayer,
} from "@/components/layout/Layer";
import { CalendarOverlay } from "./CalendarOverlay"
import { CalendarContent } from "./CalendarContent"
import { CalendarDecoration } from "./CalenderDecoration"

export function CalendarSection() {
  return (
    <section className="p-0 m-0 items-center justify-center">
     <OverlayLayer className="px-5  justify-center">
          <CalendarOverlay/>
        </OverlayLayer>
        <ContentLayer className="px-5 md:px-40 pb-30">
          <CalendarContent/>
        </ContentLayer>
        <DecorationLayer className="px-0 ">
          <CalendarDecoration/>
        </DecorationLayer>
    </section>
  );
}
