import { stripTime } from "./Date";

export function normalizeTime(date: Date): number {
  const d = new Date(date);

  // Kalau mulai tepat jam 00:00 → mundur 1 hari
  if (
    d.getHours() === 0 &&
    d.getMinutes() === 0 &&
    d.getSeconds() === 0
  ) {
    d.setDate(d.getDate() - 1);
  }

  return stripTime(d).getTime();
}
