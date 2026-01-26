import { LOCALE } from "../data/constant";

export function formatDate(date?: string | Date, option?: string) {
  if (!date) return "-"; // fallback kalau date kosong
  if (!option) return "-"; // fallback kalau option kosong
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "-"; // fallback kalau date invalid
  if (option === "numeric")
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(dateObj);
  if (option === "name")
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  if (option === "fullDate")
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
}

export function formatMonthName(month: number) {
  const validMonth = Math.min(11, Math.max(0, month)); // clamp 0–11
  return new Intl.DateTimeFormat(LOCALE, { month: "long" }).format(new Date(2000, validMonth, 1));
}


export function formatYear(year: number) {
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
  }).format(new Date(year, 0, 1));
}
