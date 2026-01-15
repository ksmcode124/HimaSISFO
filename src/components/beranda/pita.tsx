import { cn } from "@/lib/utils";

export default function Pita({className}: {className?: string}) {
    return <img src="/assets/beranda/pita.png" className={cn(`w-full absolute -mt-30`, className)} alt="" />
}