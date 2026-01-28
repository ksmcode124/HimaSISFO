import { FindEventByIdProps  } from "../types";
import { FindEventByMonthYearProps } from "../types";
import { sortByDate } from "./SortEvent";

export function findEventByMonthYear({ month, year, indexedEvents }: FindEventByMonthYearProps) {

  const searchKey = `${month}-${year}`;
  const dataUrut = sortByDate(indexedEvents[searchKey] || []);
  return dataUrut;
}

export function findEventById({ id, indexedEvents }: FindEventByIdProps) {
  return Object.values(indexedEvents).flat().find(event => event.id === id);
}