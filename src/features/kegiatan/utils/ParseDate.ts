export function parseEventDate(value: string | Date): Date {
  if (value instanceof Date) return value;

  // Sudah ada jam (anggap sudah niat)
  if (value.includes("T")) {
    return new Date(value);
  }

  // Tanggal saja → set ke local midnight
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0);
}
