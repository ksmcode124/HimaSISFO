import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export function CloudDecoration({className}: {className?: string}) {
  return (
    <div className={cn("grid grid-cols-3 mt-5 gap-4 w-full mb-10 py-10 scale-120 sm:scale-100", className)}>
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className="relative w-full aspect-3/1" // 👈 kontrol ukuran di sini
        >
          <Image
            src={`/assets/kemahasiswaan/decoration-cloud-${i === 1 ? 1 : 2}.webp`}
            alt=""
            fill
            className={cn(
              "object-contain",
              i === 0 ? "rotate-x-180 translate-x-[25%] -translate-y-[10%]" : "",
              i === 1 ? "rotate-z-180 translate-y-[25%]": "",
              i === 2 ? "rotate-z-180 -translate-x-[20%] -translate-y-[20%]" : "",
            )}
          />
        </div>
      ))}
    </div>
  )
}
