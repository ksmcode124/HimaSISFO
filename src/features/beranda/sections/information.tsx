"use client"
import { ArrowRight, Bookmark, Calendar } from "lucide-react";
import InfoCardGrid from "../components/info-card-grid";
import useBeranda from "../hooks/useBeranda";
import Link from "next/link";

export default function Information() {
    const { data, isLoading, error } = useBeranda();
    // console.log(data);
    return (
        <div className="relative z-0 md:min-h-screen overflow-hidden">
            {/* decorative background */}
            <img
                src="/assets/beranda/informasi-decorative.png"
                className="absolute inset-x-0 top-0 md:mt-50 mt-70 w-full -z-10 pointer-events-none"
                alt=""
            />

            {/* main content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">INFORMASI TERBARU</h2>

                <InfoCardGrid events={data?.events} isLoading={isLoading} />

                <Link
                    href="/kegiatan"
                    className="rounded-full flex bg-primary text-white items-center gap-2 hover:bg-primary/90 cursor-pointer py-4 px-5 mt-8 text-lg"
                >
                    Selengkapnya <ArrowRight />
                </Link>
            </div>

            {/* cloud decoration */}
            <div className="absolute top-0 left-0 z-0 flex w-screen justify-between pointer-events-none">
                <img src="/assets/beranda/awan/info1.svg" className="w-1/3" alt="" />
                <img src="/assets/beranda/awan/info2.svg" className="w-1/3" alt="" />
            </div>
        </div>
    );

}