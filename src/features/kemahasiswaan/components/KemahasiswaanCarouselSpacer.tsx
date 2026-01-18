import { cn } from "@/lib/utils"
import { useCarousel } from "@/components/ui/carousel"

export function KemahasiswaanCarouselSpacer() {
  const { orientation } = useCarousel()

  return (
    <div
      aria-hidden
      data-embla-ignore
      className={cn(
        "shrink-0 sm:basis-1/3 sm:-mx-15",
        orientation === "horizontal" ? "pl-4" : "pt-4"
      )}
    />
  )
}
