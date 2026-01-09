"use client"
import React from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Tambahkan ini
import { MONTHS_NAME } from "../data/constant";
import { formatMonthName } from "../utils/FormatDate";
import clsx from "clsx";

export function FilterComp({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState(false);

  const selectedBulan = searchParams.get("bulan") || formatMonthName(new Date().getMonth());

  const currentIndex = MONTHS_NAME.indexOf(selectedBulan);
  const start = currentIndex !== -1 ? currentIndex : 0;
  const end = (start + 3) % 12;

  const currentData = start < end
    ? MONTHS_NAME.slice(start, end)
    : [...MONTHS_NAME.slice(start), ...MONTHS_NAME.slice(0, end)];

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

        <div className="w-[40px] h-[40px] rounded-full bg-linear-to-b from-[#1B3C53] to-[#456882] items-center justify-center relative flex">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_11839_45645)">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.75 4.58301H19.4783V8.87122L13.9022 14.4473V18.6618L8.32609 22.2082V14.4473L2.75 8.87122V4.58301ZM4.6087 6.4417V8.10132L10.1848 13.6774V18.8233L12.0435 17.6412V13.6774L17.6196 8.10132V6.4417H4.6087Z" fill="#EDF3F6" />
            </g>
            <defs>
              <clipPath id="clip0_11839_45645">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <span className={clsx(className, "truncate")}>{active ? selectedBulan : "Filter"}</span>
      </div>

      {active && (
        <div className="absolute z-50 w-fit mt-2 p-1 bg-white border rounded-md shadow-md">
          <div className="flex flex-col gap-1">
            {currentData.map((bulan) => (
              <div
                key={bulan}
                className={clsx(className, "cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 transition-colors")}
                onClick={() => handleSelection(bulan)}
              >
                {bulan}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}