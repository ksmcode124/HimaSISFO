import { Button } from "@/components/ui/button";
import { ScaleCarousel } from "@/components/ui/scale-carousel";
import { ArrowRight } from "lucide-react";
import Awan from "../components/awan";

export default function Kabinet() {
    return <div className="">
        <div
            className=" grid lg:grid-cols-2 min-h-screen px-16 items-center bg-[url('/assets/beranda/kabinet-bg.png')] bg-cover bg-center mask-[linear-gradient(to_bottom,transparent,black,transparent)] mask-size-[100%_100%] mask-no-repeat  "
        >
            <div className="lg:order-1 order-2 flex items-center text-white w-full lg:justify-center">
                <div className="lg:w-sm text-justify">
                    <h2 className="text-2xl font-bold">KABINET GELORA HARMONI</h2>
                    <p className="w-full">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident molestias ipsam molestiae autem harum repellat recusandae laudantium nobis! Non, quod?</p>
                    <Button className="mt-4 rounded-full" size={"lg"}>Selengkapnya <ArrowRight /></Button>
                </div>
            </div>
            <ScaleCarousel className="lg:order-2" opts={{
                loop: true, align: 'center', breakpoints: {
                    '(min-width: 1024px)': { align: 'start' },
                },
            }}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-100 bg-amber-50 rounded-lg border"></div>
                ))}
            </ScaleCarousel>
        </div>
        <Awan />
    </div>
}