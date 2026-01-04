// services/eventService.ts
import { EventCardProps } from "../types";
import { EVENTS } from "../data/events"

async function fetchFromApi(): Promise<EventCardProps[]> {
  const res = await fetch("https://api.example.com/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  const data = await res.json();
  return data;
}

export async function getEvents(): Promise<EventCardProps[]> {
  try {
    const data = await fetchFromApi();
    if (!data.length) return EVENTS;
    return data;
  } catch {
    return EVENTS;
  }
}
