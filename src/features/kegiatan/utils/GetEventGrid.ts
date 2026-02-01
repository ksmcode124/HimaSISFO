import { differenceInCalendarDays } from "date-fns";

export function getEventGridPosition(
  eventStart: Date,
  eventEnd: Date,
  weekStartDate: Date
) {
  const startOffset =
    Math.max(0, differenceInCalendarDays(eventStart, weekStartDate));

  const endOffset =
    Math.min(6, differenceInCalendarDays(eventEnd, weekStartDate));

  if (endOffset < 0 || startOffset > 6) return null;

  const colStart = startOffset * 2 + 1;
  const colSpan = (endOffset - startOffset) * 2 + 1;

  return { colStart, colSpan };
}
