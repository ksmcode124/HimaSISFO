import { EventDetailSection } from "@/features/kegiatan/sections/EventDetailSection";
import { BackgroundLayer } from "@/components/layout/Layer";
import { RoundedBg } from "@/features/kegiatan/components/RoundedBg";

export default async function Page({ params }: { params: Promise<{ detail: string }> }) {
    const { detail } = await params;
    return (
        <>
            <div className="relative flex-col items-start mt-10">
                <BackgroundLayer>
                    <RoundedBg align="start" />
                    <RoundedBg align="end" />
                </BackgroundLayer>
                <EventDetailSection id={detail} />
            </div>
        </>
    )
}