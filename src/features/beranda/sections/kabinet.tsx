"use client";
import { ScaleCarousel } from "@/components/ui/scale-carousel";
import { ArrowRight } from "lucide-react";
import Awan from "../components/awan";
import { useState } from "react";
import Link from "next/link";

export default function Kabinet() {
    const [kabinetSelected, setKabinetSelected] = useState(0);
    const kabinetData = [
        {
            title: "KABINET GELORA HARMONI",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime sequi ducimus iste molestias earum quos sit illum voluptate fuga distinctio.",
            image: "/assets/beranda/kabinet/1.png",
        },
        {
            title: "KABINET AKSAYAPATRA",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime sequi ducimus iste molestias earum quos sit illum voluptate fuga distinctio.",
            image: "/assets/beranda/kabinet/2.png",
        },
        {
            title: "KABINET EKSPANSI",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime sequi ducimus iste molestias earum quos sit illum voluptate fuga distinctio.",
            image: "/assets/beranda/kabinet/3.png",
        },
    ];
    return <div className="">
        <div
            className=" grid lg:grid-cols-2 pb-30 md:min-h-screen px-4 md:px-16 items-center bg-cover bg-black bg-center  mask-[linear-gradient(to_bottom,transparent_0%,black_20%,black_90%,transparent_100%)] md:mask-[linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)] lg:mask-[linear-gradient(to_bottom,transparent_0%,black_40%,black_60%,transparent_100%)] mask-size-[100%_100%] mask-no-repeat  "
            style={{ backgroundImage: `url('/assets/beranda/kabinet/${kabinetSelected + 1}.png')` }}
        >
            <div className="lg:order-1 order-2 flex items-center text-white w-full lg:justify-center">
                <div className="lg:w-sm text-justify">
                    <h2 className="text-2xl font-bold">{kabinetData[kabinetSelected].title}</h2>
                    <p className="w-full text-xs sm:text-base line-clamp-4 min-h-22 sm:min-h-24">{kabinetData[kabinetSelected].desc}</p>
                    <Link href={`/kabinet/${kabinetSelected + 1}`}
                        className="rounded-full w-fit flex bg-primary text-white items-center gap-2 hover:bg-primary/90 cursor-pointer py-4 px-5 mt-8 text-lg"
                    >Selengkapnya <ArrowRight /></Link>
                </div>
            </div>
            <ScaleCarousel className="lg:order-2 mt-20" opts={{
                loop: true, align: 'center', breakpoints: {
                    '(min-width: 1024px)': { align: 'start' },
                },
            }} onSelect={(index) => setKabinetSelected(index % kabinetData.length)}>
                {[...kabinetData, ...kabinetData].map((kabinet, i) => (
                    <div
                        key={i}
                        className="relative aspect-3/4 rounded-lg overflow-hidden"
                    >
                        <img src={kabinet.image} className={"absolute object-cover h-full inset-0 bg-amber-50"} />
                        <div className={"absolute inset-0 bg-black/50" + (i === kabinetSelected ? " opacity-0" : " opacity-50")} />
                    </div>
                ))}
            </ScaleCarousel>
        </div>
        <Awan />
    </div>
}