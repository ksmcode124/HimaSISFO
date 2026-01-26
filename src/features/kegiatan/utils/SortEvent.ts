import { EventWithVariantProps, SortedSingleEventsProps } from "../types";
import { EventCardProps } from "../types";
import { toDateKey } from "./Calculate";

function getDayRange(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function sortEventsByDay(events: EventCardProps[], day: Date) {
  const { start: dayStart, end: dayEnd } = getDayRange(day);

  return [...events].sort((a, b) => {
    const aActive =
      a.start.getTime() <= dayEnd.getTime() &&
      a.end.getTime() >= dayStart.getTime();

    const bActive =
      b.start.getTime() <= dayEnd.getTime() &&
      b.end.getTime() >= dayStart.getTime();

    // event yang sedang berlangsung selalu di atas
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;

    // urutkan berdasarkan start paling awal
    return a.start.getTime() - b.start.getTime();
  });
}

// untuk event pass, ongoing, future
export function sortEvents(
  events: EventWithVariantProps[],
): SortedSingleEventsProps {
  const now = new Date();

  const pastNotGoing = events
    .filter((e) => e.start < now)
    .sort((a, b) => b.start.getTime() - a.start.getTime())[0];

  const nextOnGoing = (() => {
    const next = events
      .filter((e) => e.start > now)
      .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

    return next
      ? events.filter((e) => toDateKey(e.start) === toDateKey(next.start))
      : [];
  })();

  const futureNotGoing = nextOnGoing
    ? events
        .filter((e) => e.start > nextOnGoing[0].start)
        .sort((a, b) => a.start.getTime() - b.start.getTime())[0]
    : undefined;
  // console.log({ pastNotGoing, nextOnGoing, futureNotGoing });
  return { pastNotGoing, nextOnGoing, futureNotGoing };
}

export const sortByDate = (events: EventCardProps[]): EventCardProps[] => {
  return [...events].sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
};
