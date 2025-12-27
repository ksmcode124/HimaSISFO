import DynamicCalendar from "../Calendar"

export function CalendarContent() {
  return (
    <div className="relative flex flex-col gap-5 border-2 border-yellow-500">
      <h1 className="py-4 md:py-10 text-xl text-center border-amber-200 border-2">
        Kalender
      </h1>
      <DynamicCalendar className="border-red-500 border-2"/>
      <div className="p-5 border-2 border-accent">
        <h2>Keterangan</h2>
        <p>Ini adalah keterangan untuk kalender.</p>
      </div>
    </div>
  )
}
