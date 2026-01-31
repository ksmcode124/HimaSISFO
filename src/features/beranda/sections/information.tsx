import { ArrowRight, Bookmark, Calendar } from "lucide-react";
import { berandaData } from "..";
import { Button } from "@/components/ui/button";
import InfoCardGrid from "../components/info-card-grid";

export default function Information() {
    const data = berandaData.latest_information;
    return (
        <div className="relative z-0 min-h-screen overflow-hidden">
            {/* decorative background */}
            <img
                src="/assets/beranda/informasi-decorative.png"
                className="absolute inset-x-0 top-0 md:mt-80 mt-90 w-full -z-10 pointer-events-none"
                alt=""
            />

            {/* main content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
                <h2 className="text-4xl font-bold">INFORMASI TERBARU</h2>

                <InfoCardGrid />

                <Button
                    className="rounded-full py-4 px-5 mt-8 text-lg"
                    size="lg"
                >
                    Selengkapnya <ArrowRight />
                </Button>
            </div>

            {/* cloud decoration */}
            <div className="absolute top-0 left-0 z-0 flex w-screen justify-between pointer-events-none">
                <img src="/assets/beranda/awan/info1.svg" className="w-1/3" alt="" />
                <img src="/assets/beranda/awan/info2.svg" className="w-1/3" alt="" />
            </div>
        </div>
    );

}