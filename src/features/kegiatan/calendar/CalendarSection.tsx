import { ShellLayer } from "@/components/layout/ShellLayer";
import {
  BaseLayer,
  OverlayLayer,
  DecorationLayer,
} from "@/components/layout/Layer";
import { CalendarOverlay } from "./CalendarOverlay"
import { CalendarBase } from "./CalendarBase"
import { CalendarDecoration } from "./CalenderDecoration"

export function CalendarSection() {
  return (
    <section className="p-0 m-0 items-center justify-center">
      <ShellLayer>
        <OverlayLayer className="px-5 border-2 border-accent justify-center w-full h-fit">
          <CalendarOverlay/>
        </OverlayLayer>
        <BaseLayer className="px-5 md:px-40 border-amber-200 border-2 w-full h-fit pb-30">
          <CalendarBase/>
        </BaseLayer>
        <DecorationLayer className="px-0 border-2 border-secondary w-full bg-amber-300 py-5">
          <CalendarDecoration/>
        </DecorationLayer>
      </ShellLayer>
    </section>
  );
}
