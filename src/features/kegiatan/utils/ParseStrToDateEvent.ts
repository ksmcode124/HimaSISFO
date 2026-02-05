import { EventCardProps } from "../types";

export function normalizeEvent(event: EventCardProps): EventCardProps {
  return {
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    img: event.img,
    description: event.description?.replace(/<\/?[^>]+(>|$)/g, "") ?? null,
    type: event.type,
  };
}
