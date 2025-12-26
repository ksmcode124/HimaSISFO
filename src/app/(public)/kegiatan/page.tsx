"use client"
import { EventCard } from "@/features/kegiatan/comp/card/EventCard";

export default function Page() {
  return (
    <div className="grid grid-cols-4 ">
     <EventCard
      variant="onGoing"
      title="Workshop React"
      img="/img/react.png"
      date="20 Jan 2025"
      countDown={3}
      className="col-span-2"
    />
    <EventCard
      variant="notGoing"
      title="Workshop Next.js"
      img="/img/nextjs.png"
      date="25 Jan 2025"
      className="col-span-1"
    />
    <EventCard
      variant="detail"
      title="Workshop Vue"
      img="/img/vue.png"
      date="30 Jan 2025"
      description="Learn the basics of Vue.js"
      navigation="/events/vue"
      className="col-span-1"
    />
    </div>
  );
}
