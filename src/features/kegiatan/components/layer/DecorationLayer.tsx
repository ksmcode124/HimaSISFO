import { BackgroundLeft } from "../../../../../public/assets/kegiatan/background/Left";
import { BackgroundRight } from "../../../../../public/assets/kegiatan/background/Right";
export function CalendarDecoration() {
    return (
        <div className="w-full overflow-hidden">
            <BackgroundLeft className="absolute" />
            <BackgroundRight className="absolute  " />
        </div>
    );
}

export function EventCardDecoration() {
    return (
        <div className="h-full bg-gradient-to-b from-[#486EAB] to-[#EDF3F6] border-2 border-accent">ini dekorasi</div>
    );
}
