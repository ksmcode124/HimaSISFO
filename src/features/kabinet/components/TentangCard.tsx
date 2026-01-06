import React from "react";

interface TentangCardProps {
  data: {
    kata: string;
    makna: string;
  }[];
}

export default function TentangCard({ data }: TentangCardProps) {
  return (
    <div className="relative w-[390px] rounded-t-[40px] drop-shadow-[10px_8px_2px_rgba(0,0,0,0.2)] overflow-hidden">
      <div className="bg-white/80 p-6 pr-1.5 flex flex-col gap-1">
        <h3 className="text-xl font-semibold bg-linear-to-r from-[#D6336C] to-[#7048E8] bg-clip-text text-transparent">
          Tentang
        </h3>
        <ul className="flex flex-col gap-1">
          {data?.map((item, index) => (
            <li key={index} className="flex items-start pl-3 gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-3 shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">{item.kata}</span> {item.makna}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 w-full h-3 bg-linear-to-r from-[#E63258] via-[#C33989] to-[#8B3FBF]" />
    </div>
  );
}
