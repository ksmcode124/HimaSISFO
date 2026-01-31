import { cn } from "@/lib/utils";

export default function Pita({className}: {className?: string}) {
    return <img src="/assets/beranda/pita.png" className={cn(`z-1 w-screen absolute -mt-30`, className)} alt="" />
}