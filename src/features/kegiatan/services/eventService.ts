// services/eventService.ts
import { EventCardProps } from "../types";
import { normalizeEvent } from "../utils/ParseStrToDateEvent";
import { api } from "@/lib/services/api";


//atur fetch woi BE
export async function getEvents(tahun : string): Promise<EventCardProps[]> {

  const res  = await api.get(
    `/api/display/event?from=${tahun}-01-01&to=${tahun}-12-31`,
  );

  if (!res) {
    throw new Error("API error");
  }
  return res.data.map(normalizeEvent);
}
