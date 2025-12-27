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
      <ShellLayer>
        <OverlayLayer className="px-5 border-2 border-accent justify-center">
          <CalendarOverlay/>
        </OverlayLayer>
        <ContentLayer className="px-5 md:px-40 border-amber-200 border-2 pb-30">
          <CalendarContent/>
        </ContentLayer>
        <DecorationLayer className="px-0 border-2 border-secondary w-full bg-amber-300 py-5">
          <CalendarDecoration/>
        </DecorationLayer>
      </ShellLayer>
    </section>
  );
}
