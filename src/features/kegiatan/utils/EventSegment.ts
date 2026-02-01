import { stripTime } from "./Date";

export type EventSegment = "single" | "head" | "body" | "tail" | "body-right" | "body-left";

export function getEventSegment(
  eventStart: Date,
  eventEnd: Date,
  currentDay: Date,
  IDBIndex: number
): EventSegment | null {
  const start = stripTime(eventStart);
  const end = stripTime(eventEnd);
  const current = stripTime(currentDay);
  if (current < start || current > end) return null;

  if (start.getTime() === end.getTime()) return "single";
  if (current.getTime() === start.getTime()) return "head";
  if (current.getTime() === end.getTime()) return "tail";
  if ((IDBIndex + 1) % 7 === 0) return "body-right";
  if ((IDBIndex + 1) % 7 === 1) return "body-left";
  return "body";
}
