"use client";
import React, { useEffect, useState } from 'react'
import { Bookmark, Calendar } from 'lucide-react';
import { EventListResponse } from '@/lib/types/interface';
import { parseDate } from '../utils/parseDate';
import { Skeleton } from '@/components/ui/skeleton';

export default function InfoCardGrid({ events, isLoading }: { events?: EventListResponse[], isLoading?: boolean }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return (
        <>
            {/* MOBILE / TABLET — stacked center carousel */}
            <div className="relative h-100 w-full mx-12 lg:hidden" >
                {
                    events?.map((info, i) => {
                        const centerIndex = Math.floor(events.length / 2);
                        const offset = i - centerIndex;
                        const translateXValue = isMobile ? 150 : 200;

                        return (
                            <EventCard
                                isLoading={isLoading}
                                key={i}
                                info={info}
                                variant="carousel"
                                className="top-1/2 left-1/2 w-50 sm:w-75 transition-all duration-300"
                                style={{
                                    transform: `translate(-50%, -50%) translateX(${offset * translateXValue}px) scale(${offset === 0 ? 1 : 0.9})`,
                                    zIndex: 50 - Math.abs(offset),
                                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                                }}
                            />
                        );
                    })
                }
            </div >

            {/* DESKTOP — grid 3 kolom normal */}
            < div className="hidden lg:grid grid-cols-3 gap-6 px-12 mt-8" >
                {
                    events?.map((info, i) => (
                        <EventCard isLoading={isLoading} key={i} info={info} />
                    ))
                }
            </div >
        </>
    )
}

export function EventCard({
    info,
    variant = "desktop",
    style,
    className,
    isLoading,
}: {
    info: EventListResponse
    variant?: "desktop" | "carousel"
    style?: React.CSSProperties
    className?: string,
    isLoading?: boolean
}) {
    const isCarousel = variant === "carousel"

    return (
        <div
            className={`text-white bg-linear-to-tl from-[#000000] via-[#23445B] to-[#060400] rounded-2xl ${isCarousel ? "shadow-xl absolute" : "shadow-lg"} p-4 text-background ${className ?? ""}`}
            style={style}
        >
            {isLoading ? (
                <Skeleton className="w-full aspect-3/2 rounded-xl" />
            ) : (
                <img
                    src={info?.img ?? undefined}
                    alt={info?.title}
                    className="w-full aspect-3/2 rounded-xl object-cover"
                />
            )}

            <div className="mt-4">
                <div className="flex gap-4 text-sm">

                    {isLoading ? (
                        <>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                        </>
                    ) : (
                        <>
                            <span className="flex items-center gap-2">
                                <Calendar /> {parseDate(info.start)}
                            </span>

                            {info.type && (
                                <span className="flex items-center gap-2">
                                    <Bookmark /> {info.type}
                                </span>
                            )}
                        </>
                    )}
                </div>

                <div
                    className={`mt-4 flex flex-row items-end ${isCarousel ? "min-h-14" : "min-h-20"}`}>
                    {isLoading ? (
                        <Skeleton className="h-full w-3/4" />
                    ) : (
                        <h3
                            className={`font-semibold line-clamp-2 ${isCarousel ? "text-lg sm:text-xl leading-7" : "text-4xl leading-10"}`}>
                            {info.title}
                        </h3>
                    )}
                </div>
                <div className="mt-2 min-h-12">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ) : (
                        <p
                            className={`line-clamp-2 leading-6 ${isCarousel ? "text-xs sm:text-sm" : "text-sm"}`}>
                            {info.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
