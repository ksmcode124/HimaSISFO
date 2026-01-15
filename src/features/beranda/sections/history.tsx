import { berandaData } from "..";
import { HistorySection } from "../types";

export default function History() {
    const { history, statistics } = berandaData;
    return <div className="relative">
        <div className="min-h-screen py-30 lg:py-60 mx-16">
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative">
                    <img className="w-full" src="/assets/beranda/sejarah.png" alt="" />
                    <div className="absolute -bottom-10 scale-105 flex gap-8 justify-end w-full lg:-right-60">
                        {statistics.map((statistic, index) => (
                            <div key={index} className="rounded-4xl w-sm border-gray-400 p-10 border bg-white">
                                <span className="text-xl font-semibold">{statistic.label}</span>
                                <p className="text-sm">{statistic.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-10 lg:mt-0 mt-8">
                    <h2 className="text-4xl font-bold">SEJARAH <br className="hidden lg:block" /> HIMASISFO</h2>
                    <p className="text-sm text-justify">{history.content}</p>
                </div>
            </div>
        </div>
    </div>
}