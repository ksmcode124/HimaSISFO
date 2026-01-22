"use client";

import React from "react";
import {
  Ornament1,
  Ornament2,
  Ornament4,
  Ornament5,
} from "../components/KabinetOrnaments";
import StaffCard from "../components/StaffCard";
import { DepartemenResponse } from "../types";

interface StaffSectionProps {
  data: DepartemenResponse["anggota"];
}

export default function StaffSection({ data }: StaffSectionProps) {
  const kadep = data.find(
    (a) =>
      a.jabatan.toLowerCase().includes("kepala")
  );
  const wakadep = data.find((a) =>
    a.jabatan.toLowerCase().includes("wakil"),
  );
  const sekben = data.find(
    (a) =>
      a.jabatan.toLowerCase().includes("sekben") ||
      a.jabatan.toLowerCase().includes("sekretaris") ||
      a.jabatan.toLowerCase().includes("bendahara"),
  );

  // staff = semua yang bukan kadep, wakadep, atau sekben
  const staffDepartemen = data.filter(
    (a) => 
      a.id !== kadep?.id && 
      a.id !== wakadep?.id && 
      a.id !== sekben?.id
  );

  const hasSekben = !!sekben;

  return (
    <section className="relative w-full py-32 flex flex-col items-center overflow-hidden bg-[#F4E8FF]">
      {/* ORNAMENTS */}
      <div className="absolute right-30 md:right-20 bottom-[10%] md:top-[12%] lg:top-[0%] w-[700vw] md:w-[400vw] z-0">
        <div className="w-full translate-x-[43%] -rotate-235 md:rotate-0">
          <Ornament5 />
        </div>
      </div>

      <div className="absolute -right-60 md:-right-10 top-[30%] lg:top-[22%] w-[700vw] md:w-[400vw] z-0">
        <div className="w-full translate-x-[40%] md:translate-x-[30%] -scale-x-100 -rotate-250 md:rotate-[-15deg]">
          <Ornament5 />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10 md:mb-20 w-full">
        <div className="flex flex-row -mt-10 items-center justify-center">
          <div className="w-40 md:w-80 scale-90 md:scale-110 origin-right translate-y-6 -mr-18 md:-mr-44 transition-all">
            <Ornament2 />
          </div>
          <div className="flex flex-col items-center z-20">
            <div className="w-56 md:w-110 rotate-2 -translate-y-1 md:-translate-y-10 transition-all">
              <Ornament1 />
            </div>
          </div>
          <div className="w-40 md:w-80 scale-90 md:scale-110 origin-left translate-y-6 -ml-18 md:-ml-44 transition-all">
            <div className="scale-x-[-1]">
              <Ornament2 />
            </div>
          </div>
        </div>
      </div>

      {/* INTI DEPARTEMEN */}
      <div className="relative w-full max-w-7xl px-10 flex flex-col items-center mb-40">
        <div className="relative flex flex-row items-center mb-20">
          <h2 className="text-lg md:text-3xl font-bold tracking-tight text-black">
            Inti Departemen
          </h2>
        </div>
      </div>

      <div className="absolute w-120 top-64 right-22 z-0 rotate-45 md:hidden">
        <Ornament4 />
      </div>
      <div className="absolute w-120 top-64 left-22 z-0 rotate-135 -scale-y-100 md:hidden">
        <Ornament4 />
      </div>

      {/* CONTAINER INTI */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center -mt-44 mb-16 gap-6 lg:gap-22 z-10 w-full max-w-4xl">
        {/* Kadep */}
        {kadep && (
          <div className="col-span-2 flex justify-center md:contents">
            <div className="w-40 h-52 md:w-50 md:h-62 lg:w-60 lg:h-80 md:order-2 flex items-center justify-center">
              <StaffCard data={kadep} index={0} customCard={5} />
            </div>
          </div>
        )}

        {/* Wakadep */}
        {wakadep && (
          <div
            className={`${
              !hasSekben ? "col-span-2" : "col-span-1"
            } flex justify-center md:contents`}
          >
            <div
              className={`w-38 h-46 md:w-50 md:h-62 lg:w-60 lg:h-80 md:order-1 flex items-center justify-center ${
                hasSekben ? "md:ml-0" : ""
              }`}
            >
              <StaffCard data={wakadep} index={1} customCard={2} />
            </div>
          </div>
        )}

        {/* Sekbend */}
        {sekben && (
          <div className="col-span-1 flex justify-center md:contents">
            <div className="w-38 h-46 md:w-50 md:h-62 lg:w-60 lg:h-80 md:order-3 md:mr-0 flex items-center justify-center">
              <StaffCard data={sekben} index={2} customCard={4} />
            </div>
          </div>
        )}
      </div>

      {/* STAFF DEPARTEMEN */}
      <div className="relative z-10 w-full max-w-7xl px-10 flex flex-col items-center">
        <div className="relative flex flex-row items-center mt-20">
          <h2 className="text-lg md:text-3xl font-bold tracking-tight text-black">
            Staff Departemen
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-32">
          {staffDepartemen.map((staff, i) => (
            <div key={staff.id} className="flex flex-col items-center">
              <div className="w-36 md:w-52 -mt-20 md:mt-0 flex items-center justify-center relative">
                <StaffCard key={staff.id} data={staff} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
