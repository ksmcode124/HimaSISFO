import { BackgroundLeft } from "../../../../../public/assets/kegiatan/background/Left";
import { BackgroundRight } from "../../../../../public/assets/kegiatan/background/Right";
export function CalendarDecoration() {
    return (
        <>
            <BackgroundLeft className="absolute rotate-[20.55deg] top-0 sm:top-[-400px] left-[-120px]" />
            <BackgroundRight className="absolute top-0 sm:top-[-400px] right-0" />
        </>
    );
}

export function EventCardDecoration() {
    return (
        <div className="h-full bg-gradient-to-b from-[#486EAB] to-[#EDF3F6] border-2 border-accent">ini dekorasi</div>
    );
}
