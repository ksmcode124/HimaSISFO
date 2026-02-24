"use client";

// import { cn } from "@/lib/utils";
import React from "react";
import { ColorMap } from "../types";

interface TentangCardProps {
  data: {
    kata: string;
    makna: string;
  }[];
  colorMap: ColorMap;
}

export default function TentangCard({ data, colorMap }: TentangCardProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="relative w-full max-w-96 lg:max-w-120 2xl:max-w-138 rounded-t-[40px] drop-shadow-[10px_8px_2px_rgba(0,0,0,0.2)] overflow-hidden">
      <div className="bg-white/90 p-6 flex flex-col gap-1">
        <h3 className="text-lg 2xl:text-4xl mb-1.5 md:text-xl font-semibold bg-clip-text text-transparent"
          style={{
            backgroundImage: colorMap.tentangText,
          }}
        >
          Tentang
        </h3>

        <ul className="flex flex-col gap-1">
          {hasData ? (
            data.map((item, index) => (
              <li key={index} className="flex items-start md:pl-3 gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: colorMap.text }}
                />
                <p
                  className="text-xs 2xl:text-lg mb-3 md:text-sm"
                  style={{ color: colorMap.text }}
                >
                  <span className="font-semibold">{item.kata}</span>{" "}
                  {item.makna}
                </p>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">
              Deskripsi belum tersedia.
            </p>
          )}
        </ul>
      </div>

      <div
        className="absolute bottom-0 w-full h-3"
        style={{
          background: colorMap.tentangBorder,
        }}
      />
    </div>
  );
}
