export const dynamic = 'force-dynamic'
import { CalendarSection } from "@/features/kegiatan/sections/CalendarSection";
import { EventCardSection } from "@/features/kegiatan/sections/EventCardSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";
import Image from "next/image";
import { CalendarLeftDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../public/assets/kegiatan/decoration/CalendarRight";
import { Suspense} from "react";
import { Skeleton } from "@/components/ui/skeleton";

function PitaDecoration() {
  return (
    <div className="relative w-full aspect-5/1 pointer-events-none">
      <Image
        src="/assets/kegiatan/Pita.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

interface PageProps {
  searchParams: { tahun?: string };
}
export default function Page({ searchParams }: PageProps) {
  const tahun = searchParams.tahun || new Date().getFullYear().toString();
  return (
    <>
      <BackgroundLayer>
        <div className="w-full overflow-hidden">
          <CalendarLeftDecoration className="absolute h-fit top-1/100 opacity-25" />
          <CalendarRightDecoration className="absolute h-fit top-1/100 opacity-25" />
        </div>
        <RoundedBg align="start" />
        <RoundedBg align="end" />
      </BackgroundLayer>
      <div className="relative flex-col items-start mt-28">
        <Suspense fallback={<Skeleton className="w-full h-1/2 md:w-2/3 aspect-square mx-auto"/>}>
          <CalendarSection tahun={tahun} />
        </Suspense>
        <PitaDecoration />
        <Suspense fallback={<Skeleton className="w-full h-1/2 md:w-2/3 aspect-square mx-auto"/>}>
          <EventCardSection tahun={tahun} />
        </Suspense>
      </div>
    </>
  );
}
