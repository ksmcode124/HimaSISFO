
"use client"
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { WEEK_DAYS, toDateKey, getMonthDays } from "../utils/Calculate";
import { formatMonthName, formatYear } from "../utils/FormatDate"
import { DynamicCalendarProps } from "../types";

export default function DynamicCalendar({
  className,
  events,
}: DynamicCalendarProps) {

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysGrid = useMemo(() => getMonthDays(year, month), [year, month]);
  const eventsByDate = useMemo(() => {
  const map: Record<string, typeof events> = {};

  (events || []) 
    .filter(e => {
      const date = e.date instanceof Date ? e.date : new Date(e.date);
      return date.getFullYear() === year && date.getMonth() === month;
    })
    .forEach(event => {
      const key = toDateKey(event.date);
      if (!map[key]) map[key] = [];
      map[key].push(event);
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

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };
  return (
    <div className={clsx(className, "w-full py-4 px-2 md:px-4 bg-white rounded-lg shadow")}>
      <div className="flex flex-row w-full items-center justify-between my-5">
        <h2 className="text-[20px] md:text-xl font-medium md:font-bold">
          {String(formatMonthName(month))}, {String(formatYear(year))}
        </h2>
        <div className="flex border-3 border-[#323257] rounded overflow-hidden">
          <button onClick={goPrevMonth} className="p-1 border-r-3 border-[#323257]">
            <ChevronLeft />
          </button>
          <button onClick={goToday} className="w-[100px] md:w-[116px] py-2 font-bold text-sm uppercase">
            {String(formatMonthName(month)).slice(0, 3)} {String(formatYear(year))}
          </button>
          <button onClick={goNextMonth} className="p-1 border-l-3 border-[#323257]">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* CALENDAR */}
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr>
            {WEEK_DAYS.map(day => (
              <th key={day} className="border border-[#fff] bg-[#6482A6] pl-2 py-1 text-white text-left font-medium text-[12px] md:text-sm uppercase">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, weekIdx) => (
            <tr key={weekIdx}
              className="h-[80px] md:h-[125px]"
            >
              {daysGrid
                .slice(weekIdx * 7, weekIdx * 7 + 7)
                .map(({ day, isCurrentMonth, dateObj }) => {
                  const key = toDateKey(dateObj);
                  const dayEvents = eventsByDate[key] || [];
                  // console.log("dayEvents for", key, ":", dayEvents);
                  const isToday = key === toDateKey(today);
                  return (
                    <td
                      key={key}
                      className={clsx(
                        "border border-[#fff] text-[16px] md:text-sm w-[45px] align-top",
                        isCurrentMonth ? "bg-[#99B6D9]" : "bg-[#B3C9E4]"
                      )}
                    >
                      <div className="flex flex-col w-fit">
                        <div
                          className={clsx(
                            "flex items-start justify-start m-1 md:m-2 w-fit",
                            isToday ? "bg-[#3978FF] rounded-full w-6 h-6 md:w-7 md:h-7 text-[#fff]" : "text-[#000000]"
                          )}
                        >
                          {day}
                        </div>

                        <div className="mt-1 flex flex-wrap w-fit">
                          {dayEvents.map(ev => (
                            <div
                              key={`${ev.id}-${ev.date}`}
                              className=" rounded bg-purple-100 text-purple-700 truncate"
                              title={ev.title}
                            >
                              {ev.title}
                            </div>
                          ))}
                        </div>

                      </div>
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}