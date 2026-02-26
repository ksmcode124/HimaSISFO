"use client"
import { ArrowRight } from "lucide-react";
import InfoCardGrid from "../components/info-card-grid";
import useBeranda from "../hooks/useBeranda";
import Link from "next/link";
import { EventListResponse } from "@/lib/types/interface";

export default function Information() {
    const { data, isLoading } = useBeranda();
    const dummyEvents: EventListResponse[] = [
        {
            description: 'asd',
            end: '18-10-22',
            id: 1,
            img: '/assets/beranda/kabinet/1.png',
            start: '18-10-22',
            title: 'some',
            type: 'a',
            kabinet: {
                id_kabinet: 1,
                nama_kabinet: 'string',
                tahun_kerja: '2024',
            }
        },
        {
            description: 'asd',
            end: '18-10-22',
            id: 1,
            img: '/assets/beranda/kabinet/1.png',
            start: '18-10-22',
            title: 'some',
            type: 'a',
            kabinet: {
                id_kabinet: 1,
                nama_kabinet: 'string',
                tahun_kerja: '2024',
            }
        },
        {
            description: 'asd',
            end: '18-10-22',
            id: 1,
            img: '/assets/beranda/kabinet/1.png',
            start: '18-10-22',
            title: 'some',
            type: 'a',
            kabinet: {
                id_kabinet: 1,
                nama_kabinet: 'string',
                tahun_kerja: '2024',
            }
        },
    ]
    // console.log(data);
    return (
        <div className="relative md:min-h-screen overflow-hidden">

            {/* cloud decoration (paling bawah) */}
            <div className="absolute bottom-0 left-0 z-0 flex w-full justify-between pointer-events-none">
                <img src="/assets/beranda/awan/info1.svg" className="w-1/3" alt="" />
                <img src="/assets/beranda/awan/info2.svg" className="w-1/3" alt="" />
            </div>

            {/* decorative background (di atas cloud) */}
            <img
                src="/assets/beranda/informasi-decorative.png"
                className="absolute inset-x-0 top-0 md:mt-50 mt-70 w-full z-10 pointer-events-none"
                alt=""
            />

            {/* main content (paling atas) */}
            <div className="relative z-20 flex flex-col items-center justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    INFORMASI TERBARU
                </h2>

                <InfoCardGrid events={data?.events} isLoading={isLoading} />
                {/* <InfoCardGrid events={dummyEvents} isLoading={isLoading} /> */}

                <Link
                    href="/kegiatan"
                    className="rounded-full flex bg-primary text-white items-center gap-2 hover:bg-primary/90 cursor-pointer py-4 px-5 mt-8 text-lg"
                >
                    Selengkapnya <ArrowRight />
                </Link>
            </div>

        </div>
    );

}