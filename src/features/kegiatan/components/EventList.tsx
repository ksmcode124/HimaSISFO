"use client"

import { useState, useEffect } from "react"
import { EventCard } from "./EventCard"
import { EventCardProps } from "../types"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function EventList({ events }: { events: EventCardProps[] }) {
    const [eventsPerPage, setEventsPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const update = () => setEventsPerPage(window.innerWidth < 768 ? 6 : 9)
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [currentPage])


    const totalPages = Math.ceil(events.length / eventsPerPage)

    const startIndex = (currentPage - 1) * eventsPerPage
    const visibleEvents = events.slice(startIndex, startIndex + eventsPerPage)

    const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
    const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

    return (
        <div className="py-5 md:py-10 px-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 mb-5 md:mb-10">
                {visibleEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        start={event.start}
                        end={event.end}
                        img={event.img ?? ""}
                        description={event.description}
                        variant="detail"
                        type={event.type}
                    />
                ))}
                {visibleEvents.length === 0 && (
                    <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center gap-10 text-center h-[400px] md:h-[600px] ">
                        <div className="w-full flex justify-center items-center">
                            <svg
                                width="162"
                                height="162"
                                viewBox="0 0 162 162"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M65.475 126.225L56.025 116.775L71.55 101.25L56.025 85.725L65.475 76.275L81 91.8L96.525 76.275L105.975 85.725L90.45 101.25L105.975 116.775L96.525 126.225L81 110.7L65.475 126.225ZM20.25 148.5V27H40.5V13.5H54V27H108V13.5H121.5V27H141.75V148.5H20.25ZM33.75 135H128.25V67.5H33.75V135ZM33.75 54H128.25V40.5H33.75V54Z"
                                    fill="black"
                                />
                            </svg>
                        </div>

                        <p className="font-bold text-sm md:text-xl text-[var(--color-dark-blue)]">
                            Tidak ada agenda yang tersedia di bulan ini
                        </p>
                    </div>

                )}
            </div>

            {/* Pagination buttons */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 md:gap-5  w-full">
                    <button
                        onClick={goPrev}
                        disabled={currentPage === 1}
                        className="items-center justify-center p-2 md:p-4 bg-gradient-to-b from-[#1B3C53] to-[#456882] disabled:opacity-50 rounded-full"
                    >
                        <ChevronLeft className="text-white text-[18px] md:text-[36px]" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <span key={page} className={`flex items-center justify-center text-[16px] md:text-[27px] w-7 md:w-10 h-7 md:h-10 rounded-full ${currentPage === page ? "bg-gradient-to-b from-[#1B3C53] to-[#456882] text-white" : "text-[var(--color-dark-blue)]"}`}>
                            {page}
                        </span>

                    ))}

                    <button
                        onClick={goNext}
                        disabled={currentPage === totalPages}
                        className="items-center justify-center p-2 md:p-4 bg-gradient-to-b from-[#1B3C53] to-[#456882] disabled:opacity-50 rounded-full"
                    >
                        <ChevronRight className="text-white text-[18px] md:text-[36px]" />
                    </button>
                </div>)}
        </div>
    )
}
