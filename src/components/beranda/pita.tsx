import { cn } from "@/lib/utils";

export default function Pita({className}: {className?: string}) {
    return <img src="/assets/beranda/pita.png" className={cn(`z-1 w-screen absolute -mt-10 sm:-mt-15 md:-mt-30`, className)} alt="" />
}