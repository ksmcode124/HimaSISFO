"use client"
import { Button } from "@/components/ui/button";
import { WithVariantEventCardProps } from "../types";
import { ArrowRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { formatDate } from "../utils/FormatDate";
import { useState } from "react";
import { useGetCountdown } from "../hooks/useCountDown";
import { Modal } from "../components/PopUp";
import Image from "next/image";

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
  const { id, title, img, start, end, description, variant = "detail", actions } = props;
  const countDown = useGetCountdown(start);
  const [open, setOpen] = useState(false);
  // console.log('title:', title, 'start:', start, 'end:', end);
  return (
    <div
      key={id}
      className={cn(
        "flex-col rounded-md md:rounded-3xl h-fit overflow-hidden mask-clip-content text-[var(--color-dark-blue)]",
        variant === "detail" ? "border-gradient-x" : "border-gradient-y"
      )}
    >

      <Image
        src={`/assets/kegiatan/${img}`}
        alt={img}
        width={1600}
        height={1000}
        className={cn("object-cover w-full h-full", eventCard({ variant }))}
      />
      <div
        className={cn(
          "w-full flex flex-col gap-1 md:gap-3 py-[10px] md:py-[30px] px-[10px] md:px-[15px] backdrop-blur-[4px]",
          variant === "detail"
            ? "bg-[#EDF3F6]/50"
            : "bg-linear-to-b from-blue-200/60 to-blue-100"
        )}
      >
        {actions && (
          <div className="absolute inset-x-0 -top-10 flex justify-between px-4 z-20 border-2 border-accent">
            {actions}
          </div>
        )}
        <div className="flex flex-row justify-start gap-1 md:gap-3">
          <p className="shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)] w-fit h-fit text-white text-[9.5px] md:text-[22px] font-normal px-1 md:px-3 py-1 md:py-2 rounded-full md:rounded-[50px] bg-gradient-to-b from-[#1B3C53] to-[#456882] text-center">{formatDate(start, "numeric") === formatDate(end, "numeric") ?
            `${formatDate(start, "numeric")}` : `${formatDate(start, "numeric")}-${formatDate(end, "numeric")}`}</p>
          {variant === "onGoing" && (
            <p className="shadow-[4.38px_4.38px_3.15px_0px_rgba(0,0,0,0.25)] w-fit h-fit text-white text-[10px] md:text-[22px] font-normal px-1 md:px-3 py-1 md:py-2 rounded-full md:rounded-[50px] bg-gradient-to-b from-[#1B3C53] to-[#456882] text-center">
              {countDown || "Waktu Habis"}
            </p>
          )}
        </div>
        <h1 className="text-base md:text-3xl font-bold truncate">{title}</h1>
        {variant === "detail" && description && (
          <p className="text-[10px] md:text-sm line-clamp-2">{description}</p>
        )}

        <div className="w-full relative justify-center flex flex-row mt-3 md:mt-12 mb-3 md:mb-6">
          {variant === "onGoing" ?
            <>
            </> : variant === "detail" && new Date(start).getTime() < Date.now() ? (
              <Button
                route={`/kegiatan/agenda/${title}-${id}`}
                className="flex flex-row gap-3 shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
                size={"lg"}
              >
                Selengkapnya <ArrowRight />
              </Button>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                className="flex flex-row gap-3 shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)] opacity-50"
                size={"lg"}
              >
                Selengkapnya <ArrowRight />
              </Button>

            )}
          <Modal open={open} onClose={() => setOpen(false)} event={props} type="event" mode="single" />
        </div>
      </div>
    </div>

  );
};
