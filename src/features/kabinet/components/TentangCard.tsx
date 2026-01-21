import React from "react";

interface TentangCardProps {
  data: {
    kata: string;
    makna: string;
  }[];
}

export default function TentangCard({ data }: TentangCardProps) {
  return (
    <div className="relative w-full max-w-96 lg:max-w-120 2xl:max-w-138 rounded-t-[40px] drop-shadow-[10px_8px_2px_rgba(0,0,0,0.2)] overflow-hidden">
      <div className="bg-white/80 p-6 flex flex-col gap-1">
        <h3 className="text-lg 2xl:text-4xl mb-1.5 md:text-xl font-semibold bg-linear-to-r from-[#D6336C] to-[#7048E8] bg-clip-text text-transparent">
          Tentang
        </h3>
        <ul className="flex flex-col gap-1">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <li key={index} className="flex items-start md:pl-3 gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-3 shrink-0" />
                <p className="text-xs 2xl:text-lg mb-3 md:text-sm">
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
      <div className="absolute bottom-0 w-full h-3 bg-linear-to-r from-[#E63258] via-[#C33989] to-[#8B3FBF]" />
    </div>
  );
}
