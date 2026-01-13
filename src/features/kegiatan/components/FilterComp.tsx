"use client"
import React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MONTHS_NAME } from "../data/constant";
import { formatMonthName } from "../utils/FormatDate";
import clsx from "clsx";

export function FilterComp({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState(false);

  const selectedBulan = searchParams.get("bulan") || formatMonthName(new Date().getMonth());

  // const currentIndex = MONTHS_NAME.indexOf(selectedBulan);
  // const start = currentIndex !== -1 ? currentIndex : 0;
  // const end = (start + 3) % 12;

  // const currentData = start < end
  //   ? MONTHS_NAME.slice(start, end)
  //   : [...MONTHS_NAME.slice(start), ...MONTHS_NAME.slice(0, end)];

  const handleSelection = (bulan: string) => {
    setActive(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set("bulan", bulan);
    router.push(`agenda?${params.toString()}`);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-start gap-2 md:gap-4 w-full py-2 text-sm rounded-md "
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

        <span className={clsx(className, "truncate text-[14px] md:text-xl")}>Filter</span>
      </div>

      {active && (
        <div className="absolute z-50 mt-2 rounded-md px-2 md:px-4 pt-2 md:pt-4 bg-[#EDF3F6CC] backdrop-blur-[2px]">
          <table className="w-[200px] md:w-[400px] overflow-hidden">
            <tbody >
              {Array.from({ length: 4 }).map((_, row) => (
                <tr key={row} className="flex w-full gap-2 md:gap-4 mb-2 md:mb-4">
                  {MONTHS_NAME.slice(row * 3, row * 3 + 3).map((bulan) => (
                    <td
                      key={bulan}
                      onClick={() => handleSelection(bulan)}
                      className={clsx("w-1/3 rounded-[3px] p-2 text-[14px] md:text-xl text-center cursor-pointer hover:bg-neutral-100   ",
                        selectedBulan === bulan ? "bg-[#6482A6]" : "bg-[#D1E6FF]"
                      )}
                    >
                      {bulan.slice(0, 3)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );
}