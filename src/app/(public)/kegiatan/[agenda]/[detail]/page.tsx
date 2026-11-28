import { EventDetailSection } from "@/features/kegiatan/sections/eventDetailSection";
import { BackgroundLayer } from "@/components/layout/layer";
import { RoundedBg } from "@/features/kegiatan/components/roundedBg";
import { CalendarLeftDecoration } from "../../../../../../public/assets/kegiatan/decoration/calendarLeft";
import { CalendarRightDecoration } from "../../../../../../public/assets/kegiatan/decoration/calendarRight";

export default async function Page({ params }: { params: Promise<{ detail: string }> }) {
    const { detail } = await params;
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
                <EventDetailSection id={detail} />
            </div>
        </>

    )
}