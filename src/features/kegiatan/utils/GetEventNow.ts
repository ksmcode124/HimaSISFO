
import { EventCardProps, WithVariantEventCardProps } from "../types";
import { SortedSingleEventsProps } from "../types";
import { FindEventByIdProps  } from "../types";
import { FindEventByMonthYearProps } from "../types";

// untuk event pass, ongoing, future
export function sortEvents(events: WithVariantEventCardProps[]): SortedSingleEventsProps {
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

export const sortByDate = (events :EventCardProps[]): EventCardProps[] => {
  return [...events].sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
};

export function findEventByMonthYear({ month, year, indexedEvents }: FindEventByMonthYearProps) {

  const searchKey = `${month}-${year}`;
  const dataUrut = sortByDate(indexedEvents[searchKey] || []);
  return dataUrut;
}

export function findEventById({ id, indexedEvents }: FindEventByIdProps) {
  return Object.values(indexedEvents).flat().find(event => event.id === id);
}