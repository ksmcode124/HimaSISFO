"use client"
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MONTHS_NAME } from "../data/constant";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FilterComp({ className, type, selected, onChange }: { className?: string, type: string, selected: string, onChange?: (month: number, year?: number) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);


  //calendar
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  useEffect(() => {
    if (!selected) return;

    setSelectedMonth(selected.slice(0, 3));

    const year = Number(selected.split(" ")[1]);
    if (!isNaN(year)) {
      setSelectedYear(year);
    }
  }, [selected]);

  const prevYear = selectedYear - 1;
  const nextYear = selectedYear + 1;


  //list
  const selectedBulan = searchParams.get("bulan");

  const handleSelection = (bulan: string) => {
    setActive(false);
      const params = new URLSearchParams(searchParams.toString());
      params.set("bulan", bulan);
      router.push(`agenda?${params.toString()}`);
  };

  const handleSelectedMonthYear = (month: string, year: number) => {
    const monthIndex = MONTHS_NAME.findIndex((m) => m.slice(0, 3) === month.slice(0, 3));
    const monthNumber = monthIndex >= 0 ? monthIndex + 1 : NaN;
    onChange?.(monthNumber, year);
    setActive(false);
  };

  return (
    <div className="relative font-medium text-[var(--color-dark-blue)] text-[14px] md:text-[18px]">
      {type === "list" ? (
        <div
          className="flex items-center justify-start gap-2 md:gap-4 w-full py-2 rounded-md z-999"
          onClick={() => setActive(!active)}
        >

          <div className="w-[25px] h-[25px] md:w-[40px] md:h-[40px] rounded-full bg-linear-to-b from-[#1B3C53] to-[#456882] flex items-center justify-center p-1.5">
            <svg
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.75 4.58301H19.4783V8.87122L13.9022 14.4473V18.6618L8.32609 22.2082V14.4473L2.75 8.87122V4.58301ZM4.6087 6.4417V8.10132L10.1848 13.6774V18.8233L12.0435 17.6412V13.6774L17.6196 8.10132V6.4417H4.6087Z"
                fill="#EDF3F6"
              />
            </svg>
          </div>

          <span className={clsx(className, "truncate")}>{selectedBulan ? selectedBulan : "Filter"}</span>
        </div>
      ) : type === "calendar" ? (
        <div className="flex items-center justify-center gap-2 md:gap-4 w-full cursor-pointer h-full"
          onClick={() => setActive(!active)}>
          <span className={clsx(className, "text-center text-sm md:text-[24px]")}>{selected ? selected : "Filter"}</span>
        </div>
      ) : null}

      {active && (
        <div className={clsx(
          "absolute z-99 mt-2 rounded-md px-2 md:px-4 bg-[#EDF3F6CC] backdrop-blur-[2px] ",
          {
            "left-0": type === "list",
            "right-0": type === "calendar",
          }
        )}>

          <div className="w-[200px] md:w-[300px] overflow-hidden">
            {type === "calendar" ? (
              <div className="relative">
                <div className="pb-2 pt-3">
                  Tahun
                </div>
                <div className="flex flex-row w-full justify-between border-2 border-[var(--color-dark-blue)] bg-[var(--color-porcelain)] rounded-[4px] items-center py-2 px-4" onClick={() => {
                  setOpen(!open);
                }}>
                  {selectedYear}
                  {open ? <ChevronUp /> : <ChevronDown />}
                </div>
                {open ?
                  <div className="absolute left-0 my-3 flex flex-col z-999 border-2 border-[var(--color-dark-blue)] bg-[var(--color-porcelain)] rounded-[4px] w-full">
                    <span className="py-2 px-4 hover:bg-neutral-100 hover:text-white" onClick={() => (setSelectedYear(prevYear), setOpen(false))}>{prevYear}</span>
                    <span className="py-2 px-4 hover:bg-neutral-100 hover:text-white" onClick={() => (setSelectedYear(selectedYear), setOpen(false))}>{!isNaN(selectedYear) ? selectedYear : ""}</span>
                    <span className="py-2 px-4 hover:bg-neutral-100 hover:text-white" onClick={() => (setSelectedYear(nextYear), setOpen(false))}>{nextYear}</span>
                  </div> : null}
              </div>
            ) : null}

            <div>
              <div className="pb-2 pt-3">
                Bulan
              </div>

              {Array.from({ length: 4 }).map((_, row) => (
                <div key={row} className="flex w-full gap-2 md:gap-4 mb-2 md:mb-4">
                  {MONTHS_NAME.slice(row * 3, row * 3 + 3).map((bulan) => (
                    <div
                      key={bulan}
                      onClick={() => { 
                        if (type === "list") handleSelection(bulan);
                        if (type === "calendar") setSelectedMonth(bulan);
                      }}
                      className={clsx("w-1/3 rounded-[3px] p-2 text-center cursor-pointer hover:bg-neutral-100 hover:text-white",
                        {
                          "bg-[#6482A6] text-white":
                            (type === "list" && selectedBulan === bulan) ||
                            (type === "calendar" &&
                              selectedMonth.slice(0, 3) === bulan.slice(0, 3)),
                          "bg-[#D1E6FF] text-[var(--color-dark-blue)]":
                            !(
                              (type === "list" && selectedBulan === bulan) ||
                              (type === "calendar" &&
                                selectedMonth.slice(0, 3) === bulan.slice(0, 3))
                            ),
                        }
                      )}
                    >
                      {bulan.slice(0, 3)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {type === "list" ? null : (
              <div className="w-full flex gap-5 pb-5">
                <Button
                  className="flex-1 bg-[#D1E6FF] text-[var(--color-dark-blue)] text-[14px] md:text-[18px]"
                  onClick={() => {
                    setActive(false)
                    setSelectedMonth(selected.slice(0, 3))
                    setSelectedYear(Number(selected.split(" ")[1]))
                  }}
                >
                  Batal
                </Button>

                <Button
                  className="flex-1 bg-[#6482A6] text-[14px] md:text-[18px]"
                  onClick={() => {
                    handleSelectedMonthYear(selectedMonth, selectedYear);
                  }}
                >
                  OK
                </Button>
              </div>)}
          </div>

        </div>
      )}


    </div>
  );
}