// services/eventService.ts
import { EventCardProps } from "../types";
import { EVENTS } from "../data/events";
import { normalize } from "path";
import { normalizeEvent } from "../utils/ParseStrToDateEvent";

//atur fetch woi BE
async function fetchFromApi(tahun : string): Promise<EventCardProps[]> {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";


  const res = await fetch(
    `${baseUrl}/api/display/event?from=${tahun}-01-01&to=${tahun}-12-31`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("API error");
  }

  const data = await res.json();
  return data.map(normalizeEvent);
}

export async function getEvents(tahun: string): Promise<EventCardProps[]> {
  try {
    const data = await fetchFromApi(tahun);
    console.log("API DATA:", data);
    return data;
  } catch (error) {
    console.error("API failed, fallback to dummy", error);
    return EVENTS;
  }
}
