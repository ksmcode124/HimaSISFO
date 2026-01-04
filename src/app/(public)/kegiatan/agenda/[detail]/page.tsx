import { EventDetailSection } from "@/features/kegiatan/sections/EventDetailSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ detail: string }> }) {
    return (
        <>
            <BackgroundLayer>
                <RoundedBg align="start" />
                <RoundedBg align="end" />
            </BackgroundLayer>
            <div className="relative flex-col items-start">
                <EventDetailSection searchKeyword={use(params).detail} />
            </div>
        </>
    )
}