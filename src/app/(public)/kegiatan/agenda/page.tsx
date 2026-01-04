import { EventListSection } from "@/features/kegiatan/sections/EventListSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";

export default function Page() {
  return (
    <>
      <BackgroundLayer>
        <RoundedBg align="start" />
        <RoundedBg align="end" />
      </BackgroundLayer>
      <div className="relative flex-col items-start">
        <EventListSection />
      </div>
    </>

  );
}