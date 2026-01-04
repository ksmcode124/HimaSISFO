
import { EventCardProps } from "../types";
import { MONTHS_NAME  } from "./Calculate";
export type EventVariant = "detail" | "onGoing" | "notGoing";

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

export function FindEventByMonthYear(month: string, year: number, events: any[]) {
  if (!events) return [];
  
  return events.filter(event => {
    const dateObj = new Date(event.date);
    if (isNaN(dateObj.getTime())) return false;

    const eventMonthName = MONTHS_NAME[dateObj.getMonth()];
    const eventYear = dateObj.getFullYear();

    return (
      eventMonthName?.toLowerCase() === month.toLowerCase() && 
      eventYear === year
    );
  });
}