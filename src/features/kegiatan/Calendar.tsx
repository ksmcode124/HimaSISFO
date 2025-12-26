"use client";

import React, { useEffect, useMemo, useState } from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EVENT_COLORS = [
  "bg-pink-500",
  "bg-blue-400",
  "bg-green-600",
  "bg-orange-500",
  "bg-gray-600",
  "bg-purple-600",
  "bg-yellow-500",
];

const LOCALE = "id-ID";
const TZ = "UTC";

/* =========================
   DATE HELPERS (SSR SAFE)
========================= */

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(Date.UTC(year, month, 1));
  const lastDay = new Date(Date.UTC(year, month + 1, 0));

  const startDayIndex = firstDay.getUTCDay(); // Sun = 0
  const totalDays = lastDay.getUTCDate();

  const prevLastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const daysGrid: {
    day: number;
    isCurrentMonth: boolean;
    dateObj: Date;
  }[] = [];

  let dayCounter = 1;
  let nextMonthDayCounter = 1;

  for (let i = 0; i < 42; i++) {
    if (i < startDayIndex) {
      const day = prevLastDay - (startDayIndex - i - 1);
      daysGrid.push({
        day,
        isCurrentMonth: false,
        dateObj: new Date(Date.UTC(year, month - 1, day)),
      });
    } else if (dayCounter <= totalDays) {
      daysGrid.push({
        day: dayCounter,
        isCurrentMonth: true,
        dateObj: new Date(Date.UTC(year, month, dayCounter)),
      });
      dayCounter++;
    } else {
      daysGrid.push({
        day: nextMonthDayCounter,
        isCurrentMonth: false,
        dateObj: new Date(Date.UTC(year, month + 1, nextMonthDayCounter)),
      });
      nextMonthDayCounter++;
    }
  }

  return daysGrid;
}

function formatDateRange(year: number, month: number) {
  const start = new Date(Date.UTC(year, month, 1));
  const end = new Date(Date.UTC(year, month + 1, 0));

  const fmt = new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  });

  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

function formatMonthTitle(year: number, month: number) {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(Date.UTC(year, month)));
}

function getWeekNumber(date: Date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/* =========================
   RANDOM EVENTS (CLIENT ONLY)
========================= */

function generateEvents(
  daysGrid: Array<{ dateObj: Date; isCurrentMonth: boolean }>
) {
  const events: Record<string, string[]> = {};

  daysGrid.forEach(({ dateObj, isCurrentMonth }) => {
    if (!isCurrentMonth) return;

    const count = Math.floor(Math.random() * 4);
    if (count === 0) return;

    const picked = new Set<number>();
    while (picked.size < count) {
      picked.add(Math.floor(Math.random() * EVENT_COLORS.length));
    }

    events[dateObj.toISOString()] = Array.from(picked).map(i => EVENT_COLORS[i]);
  });

  return events;
}

/* =========================
   COMPONENT
========================= */

export default function DynamicCalendar() {
  const [today] = useState(() => new Date());

  const [year, setYear] = useState(today.getUTCFullYear());
  const [month, setMonth] = useState(today.getUTCMonth());

  const daysGrid = useMemo(() => getMonthDays(year, month), [year, month]);

  const [events, setEvents] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setEvents(generateEvents(daysGrid));
  }, [daysGrid]);

  const weekNum = getWeekNumber(new Date(Date.UTC(year, month, today.getUTCDate())));

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
    setYear(today.getUTCFullYear());
    setMonth(today.getUTCMonth());
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-bold mb-1">{formatMonthTitle(year, month)}</h2>
        <nav className="flex border rounded-lg overflow-hidden my-4">
          <button onClick={goPrevMonth} className="px-4 py-2 border-r">←</button>
          <button onClick={goToday} className="flex-grow text-center">Today</button>
          <button onClick={goNextMonth} className="px-4 py-2 border-l">→</button>
        </nav>
      </div>


      <table className="w-full text-sm border-collapse border">
        <thead>
          <tr>
            {WEEK_DAYS.map(d => (
              <th key={d} className="text-start border py-2 text-gray-500">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {daysGrid.slice(weekIdx * 7, weekIdx * 7 + 7).map(({ day, isCurrentMonth, dateObj }) => {
                const isToday =
                  dateObj.toDateString() === today.toDateString();

                return (
                  <td
                    key={dateObj.toISOString()}
                    className={`border py-6 text-start ${isCurrentMonth ? "text-gray-900" : "text-gray-400"
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-purple-600 text-white" : ""
                          }`}
                      >
                        {day}
                      </div>
                      <div className="flex mt-1 space-x-1">
                        {(events[dateObj.toISOString()] || []).map((c, i) => (
                          <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
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
