import { EventCardProps } from "../types";

// Fungsi ini hanya dijalankan SEKALI untuk memproses seluruh data
export function createEventIndex(events: EventCardProps[]) {
  const eventMap: Record<string, EventCardProps[]> = {};

  events.forEach((event) => {
    const d = new Date(event.start);
    if (isNaN(d.getTime())) return;

    const monthName = d.toLocaleString('id-ID', { month: 'long' }); 
    const year = d.getFullYear();
    const key = `${monthName}-${year}`;

    if (!eventMap[key]) {
      eventMap[key] = [];
    }
    eventMap[key].push(event);
  });
  return eventMap;
}

export function createEventIndexByNameDate(events: EventCardProps[]) {
  const eventMap: Record<string, EventCardProps[]> = {};

  events.forEach((event) => {
    const { id } = event;
    const key = `${id}`;

    if (!eventMap[key]) {
      eventMap[key] = [];
    }
    eventMap[key].push(event);
  });
  return eventMap;
}

