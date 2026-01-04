import { CalendarLeftDecoration} from "../../../../../public/assets/kegiatan/decoration/CalendarLeft";
import { CalendarRightDecoration } from "../../../../../public/assets/kegiatan/decoration/CalendarRight";
export function CalendarDecoration() {
    return (
        <div className="w-full overflow-hidden">
            <CalendarLeftDecoration className="absolute" />
            <CalendarRightDecoration className="absolute  " />
        </div>
    );
}

export function EventCardDecoration() {
    return (
        <div className="h-full bg-gradient-to-b from-[#486EAB] to-[#EDF3F6] ">ini dekorasi</div>
    );
}
