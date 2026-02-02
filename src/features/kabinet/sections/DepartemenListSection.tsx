"use client";

import {
  Ornament1,
  Ornament9,
  Ornament5,
} from "../components/KabinetOrnaments";
import DepartemenCard from "@/features/kabinet/components/DepartemenCard";
import { DepartemenListItem } from "../types";

export default function DepartemenListSection({
  data,
}: {
  data: DepartemenListItem[];
}) {
  return (
    <section className="relative w-full min-h-screen bg-[#F4E8FF] flex flex-col items-center py-20 pb-185 lg:pb-135 -mb-175 lg:-mb-125 overflow-hidden">
      <div className="absolute right-30 md:right-20 bottom-[40%] md:top-[22%] lg:top-[-15%] w-[700vw] md:w-[400vw] z-0">
        <div className="w-full translate-x-[43%] -rotate-240 md:rotate-0">
          <Ornament5 />
        </div>
      </div>

      <div className="absolute -right-60 md:-right-10 top-[10%] md:top-[5%] lg:top-[15%] w-[700vw] md:w-[400vw] z-0">
        <div className="w-full translate-x-[40%] md:translate-x-[30%] -scale-x-100 -rotate-258 md:rotate-[-15deg]">
          <Ornament5 />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10 md:mb-20 w-full">
        <div className="flex flex-row -mt-10 items-center justify-center">
          <div className="w-40 md:w-80 scale-90 md:scale-110 origin-right translate-y-6 -mr-18 md:-mr-44 transition-all">
            <Ornament9 />
          </div>
          <div className="flex flex-col items-center z-20">
            <div className="w-56 md:w-110 rotate-2 -translate-y-1 md:-translate-y-10 transition-all">
              <Ornament1 />
            </div>
          </div>
          <div className="w-40 md:w-80 scale-90 md:scale-110 origin-left translate-y-6 -ml-18 md:-ml-44 transition-all">
            <div className="scale-x-[-1]">
              <Ornament9 />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl mb-10 md:mb-22 md:-mt-18 md:text-3xl font-bold z-30">
        Departemen
      </h2>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center gap-10 px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 md:gap-14 w-full">
          {data &&
            data
              .filter((dept) => dept.nama_departemen.toLowerCase().includes("inti"))
              .map((dept: DepartemenListItem) => (
                <DepartemenCard
                  key={dept.id_departemen}
                  id={dept.id_departemen.toString()}
                  nama={dept.nama_departemen}
                  logo={dept.logo_departemen}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
