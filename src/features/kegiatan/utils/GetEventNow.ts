
import { EventWithVariantProps } from "../types";
import { SortedSingleEventsProps } from "../types";
import { FindEventByIdProps  } from "../types";
import { FindEventByMonthYearProps } from "../types";

// untuk event pass, ongoing, future
export function sortEvents(events: EventWithVariantProps[]): SortedSingleEventsProps {
  const now = new Date();

  const pastNotGoing = events
    .filter(e => e.start < now)
    .sort((a, b) => b.start.getTime() - a.start.getTime())[0];

  const nextOnGoing = events
    .filter(e => e.start >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

  const futureNotGoing = events
    .filter(e => e.start > nextOnGoing.start)
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

  return { pastNotGoing, nextOnGoing, futureNotGoing };
}

export function findEventByMonthYear({ month, year, indexedEvents }: FindEventByMonthYearProps) {

  const searchKey = `${month}-${year}`;
  
  return indexedEvents[searchKey] || [];
}

export function findEventById({ id, indexedEvents }: FindEventByIdProps) {
  return Object.values(indexedEvents).flat().find(event => event.id === id);
}