import { EventListSection } from "@/features/kegiatan/sections/EventListSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";
import { CalendarLeftDecoration } from "../../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../../public/assets/kegiatan/decoration/CalendarRight";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ bulan?: string; tahun?: string }>
}) {
  const { bulan} = await searchParams;
  return (
    <>
      <BackgroundLayer className="w-full h-screen">
        <div className="w-full overflow-hidden">
          <CalendarLeftDecoration className="absolute h-fit top-1/100 opacity-25" />
          <CalendarRightDecoration className="absolute h-fit top-1/100 opacity-25" />
        </div>
        <RoundedBg align="start" />
        <RoundedBg align="end" />
      </BackgroundLayer>
      <div className="relative flex-col items-start mt-28">
        <EventListSection filter={bulan}/>
      </div>
    </>

  );
}