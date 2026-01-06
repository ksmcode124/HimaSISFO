"use client"
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Tambahkan ini
import { MONTHS_NAME } from "../data/constant";
import { formatMonthName } from "../utils/FormatDate";

export function FilterComp() {
  const router = useRouter();
  const pathname = usePathname();
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
        className="flex items-center justify-start gap-3 md:gap-5 w-full py-2 text-sm rounded-md "
        onClick={() => setActive(!active)}
      >
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${active ? "rotate-180" : ""}`} />
        <span className="truncate">{selectedBulan}</span>
      </div>

      {active && (
        <div className="absolute z-50 w-full mt-2 p-1 bg-white border rounded-md shadow-md">
          <div className="flex flex-col gap-1">
            {currentData.map((bulan) => (
              <div
                key={bulan}
                className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 transition-colors"
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