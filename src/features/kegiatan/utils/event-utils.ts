import { CalendarEvent } from "../data/events";

export function splitEventsByDate(events: CalendarEvent[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const past: CalendarEvent[] = [];
  const future: CalendarEvent[] = [];

  events.forEach(e => {
    const d = new Date(e.date);
    d.setHours(0, 0, 0, 0);

    if (d < today) past.push(e);
    else future.push(e);
  });

  past.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  future.sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return {
    before: past[0] || null,
    next: future[0] || null,
    upcoming: future.slice(1, 2),
  };
}
