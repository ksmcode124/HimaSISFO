"use client"
import { Button } from "@/components/ui/button";
import { WithVariantEventCardProps } from "../types";
import { ArrowRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { formatDate, formatDateID } from "../utils/FormatDate";
import { useEffect, useState } from "react";
import { useGetCountdown } from "../hooks/useCountDown";
import { Modal } from "../components/PopUp";

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
  const getCountdown = useGetCountdown;
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
  const [open, setOpen] = useState(false);
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
          <p className="shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)] w-fit h-fit text-white text-[10px] md:text-[22px] font-normal px-1 md:px-3 py-1 md:py-2 rounded-[15px] md:rounded-[50px] bg-gradient-to-b from-[#1B3C53] to-[#456882] text-center">{formatDate(start) === formatDate(end) ?
            `${formatDate(start)}` : `${formatDate(start)} - ${formatDate(end)}`}</p>
          {variant === "onGoing" && (
            <p className="shadow-[4.38px_4.38px_3.15px_0px_rgba(0,0,0,0.25)] w-fit h-fit text-white text-[10px] md:text-[22px] font-normal px-1 md:px-3 py-1 md:py-2 rounded-[15px] md:rounded-[50px] bg-gradient-to-b from-[#1B3C53] to-[#456882] text-center">
              {countDown || "Waktu Habis"}
            </p>
          )}
        </div>
        <h1 className="text-base md:text-3xl font-bold truncate">{title}</h1>
        {variant === "detail" && description && (
          <p className="text-[10px] md:text-sm line-clamp-2">{description}</p>
        )}

        <div className="w-full relative justify-center flex flex-row mt-3 md:mt-12 mb-3 md:mb-6">
          {variant === "onGoing" || variant === "notGoing" ? 
          <></> : variant === "detail" && new Date(start).getTime() < Date.now() ? (
            <Button
              route={`/kegiatan/agenda/${title}-${id}`}
              className="flex flex-row gap-3 px-3 py-2 rounded-full shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
            >
              More <ArrowRight />
            </Button>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              className="flex flex-row gap-3 px-3 py-2 rounded-full shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
            >
              More <ArrowRight />
            </Button>

          )}
          
          
          <Modal open={open} onClose={() => setOpen(false)} >
            <div className="flex w-fit h-fit flex-col rounded-[20px] overflow-hidden">
              <header className="p-4 text-[13px] md:text-sm font-semibold text-white flex flex-row items-center gap-3 bg-gradient-to-b from-[#1B3C53] to-[#456882]">
                <svg
                  viewBox="0 0 34 34"
                  className="h-[34px] w-[34px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 16.8649C0 7.55068 7.55068 0 16.8649 0C26.1791 0 33.7298 7.55068 33.7298 16.8649C33.7298 26.1791 26.1791 33.7298 16.8649 33.7298C7.55068 33.7298 0 26.1791 0 16.8649Z"
                    className="fill-white/20"
                  />

                  <path
                    d="M16.8639 24.8958C21.2993 24.8958 24.8948 21.3002 24.8948 16.8649C24.8948 12.4295 21.2993 8.83398 16.8639 8.83398C12.4286 8.83398 8.83301 12.4295 8.83301 16.8649C8.83301 21.3002 12.4286 24.8958 16.8639 24.8958Z"
                    className="stroke-white"
                    strokeWidth="1.60618"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M16.8643 13.6523V16.8647"
                    className="stroke-white"
                    strokeWidth="1.60618"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M16.8643 20.0771H16.8729"
                    className="stroke-white"
                    strokeWidth="1.60618"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1>Agenda Belum Tersedia</h1>
              </header>

              <main className="flex flex-col p-2 gap-3 px-5 bg-white ">
                <h2 className="text-sm md:text-md font-medium text-[#323257]">{title}</h2>
                <p className="max-w-[320px] break-words text-[10px] md:text-sm">Event ini belum dapat diakses karena belum berlangsung. Silakan tunggu hingga tanggal event dimulai untuk melihat detail selengkapnya.</p>
                <div className="flex items-stretch flex-row gap-3 bg-gradient-to-b from-[#F0F4F8] to-[#E6EEF5] rounded-[12px] px-5">
                  <div className="flex items-center justify-center ">
                    <svg
                      viewBox="0 0 27 27"
                      className="h-[27px] w-[27px]"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="calendarGradient"
                          x1="13.251"
                          y1="0"
                          x2="13.251"
                          y2="26.502"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop className="stop-[color:#1B3C53]" offset="0" />
                          <stop className="stop-[color:#456882]" offset="1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 13.251C0 5.93267 5.93267 0 13.251 0C20.5693 0 26.502 5.93267 26.502 13.251C26.502 20.5693 20.5693 26.502 13.251 26.502C5.93267 26.502 0 20.5693 0 13.251Z"
                        fill="url(#calendarGradient)"
                      />
                      <path
                        d="M10.8418 7.22852V9.63779"
                        className="stroke-white"
                        strokeWidth="1.20464"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.6602 7.22852V9.63779"
                        className="stroke-white"
                        strokeWidth="1.20464"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.4662 8.43262H9.03374C8.36844 8.43262 7.8291 8.97195 7.8291 9.63725V18.0697C7.8291 18.735 8.36844 19.2743 9.03374 19.2743H17.4662C18.1315 19.2743 18.6708 18.735 18.6708 18.0697V9.63725C18.6708 8.97195 18.1315 8.43262 17.4662 8.43262Z"
                        className="stroke-white"
                        strokeWidth="1.20464"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.8291 12.0469H18.6708"
                        className="stroke-white"
                        strokeWidth="1.20464"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-col py-2 pr-3">
                    <p className="text-[10px] md:text-sm font-medium text-[#323257]">Tanggal Event</p>
                    <p className="text-[10px] md:text-sm text-[#6B7280]">{formatDateID(start)}</p>
                  </div>
                </div>
              </main>

              <footer className="flex p-4 justify-center items-center bg-white ">
                <Button
                  onClick={() => setOpen(false)}
                  className="text-[12px] md:text-sm flex flex-row gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-4 rounded-full items-center shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
                >

                  Mengerti
                </Button>
              </footer>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
