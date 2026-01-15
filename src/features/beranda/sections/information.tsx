import { ArrowRight, Bookmark, Calendar } from "lucide-react";
import { berandaData } from "..";
import { Button } from "@/components/ui/button";

export default function Information() {
    const data = berandaData.latest_information;
    return <div className="flex min-h-screen items-center flex-col justify-center">
        <h2 className="text-4xl font-bold">INFORMASI TERBARU</h2>
        <img src="/assets/beranda/informasi-decorative.png" className="-mb-200 mt-60 w-full" alt="" />
        <div className="grid grid-cols-3 px-12">
            {data.items.map((info, i) => (
                <div key={i} className="h-fit bg-linear-to-tl from-[#000000] via-[#23445B] to-[#060400] m-8 rounded-2xl shadow-lg p-4 text-background">
                    <img src="/assets/beranda/informasi.png" alt="" className="w-full aspect-3/2 bg-accent rounded-xl" />
                    <div className="mt-4">
                        <div className="flex gap-4">
                            <span className="text-sm flex w-fit gap-2 items-center"><Calendar />{info.date}</span>
                            <span className="text-sm flex w-fit gap-2 items-center"><Bookmark /> {info.category}</span>
                        </div>
                        <h3 className="font-semibold text-4xl mt-4">{info.title}</h3>
                        <p className="text-sm mt-2 line-clamp-2">{info.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>
        <Button className="rounded-full py-4 px-5 mt-8 text-lg" size={'lg'}>Selengkapnya <ArrowRight /></Button>
    </div>
}