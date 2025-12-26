import DynamicCalendar from "../Calendar"
export function CalendarBase() {
    return (
        <div className="relative">
            <h1 className="py-15 md:py-30 text-xl text-center">Kalender</h1>
            <DynamicCalendar />
            <div className="p-5 border-2 border-gray-300 h-fit">
                <h2>keterangan</h2>
                <p>Ini adalah keterangan untuk kalender.</p>
            </div>
        </div>
    )
}