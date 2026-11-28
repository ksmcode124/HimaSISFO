import Image from "next/image"
import { cn } from "@/lib/utils/cn"

export function ShapeDecoration({
  position,
}: {
  position: "top-right" | "bottom-left"
}) {
  return (
    <div
      className={cn(
        "relative pointer-events-none select-none",
        "w-61.25 sm:w-80 lg:110 lg:w-170",
        "aspect-5/1",
        position === "top-right" && [
          "sm:hidden self-end -right-10 md:-right-15 lg:-right-20",
          "rotate-180",
          "mb-6 sm:mb-8 md:mb-10",
        ],
        position === "bottom-left" && [
          "self-start -left-10 md:-left-15 lg:-left-20 ",
          "mt-6 sm:mt-8 md:mt-10",
        ]
      )}
    >
      <Image
        src="/assets/kemahasiswaan/decoration-cloud-2.webp"
        alt=""
        className="object-contain"
        priority
        fill
      />
    </div>
  )
}
