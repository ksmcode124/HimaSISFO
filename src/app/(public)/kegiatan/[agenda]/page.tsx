import { EventListSection } from "@/features/kegiatan/sections/EventListSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ bulan?: string }>
}) {
  const { bulan } = await searchParams;
  return (
    <>
      <BackgroundLayer>
        <RoundedBg align="start" />
        <RoundedBg align="end" />
      </BackgroundLayer>
      <div className="relative flex-col items-start mt-10">
        <EventListSection filter={bulan} />
      </div>
    </>

  );
}