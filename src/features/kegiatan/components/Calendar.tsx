

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";

/* =========================
   TYPES
========================= */

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date; // "YYYY-MM-DD"
  type?: "meeting" | "workshop" | "other";
}

/* =========================
   CONSTANTS
========================= */

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EVENT_TYPE_COLOR: Record<string, string> = {
  meeting: "bg-blue-500",
  workshop: "bg-green-500",
  other: "bg-purple-500",
};

const LOCALE = "id-ID";

/* =========================
   DATE HELPERS (LOCAL TIME)
========================= */

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDayIndex = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const days: {
    day: number;
    isCurrentMonth: boolean;
    dateObj: Date;
  }[] = [];

  let dayCounter = 1;
  let nextMonthDay = 1;

  for (let i = 0; i < 42; i++) {
    if (i < startDayIndex) {
      const day = prevLastDay - (startDayIndex - i - 1);
      days.push({
        day,
        isCurrentMonth: false,
        dateObj: new Date(year, month - 1, day),
      });
    } else if (dayCounter <= totalDays) {
      days.push({
        day: dayCounter,
        isCurrentMonth: true,
        dateObj: new Date(year, month, dayCounter),
      });
      dayCounter++;
    } else {
      days.push({
        day: nextMonthDay,
        isCurrentMonth: false,
        dateObj: new Date(year, month + 1, nextMonthDay),
      });
      nextMonthDay++;
    }
  }

  return days;
}

function formatMonthName(month: number) {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "long",
  }).format(new Date(2000, month, 1));
}

function formatYear(year: number) {
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
  }).format(new Date(year, 0, 1));
}

/* =========================
   EVENT MAPPING (SAFE)
========================= */

function mapEventsByDate(events: CalendarEvent[] = []) {
  const map: Record<string, CalendarEvent[]> = {};

  events.forEach(event => {
    if (!event?.date) return;

    const key = toDateKey(event.date);

    if (!map[key]) map[key] = [];
    map[key].push(event);
  });

  return map;
}


/* =========================
   COMPONENT
========================= */

interface DynamicCalendarProps {
  className?: string;
  events?: CalendarEvent[];
}

export default function DynamicCalendar({
  className,
  events = [],
  
}: DynamicCalendarProps) {

  const today = new Date();

  const initialDate = events.length
    ? (() => {
      const firstEvent = events
        .map(e => e.date)
        .sort((a, b) => a.getTime() - b.getTime())[0];

      return firstEvent;
    })()
    : today;

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());


  const daysGrid = useMemo(
    () => getMonthDays(year, month),
    [year, month]
  );

  const eventsByDate = useMemo(
    () => mapEventsByDate(events),
    [events]
  );
  // console.log("events:", events);
  const goPrevMonth = () => {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else setMonth(m => m - 1);
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

useEffect(() => {
  if (!events.length) return;

  const today = new Date();

  const closestEvent = events
    .map(e => new Date(e.date))
    .sort((a, b) =>
      Math.abs(a.getTime() - today.getTime()) -
      Math.abs(b.getTime() - today.getTime())
    )[0];

  setYear(closestEvent.getFullYear());
  setMonth(closestEvent.getMonth());
}, [events]);
  return (
    <div className={clsx(className, "w-full py-4 px-2 md:px-4 bg-white rounded-lg shadow")}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
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
                      <div className="flex">
                        <div
                          className={clsx(
                            "flex items-center justify-center m-1 md:m-2",
                            isToday ? "bg-[#3978FF] rounded-full w-6 h-6 md:w-7 md:h-7 text-[#fff]" : "text-[#000000]"
                          )}
                        >
                          {day}
                        </div>

                        {/* <div className="mt-1 flex flex-wrap">
                          {dayEvents.map(ev => (
                            <div
                              key={`${ev.id}-${ev.date}`}
                              className=" rounded bg-purple-100 text-purple-700 truncate"
                              title={ev.title}
                            >
                              {ev.title}
                            </div>
                          ))}
                        </div> */}

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