import DynamicCalendar from "../Calendar"
export function CalendarContent() {
    return (
        <div className="relative border-2 border-red">
            <h1 className="text-xl text-center">Kalender</h1>
            <DynamicCalendar />
            <div className="p-5 h-fit">
                <h2>keterangan</h2>
                <p>Ini adalah keterangan untuk kalender.</p>
            </div>
        </div>
    )
}