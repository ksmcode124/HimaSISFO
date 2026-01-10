"use client"
import { Button } from "@/components/ui/button";
import { WithVariantEventCardProps } from "../types";
import { ArrowRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { formatDate } from "../utils/FormatDate";
import { useEffect, useState } from "react";
import { useGetCountdown } from "../hooks/useCountDown";

const eventCard = cva("overflow-hidden transition hover:shadow-md", {
  variants: {
    variant: {
      detail: "h-[117px] md:h-[231px]",
      onGoing: "h-[94px] md:h-[280px]",
      notGoing: "h-[94px] md:h-[280px]",
    },
  },
  defaultVariants: {
    variant: "detail",
  },
});

export const EventCard = (props: WithVariantEventCardProps) => {
  const g7etCountdown = useGetCountdown;
  const { id, title, img, start, end, description, variant = "detail" } = props;

  const [countDown, setCountDown] = useState("00:00:00");
  useEffect(() => {
    if (variant !== "onGoing") return;

    const interval = setInterval(() => {
      setCountDown(getCountdown(start));
    }, 1000);

    setCountDown(getCountdown(start));

    return () => clearInterval(interval);
  }, [start, variant]);

  return (
    <div
      key={id}
      className={cn(
        "flex-col rounded-md md:rounded-3xl h-fit overflow-hidden mask-clip-content",
        variant === "detail" ? "border-gradient-x" : "border-gradient-y"
      )}
    >
      <img
        src={`/assets/kegiatan/${img}`}
        alt={img}
        className={cn("object-cover w-full h-full", eventCard({ variant }))}
      />
      <div
        className={cn(
          "w-full flex flex-col gap-[5px] md:gap-[30px] py-[10px] md:py-[30px] px-[10px] md:px-[15px] backdrop-blur-[4px]",
          variant === "detail"
            ? "bg-[#EDF3F6]/50"
            : "bg-linear-to-b from-blue-200/60 to-blue-100"
        )}
      >
        <div className="flex flex-row justify-start gap-1 md:gap-3">
          <p className="shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)] w-fit text-white text-[10px] md:text-xl font-normal px-2 md:px-3 py-1 md:py-2 rounded-[25px] md:rounded-[50px] bg-gradient-to-b from-[#1B3C53] to-[#456882]">{formatDate(start) === formatDate(end) ?
          `${formatDate(start)}` : `${formatDate(start)} - ${formatDate(end)}`}</p>
          {variant === "onGoing" && (
            <p className="shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)] w-fit text-white text-[10px] md:text-xl font-normal px-2 md:px-3 py-1 md:py-2 rounded-[25px] md:rounded-[50px] bg-gradient-to-b from-[#1B3C53] to-[#456882]">
              {countDown || "Waktu Habis"}
            </p>
          )}
        </div>
        <h1 className="text-base md:text-3xl font-bold truncate">{title}</h1>
        {variant === "detail" && description && (
          <p className="text-[10px] md:text-sm line-clamp-2">{description}</p>
        )}
        {variant === "detail" && (
          <div className="w-full relative justify-center flex flex-row mt-3 md:mt-12 mb-3 md:mb-6">
            <Button
              route={`/kegiatan/agenda/${title}-${id}`}
              className="flex flex-row gap-3 px-3 py-2 rounded-full shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
            >
              More <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
