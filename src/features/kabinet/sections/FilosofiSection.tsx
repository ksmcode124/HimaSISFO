"use client";

import { Pita } from "../components/KabinetOrnaments";
import TentangCard from "../components/TentangCard";
import VisiMisiAccordion from "../components/VisiMisiAccordion";
import VisiMisiMobile from "../components/VisiMisiMobile";
import React, { useState } from "react";
import { ColorMap, Kabinet } from "../types";
import { LogoMapper } from "../components/LogoMapper";
import { DynamicAsset } from "@/components/ui/dynamic-asset";

interface FilosofiProps {
  data: Kabinet;
  colorMap: ColorMap;
  kabinet: string
}

export default function FilosofiSection({ data, colorMap: colorMap, kabinet }: FilosofiProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const deskripsiArray = (data.deskripsi || "")
    .split(". ")
    .filter((sentence) => sentence.trim() !== "")
    .map((sentence) => {
      const words = sentence.split(" ");
      return {
        kata: words[0],
        makna: words.slice(1).join(" "),
      };
    });

  const visiArray = (data.visi || "")
    .split(/ \d\. /)
    .map((item) => item.replace(/^\d\. /, "").trim())
    .filter(Boolean);
  const misiArray = (data.misi || "")
    .split(/ \d\. /)
    .map((item) => item.replace(/^\d\. /, "").trim())
    .filter(Boolean);

  return (
    <div className="relative w-full">
      <section className="w-full min-h-screen flex items-center justify-center py-20 px-10">
        <DynamicAsset
          maskSrc="/assets/kabinet/filosofi-bg.webp"
          gradientVar={colorMap.filosofiBackground ?? ""}
          innerHeight={"h-full"}
          maskRepeat="repeat-y"
          className="absolute inset-0 z-0 bg-size-[150%_40%] md:bg-size-[100%_auto] bg-repeat-y bg-top"
        />

        <div className="relative z-40 mt-10 w-full max-w-360 2xl:max-w-450 mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-10 items-center">
          {/* LOGO */}
          <div className="flex justify-center items-center lg:order-2 w-full">
            <div className="relative w-50 h-50 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-md xl:h-112 2xl:w-137 2xl:h-137">
              <LogoMapper kabinet={kabinet} />
            </div>
          </div>

          {/* TENTANG */}
          <div className="flex flex-col">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1 h-full">
              <TentangCard data={deskripsiArray} colorMap={colorMap} />
            </div>
          </div>

          {/* Visi Misi Desktop */}
          <div className="md:flex-col md:-ml-10 md:gap-10 md:order-3 hidden lg:block">
            <VisiMisiAccordion visi={visiArray} misi={misiArray} colorMap={colorMap} />
          </div>

          {/*  Visi Misi Mobile Ver. */}
          <div
            className={`relative w-full lg:hidden h-14 ${isMobileMenuOpen ? "z-50" : "z-0"}`}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-md">
              <VisiMisiMobile
                visi={visiArray}
                misi={misiArray}
                onToggle={(open) => setIsMobileMenuOpen(open)}
                colorMap={colorMap}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="absolute -bottom-4 md:-bottom-10 w-[105%] z-10 left-1/2 -translate-x-1/2 translate-y-1/2 h-100">
        <Pita pitaGradient={colorMap.pita ?? ""} />
      </div>
    </div>
  );
}
