"use client";
import React, { useEffect, useState } from 'react'
import { berandaData } from '..';
import { Bookmark, Calendar } from 'lucide-react';

export default function InfoCardGrid() {
    const data = berandaData.latest_information;
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
            <div className="relative h-100 w-full lg:hidden" >
                {
                    data.items.map((info, i) => {
                        const centerIndex = Math.floor(data.items.length / 2);
                        const offset = i - centerIndex;
                        const translateXValue = isMobile ? 95 : 200;


                        return (
                            <div
                                key={i}
                                className=" absolute top-1/2 left-1/2 w-[300px] bg-linear-to-tl from-[#000000] via-[#23445B] to-[#060400] rounded-2xl shadow-xl p-4 text-background transition-all duration-300"
                                style={{
                                    transform: `translate(-50%, -50%) translateX(${offset * translateXValue}px) scale(${offset === 0 ? 1 : 0.9})`,
                                    zIndex: 50 - Math.abs(offset),
                                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                                }}
                            >
                                <img
                                    src="/assets/beranda/informasi.png"
                                    alt=""
                                    className="w-full aspect-3/2 rounded-xl object-cover"
                                />

                                <div className="mt-4">
                                    <h3 className="font-semibold text-xl">{info.title}</h3>
                                    <p className="text-sm mt-1 line-clamp-2">{info.excerpt}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div >

            {/* DESKTOP — grid 3 kolom normal */}
            < div className="hidden lg:grid grid-cols-3 gap-6 px-12 mt-8" >
                {
                    data.items.map((info, i) => (
                        <div
                            key={i}
                            className=" bg-linear-to-tl from-[#000000] via-[#23445B] to-[#060400] rounded-2xl shadow-lg p-4 text-background"
                        >
                            <img
                                src="/assets/beranda/informasi.png"
                                alt=""
                                className="w-full aspect-3/2 rounded-xl object-cover"
                            />

                            <div className="mt-4">
                                <div className="flex gap-4 text-sm">
                                    <span className="flex items-center gap-2">
                                        <Calendar /> {info.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Bookmark /> {info.category}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-4xl mt-4">{info.title}</h3>
                                <p className="text-sm mt-2 line-clamp-2">{info.excerpt}</p>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}
