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
        <div className="mb-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 my-5 md:my-10">
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
            </div>

            {/* Pagination buttons */}
            <div className="flex justify-center items-center gap-5 mt-6 w-full">
                <button
                    onClick={goPrev}
                    disabled={currentPage === 1}
                    className="items-center justify-center p-4 bg-gradient-to-b from-[#1B3C53] to-[#456882] disabled:opacity-50 rounded-full"
                >
                    <ChevronLeft size={36} className="text-white" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <span key={page} className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === page ? "bg-gradient-to-b from-[#1B3C53] to-[#456882] text-white" : "text-[var(--color-dark-blue)]"}`}>
                        {page}
                    </span>

                ))}

                <button
                    onClick={goNext}
                    disabled={currentPage === totalPages}
                    className="items-center justify-center p-4 bg-gradient-to-b from-[#1B3C53] to-[#456882] disabled:opacity-50 rounded-full"
                >
                    <ChevronRight size={36} className="text-white" />
                </button>
            </div>
        </div>
    )
}
