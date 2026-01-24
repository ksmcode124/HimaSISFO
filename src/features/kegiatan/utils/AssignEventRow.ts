import { stripTime } from "./Date";

export function assignEventRows<T extends {
  start: Date;
  end: Date;
}>(events: T[]): (T & { row: number })[] {

  const rowsEnd: Date[] = [];
  const result: (T & { row: number })[] = [];

  // Urutkan berdasarkan start paling awal
  const sorted = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  for (const ev of sorted) {
    const start = stripTime(ev.start);
    const end = stripTime(ev.end);

    let rowIndex = -1;

    // Cari row yang sudah selesai sebelum event ini mulai
    for (let i = 0; i < rowsEnd.length; i++) {
      if (rowsEnd[i].getTime() < start.getTime()) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      rowsEnd.push(end);
      rowIndex = rowsEnd.length - 1;
    } else {
      rowsEnd[rowIndex] = end;
    }

    result.push({ ...ev, row: rowIndex });
  }

  return result;
}
