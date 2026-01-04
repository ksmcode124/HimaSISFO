import { LOCALE } from "./Calculate";

export function formatDate(date?: string | Date) {
  if (!date) return '-'; // fallback kalau date kosong
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '-'; // fallback kalau date invalid
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(dateObj);
}
export function formatMonthName(month: number) {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "long",
  }).format(new Date(2000, month, 1));
}

export function formatYear(year: number) {
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
  }).format(new Date(year, 0, 1));
}
  