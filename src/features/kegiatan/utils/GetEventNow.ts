
import { EventCardProps } from "../types";

export interface EventWithVariant extends EventCardProps {
  date: Date;
}

export interface SortedSingleEvents {
  pastNotGoing?: EventWithVariant;
  nextOnGoing?: EventWithVariant;
  futureNotGoing?: EventWithVariant;
}


export function toEventsWithVariant(events: EventCardProps[]): EventWithVariant[] {
  return events.map(e => ({
    ...e,
    date: e.date instanceof Date ? e.date : new Date(e.date),
  }));
}

// untuk event pass, ongoing, future
export function sortEvents(events: EventWithVariant[]): SortedSingleEvents {
  const now = new Date();

  const pastNotGoing = events
    .filter(e => e.date < now)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  const nextOnGoing = events
    .filter(e => e.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  const futureNotGoing = events
    .filter(e => e.date > nextOnGoing.date)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  return { pastNotGoing, nextOnGoing, futureNotGoing };
}

export function FindEventByMonthYear(
  month: string, 
  year: number, 
  indexedEvents: Record<string, any[]>
) {
  
  const searchKey = `${month}-${year}`;
  
  return indexedEvents[searchKey] || [];
}

export function findEventById(
  id : number,
  indexedEvents: Record<string, any[]>
) {
  return Object.values(indexedEvents).flat().find(event => event.id === id);
}