
"use client"
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toDateKey, getMonthDays } from "../utils/Calculate";
import { formatMonthName, formatYear } from "../utils/FormatDate"
import { WEEK_DAYS } from "../data/constant";
import { DynamicCalendarProps } from "../types";
import { Modal } from "./PopUp";
import { parseEventDate } from "../utils/ParseDate";
import { sortEventsByDay } from "../utils/SortEvent";
import { getEventSegment } from "../utils/EventSegment";
import { getSegmentClass } from "../utils/EventClass";
import { FilterComp } from "./FilterComp";

export function DynamicCalendar({
  className,
  events,
}: DynamicCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | {
    title: string;
    start: Date;
    end: Date;
  }>(null);


  const daysGrid = useMemo(() => getMonthDays(year, month), [year, month]);
  const eventsByDate = useMemo(() => {
    const map: Record<string, typeof events> = {};

    (events || []).forEach(event => {
      const start = parseEventDate(event.start);
      const end = event.end
        ? parseEventDate(event.end)
        : start;

      // clone khusus untuk perhitungan tanggal
      const startDay = new Date(start);
      const endDay = new Date(end);

      startDay.setHours(0, 0, 0, 0);
      endDay.setHours(0, 0, 0, 0);

      for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
        if (
          d.getFullYear() !== year ||
          d.getMonth() !== month
        ) {
          continue;
        }

        const key = toDateKey(d);
        if (!map[key]) map[key] = [];
        map[key].push(event);
      }
    });

    return map;
  }, [events, year, month]);


  const goPrevMonth = () => {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else {
      const newMonth = month - 1;
      setMonth(newMonth);
    }
  };

  const goNextMonth = () => {
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else setMonth(m => m + 1);
  };
  // console.log(month, year)
  return (
    <div className={clsx(className, "w-full py-4 px-2 md:px-4 bg-white rounded-lg shadow")}>
      <div className="flex flex-row w-full items-center justify-between my-5">
        <h2 className="text-[20px] md:text-xl font-medium md:font-bold text-[var(--color-dark-blue)]">
          {String(formatMonthName(month))}, {String(formatYear(year))}
        </h2>
        <div className="relative flex flex-row border-3 border-[var(--color-dark-blue)] rounded">
          <button onClick={goPrevMonth} className="p-1 border-r-3 border-[var(--color-dark-blue)]">
            <ChevronLeft />
          </button>
          <FilterComp className="w-[100px] md:w-[140px] py-1 md:py-2 font-bold uppercase text-sm md:text-xl" type="calendar" selected={`${String(formatMonthName(month)).slice(0, 3)} ${Number(formatYear(year))}`} onChange={(month, year) => {
            setMonth(month-1);
            setYear(year as number);
          }}/>
          <button onClick={goNextMonth} className="p-1 border-l-3 border-[var(--color-dark-blue)]">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* CALENDAR */}
      <table className="border-collapse border text-sm w-full table-fixed">
        <thead>
          <tr>
            {WEEK_DAYS.map(day => (
              <th key={day} className="border border-[#fff] bg-[#6482A6] pl-2 py-1 text-white text-left font-medium text-[14px] md:text-md uppercase">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, weekIdx) => (
            <tr key={weekIdx}
            >
              {daysGrid
                .slice(weekIdx * 7, weekIdx * 7 + 7)
                .map(({ day, isCurrentMonth, dateObj }, idx) => {
                  const key = toDateKey(dateObj);
                  const dayEvents = eventsByDate[key];
                  const sortedEvents = sortEventsByDay(
                    dayEvents ?? [],
                    dateObj
                  );
                  // console.log(idx, day, sortedEvents)
                  const isToday = key === toDateKey(today);
                  return (
                    <td
                      key={key}
                      className={clsx(
                        "border border-[#fff] align-top",
                        isCurrentMonth ? "bg-[#99B6D9]" : "bg-[#B3C9E4]"
                      )}
                    >
                      <div className="flex flex-col items-start aspect-[12/14] md:aspect-[1/1]">
                        <div className="h-[45%] md:h-[35%] w-full flex justify-start items-start pl-1 md:pl-2 pt-1 md:pt-2">
                          <div
                            className={clsx(
                              "flex items-center justify-center font-medium leading-none text-[var(--color-dark-blue)]",
                              isCurrentMonth ?
                                "opacity-100" : "opacity-50",
                              isToday
                                ? "bg-[#3978FF] rounded-full w-5 h-5 md:w-8 md:h-8 text-white"
                                : ""
                            )}
                          >
                            {day}
                          </div>
                        </div>


                        <div className="flex flex-col w-full gap-[2px] md:gap-2 overflow-visible">
                          {sortedEvents?.map((ev) => {
                            const currentDay = new Date(year, month, day);
                            const segment = getEventSegment(
                              ev.start,
                              ev.end,
                              currentDay,
                              idx
                            );
                          
                            if (!segment) return null; return (
                              <div
                                key={`${ev.id}-${currentDay.toDateString()}`}
                                className={clsx(
                                  "text-[10px] md:text-sm font-bold h-[15px] md:h-[30px] truncate text-white flex items-center cursor-pointer",
                                  getSegmentClass(segment),
                                  ev.type === "Hima" && "bg-gradient-to-b from-[#1B3C53] to-[#456882]",
                                  ev.type === "Beasiswa" && "bg-gradient-to-b from-[#7F1D1D] to-[#DC2626]",
                                  ev.type === "Lomba" && "bg-gradient-to-b from-[#CA8A04] to-[#EAB308]"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(ev);
                                  setOpen(true);
                                }}
                              >
                                {(segment === "single" || segment === "head") && (
                                  <>
                                    {ev.title}
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </td>
                  );
                })}

            </tr>
          ))}
          {selectedEvent && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              event={{
                title: selectedEvent.title,
                start: selectedEvent.start,
                end: selectedEvent.end,
              }}
              type="calendar"
            />
          )}
        </tbody>
      </table>
    </div >
  );

}
