"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ModalLayer } from "@/components/layout/Layer";
import { Button } from "@/components/ui/button";
import { formatDate } from "../utils/FormatDate";
import { X } from "lucide-react";
import { SingleEventSpec, MultipleEventSpec } from "../types";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  type: "event" | "calendar";
} & (SingleEventSpec | MultipleEventSpec);

export function Modal(props: ModalProps) {
  const { open, onClose, type } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) return null;

  const today = Date.now();
  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <ModalLayer>
        {type === "event" && props.mode === "single" && (
          <div className="flex w-[280px] md:w-fit h-fit flex-col rounded-[20px] overflow-hidden">
            <header className="px-4 md:px-8 py-3 md:py-6 text-[13px] md:text-sm font-semibold text-white flex flex-row items-center gap-3 bg-gradient-to-b from-[#1B3C53] to-[#456882]">
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
              <h1 className="text-xl md:text-2xl font-bold">{props.event.description ? "Agenda Belum Tersedia" : "Berita Belum Ada"}</h1>
            </header>

            <main className="flex flex-col gap-3 px-3 md:px-5 bg-white ">
              <div className="flex flex-col md:py-2 py-4 gap-2">
                <h2 className="text-[18px] md:text-[20px] font-semibold text-[#323257]">{props.event.title}</h2>
                <p className="max-w-[320px] break-words text-[14px] text-sm md:text-[18px]">{props.event.description ?
                  "Event ini belum dapat diakses karena belum berlangsung. Silakan tunggu hingga tanggal event dimulai untuk melihat detail selengkapnya." :
                  "Konten berita tidak ditemukan atau belum tersedia di dalam sistem untuk saat ini."
                }</p>
              </div>
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

                <div className="flex flex-col py-3 pr-3">
                  <p className="text-sm md:text-[18px] font-medium text-[#323257]">Tanggal Event</p>
                  <p className="text-sm md:text-[18px] text-[#6B7280]">{formatDate(props.event.start, "name")}</p>
                </div>
              </div>
            </main>

            <footer className="flex py-6 justify-center items-center bg-white">
              <Button
                onClick={onClose}
                className="text-sm md:text-lg flex flex-row gap-1 md:gap-2 px-4 md:px-8 py-2 md:py-4 rounded-full items-center shadow-[4.38px_4.38px_3.5px_0px_rgba(0,0,0,0.25)]"
              >

                Mengerti
              </Button>
            </footer>
          </div>
        )}
        {type === "calendar" && props.mode === "single" && (
          <div className="flex w-fit flex-col w-[300px] md:w-[400px] rounded-[20px] bg-[#EDF3F6CC] p-5 text-[var(--color-dark-blue)]">
            <div className="flex justify-between items-center mb-3 z">
              <h2 className="font-semibold text-[20px]">{props.event.title}</h2>
              <X
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              />
            </div>

            <div className="text-sm flex flex-col gap-3">
              <div className="font-medium">
                {today < props.event.start.getTime() ? (
                  <span className="px-4 py-1 bg-[#99B6D9] rounded">Belum</span>
                ) : today > props.event.end.getTime() ? (
                  <span className="px-4 py-1 bg-[#99B6D9] rounded">Selesai</span>
                ) : (
                  <span className="px-4 py-1 bg-[#99B6D9] rounded">Berlangsung!</span>
                )}
              </div>

              <div className="grid grid-cols-[1fr_3fr] gap-2">
                <span>Mulai</span>
                <span>: {formatDate(props.event.start, "fullDate")}</span>

                <span>Selesai</span>
                <span>: {formatDate(props.event.end, "fullDate")}</span>
              </div>
            </div>
          </div>
        )}
        {type === "calendar" && props.mode === "multiple" && (
          <div className="relative flex w-[300px] md:w-[400px] flex-col rounded-[20px] bg-[#EDF3F6CC] p-5 text-[var(--color-dark-blue)] gap-5">
            <X
              className="absolute top-4 right-4 cursor-pointer z-99"
              onClick={onClose}
              size={40}
            />
            <div className="relative overflow-visible max-h-[50vh] overflow-y-auto scrollbar scrollbar-sm scrollbar-thumb-[#AFAFAF] scrollbar-track-scrollbar-track">
              {Array.from(props.events)
                .sort((a, b) => a.start.getTime() - b.start.getTime()) // urut dari tanggal terkecil
                .map((event) => {
                  return (
                    <div key={event.id} className="relative flex flex-col pb-5">
                      <div className="flex flex-col gap-3">
                        <h1 className="w-full font-bold text-xl">{event.title}</h1>
                        <div className="text-sm flex flex-col gap-3">
                          <div className="font-medium">
                            {today < event.start.getTime() ? (
                              <span className="px-4 py-2 bg-[#99B6D9] rounded">Belum</span>
                            ) : today > event.end.getTime() ? (
                              <span className="px-4 py-2 bg-[#99B6D9] rounded">Selesai</span>
                            ) : (
                              <span className="px-4 py-2 bg-[#99B6D9] rounded">Berlangsung</span>
                            )}
                          </div>
                          <div className="grid grid-cols-[1fr_3fr] gap-2">
                            <span>Mulai</span>
                            <span>: {formatDate(event.start, "fullDate")}</span>
                            <span>Selesai</span>
                            <span>: {formatDate(event.end, "fullDate")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
        )}
      </ModalLayer>
    </div>,
    document.body
  );
}
