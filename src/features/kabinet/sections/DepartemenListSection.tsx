"use client";

import { Ornament1, Ornament2 } from "../components/KabinetOrnaments";
import DepartemenCard from "@/features/kabinet/components/DepartemenCard";
import { useParams } from "next/navigation";
import kabinetDataRaw from "../data/kabinet.json";

export default function DepartmentListPage() {
  const params = useParams();
  const kabinetId = params.kabinetId as string;

  const currentKabinet = kabinetDataRaw.kabinet_list.find(
    (k) => k.id === kabinetId
  );

  if (!currentKabinet) return null;

  return (
    <section className="relative w-full min-h-screen bg-[#F4E8FF] flex flex-col items-center py-20 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center mb-20 w-full">
        <div className="flex flex-row -mt-20 md:mt-0 gap-4 md:gap-6 items-center">
          <div className="w-16 md:w-64 mt-1 md:mt-20 mr-6 md:mr-0 scale-60 md:scale-95 origin-right">
            <Ornament2 />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-60 md:w-[600px] mb-18 md:mb-24">
              <Ornament1 />
            </div>
          </div>
          <div className="mt-1 md:mt-20 ml-6 md:ml-0 w-16 md:w-64">
            <div className="scale-60 md:scale-95 origin-left">
              <div className="scale-x-[-1]">
                <Ornament2 />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl -mt-30 mb-10 md:mb-30 md:text-3xl font-bold">
        Departemen
      </h2>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center gap-10 px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 md:gap-14 w-full">
          {currentKabinet.departemen.map((dept) => (
            <DepartemenCard
              key={dept.id}
              id={dept.id}
              nama={dept.nama}
              logo_url={dept.logo_url}
              className="w-[130px] h-[195px] md:w-[230px] md:h-[295px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
