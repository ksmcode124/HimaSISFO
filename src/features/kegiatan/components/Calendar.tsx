"use client";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toDateKey, getMonthDays } from "../utils/Calculate";
import { formatMonthName, formatYear } from "../utils/FormatDate";
import { WEEK_DAYS } from "../data/constant";
import { DynamicCalendarProps, EventCardProps } from "../types";
import { Modal } from "./PopUp";
import { parseEventDate } from "../utils/ParseDate";
import { sortEventsByDay } from "../utils/SortEvent";
import { FilterComp } from "./FilterComp";

export function DynamicCalendar({ className, events }: DynamicCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [open, setOpen] = useState(false);
  type ModalState =
    | { mode: "single"; event: EventCardProps }
    | { mode: "multiple"; events: EventCardProps[] }
    | null;
  const [modalState, setModalState] = useState<ModalState>(null);

  const daysGrid = useMemo(() => {
    const days = getMonthDays(year, month);
    return days.length > 35 ? days.slice(0, 35) : days;
  }, [year, month]);

const eventsByDate = useMemo(() => {
  const map: Record<string, typeof events> = {};

  (events || []).forEach(event => {
    const start = parseEventDate(event.start); // Date
    console.log("start", start);
    const end = event.end ? parseEventDate(event.end) : start; // Date

    // Pastikan kita tidak mutasi start
    let current = new Date(start);

    const endDay = new Date(end);

    while (current <= endDay) {
      // Hanya index untuk bulan yang sedang ditampilkan
      if (current.getFullYear() === year && current.getMonth() === month) {
        const key = toDateKey(current);
        if (!map[key]) map[key] = [];
        // Push salinan event agar tidak conflict di day loop
        map[key].push({
          ...event,
          start: new Date(event.start),
          end: event.end ? new Date(event.end) : new Date(event.start),
        });
      }
      // increment current sebagai date baru
      current = new Date(current);
      current.setDate(current.getDate() + 1);
      current.setHours(0, 0, 0, 0);
    }
  });

  return map;
}, [events, year, month]);

  const goPrevMonth = () => {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else {
      setMonth(m => m - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else {
      setMonth(m => m + 1);
    }
  };

  return (
    <div className={clsx(className, "w-full py-4 px-2 md:px-4 bg-white rounded-lg shadow")}>

      <div className="flex items-center justify-between my-5">
        <h2 className="text-[20px] md:text-[24px] font-semibold md:font-bold text-[var(--color-nile-blue)]">
          {formatMonthName(month)}, {formatYear(year)}
        </h2>
        <div className="flex border-3 border-[var(--color-nile-blue)] rounded">
          <button onClick={goPrevMonth} className="p-1 border-r-3 border-[var(--color-nile-blue)]">
            <ChevronLeft className="text-[var(--color-nile-blue)]" />
          </button>
          <FilterComp
            type="calendar"
            className="w-[80px] md:w-[120px] font-bold uppercase py-1 md:py-2"
            selected={`${formatMonthName(month).slice(0, 3)} ${formatYear(year)}`}
            onChange={(m, y) => {
              setMonth(m - 1);
              setYear(y as number);
            }}
          />
          <button onClick={goNextMonth} className="p-1 border-l-3 border-[var(--color-nile-blue)]">
            <ChevronRight className="text-[var(--color-nile-blue)]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-14 text-[var(--color-nile-blue)] border border-white">
        {WEEK_DAYS.map((day, i) => (
          <div
            key={day}
            className="bg-[#6482A6] pl-1 md:pl-2 py-1 uppercase col-span-2 text-xs md:text-sm font-medium text-white"
            style={{ gridColumnStart: i * 2 + 1 }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-14 grid-rows-20">
        {daysGrid.map(({ day, isCurrentMonth, dateObj }) => {

          const key = toDateKey(dateObj);
          const isToday = key === toDateKey(today);
          // Ambil event khusus hari ini
          const dayEvents = eventsByDate[key] ?? [];
          console.log("event ", eventsByDate);
          console.log({ day, dayEvents });
          return (
            <div
              key={key}
              className={clsx(
                "border-[0.5px] border-white relative col-span-2 row-span-4 grid grid-rows-4 aspect-[12/14] md:aspect-square overflow-visible gap-y-0 md:gap-y-3",
                isCurrentMonth ? "bg-[#99B6D9]" : "bg-[#B3C9E4]"
              )}
            >
              <div className="h-fit pl-1 md:pl-2 pt-1 md:pt-2 row-span-1">
                <div
                  className={clsx(
                    "font-medium text-[var(--color-nile-blue)] text-xs md:text-sm",
                    !isCurrentMonth && "opacity-50",
                    isToday && "bg-[#3978FF] text-white rounded-full w-6 md:w-8 h-6 md:h-8 flex items-center justify-center"
                  )}
                >
                  {day}
                </div>
              </div>

              <div className="w-full relative row-span-3 col-span-2 overflow-hidden px-1">

                {(() => {
                  if (dayEvents.length === 0) return null;
                    console.log("dayEvents", dayEvents);
                  // EFEK TUMPUK (Buku) jika event > 3
                  if (dayEvents.length > 3) {
                    return (
                      <div className="relative w-full h-full mt-2">
                        {dayEvents.map((ev, i) => {
                          const isTopCard = i === dayEvents.length - 1;
                          return (
                              <div
                                key={`${ev.id}-${key}`}
                                style={{ top: `${i * 4}px`, zIndex: i }}
                                className={clsx(
                                  "absolute left-0 right-0 h-[15px] md:h-[35px] rounded-[5px]",
                                  "flex items-center justify-center shadow-lg border border-white/20",
                                  "-translate-y-[2px] transition-all cursor-pointer hover:z-[99] hover:-translate-y-2",
                                  ev.type === "Hima" ? "bg-gradient-to-r from-[#1B3C53] to-[#456882]" :
                                  ev.type === "Beasiswa" ? "bg-gradient-to-r from-[#7F1D1D] to-[#DC2626]" :
                                  ev.type === "Lomba" ? "bg-gradient-to-r from-[#CA8A04] to-[#EAB308]" : ""
                                )}
                                onClick={() => { setModalState({ mode: "multiple", events: dayEvents });; setOpen(true); }}
                              >
                                {isTopCard && (
                                  <span className="text-white font-bold text-[8px] md:text-sm">+{dayEvents.length}</span>
                                )}
                              </div>
                            );
                        })}
                      </div>
                    );
                  }
                  return (
                    <div className="gap-1 mt-2 flex w-full max-h-full justify-center items-center">
                      {dayEvents.map((ev) => {
                        if (Number(toDateKey(ev.start).split("-").pop()) === day) {
                          return (
                            <div
                              key={`${ev.id}-${key}`}
                              className={clsx(
                                "relative flex items-center px-1 md:px-2 h-[15px] md:h-[35px] rounded-[4px]",
                                "cursor-pointer shadow-sm",
                                "whitespace-nowrap overflow-hidden transition-all -translate-y-[2px] hover:-translate-y-2",
                                ev.type === "Hima" && "bg-gradient-to-r from-[#1B3C53] to-[#456882]",
                                ev.type === "Beasiswa" && "bg-gradient-to-r from-[#7F1D1D] to-[#DC2626]",
                                ev.type === "Lomba" && "bg-gradient-to-r from-[#CA8A04] to-[#EAB308]"
                              )}
                              onClick={() => { setModalState({ mode: "single", event: ev });; setOpen(true); }}
                            >
                              <span className="truncate w-full text-[8px] md:text-sm font-bold text-white">{ev.title}</span>
                            </div>
                          )
                        }
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {modalState && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setModalState(null);
          }}
          type="calendar"
          {...modalState}
        />
      )}
    </div>
  );
}