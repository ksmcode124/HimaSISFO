import { Dice1 } from "lucide-react"
import DynamicCalendar from "../Calendar"
import { EventCard } from "../EventCard"
export function CalendarContent() {
  return (
    <div className="relative flex flex-col gap-5 border-2 border-yellow-500">
      <h1 className="py-5 md:py-4 md:py-10 text-xl text-center border-amber-200 border-2">
        Kalender
      </h1>
      <DynamicCalendar className="border-red-500 border-2" />
      <div className="p-5 border-2 border-accent">
        <h2>Keterangan</h2>
        <p>Ini adalah keterangan untuk kalender.</p>
      </div>
    </div>
  )
}

export function EventCardContent() {
  return (
    <div className="relative flex flex-col gap-2 md:gap-5 border-2 border-green-500">
      <h1 className="w-full text-center">
        Agenda
      </h1>
      <div className="grid md:grid-cols-[285fr_479fr_285fr] grid-cols-[109fr_129fr_109fr] gap-3 md:gap-8">
        <div>
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10">Sebelum</h2>
          <EventCard
            variant="notGoing"
            title="Workshop Next.js"
            img="/img/nextjs.png"
            date="25 Jan 2025"
          />
        </div>
        <div>
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10">Berikutnya</h2>
          <EventCard
            variant="onGoing"
            title="Workshop React"
            img="/img/react.png"
            date="20 Jan 2025"
            countDown={3}
          />
        </div>
        <div>
          <h2 className="h-fit w-full text-center uppercase py-5 md:py-10">Mendatang</h2>
          <EventCard
            variant="detail"
            title="Workshop Vue"
            img="/img/vue.png"
            date="30 Jan 2025"
            description="Learn the basics of Vue.js"
            navigation="/events/vue"
          />
        </div>
      </div>
    </div>

  )
}