import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCarousel } from "@/components/ui/carousel"
import { LiquidGlass } from "@liquidglass/react"

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <LiquidGlass
        blur={12}
        saturation={1.2}
        elasticity={0}
        borderRadius={9999}
        className={cn(
          "absolute z-20 max-w-16 max-h-16 -translate-x-15",
          orientation === "horizontal"
            ? "-right-12 top-1/2"
            : "-bottom-12 left-1/2 rotate-90",
        )}
      >
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className={cn("w-16 h-16 flex items-center justify-center rounded-full", !canScrollNext ? "hidden" : "", className)}
          disabled={!canScrollNext}
          onClick={scrollNext}
          {...props}
        >
          <span className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-black" />
          <span className="sr-only">Next slide</span>
        </Button>
      </LiquidGlass>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel() // <- fix sini

    return (
      <LiquidGlass
        blur={12}
        saturation={1.2}
        elasticity={0}
        borderRadius={9999}
        className={cn(
          "absolute z-20 max-w-16 max-h-16 translate-x-15",
          orientation === "horizontal"
            ? "-left-12 top-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        )}
      >
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className={cn("w-16 h-16 flex items-center justify-center rounded-full", className, !canScrollPrev ? "hidden" : "",)}
          disabled={!canScrollPrev} // <- fix sini
          onClick={scrollPrev} // <- fix sini
          {...props}
        >
          <span className="w-0 h-0 border-t-[8px] border-b-[8px] border-r-[12px] border-t-transparent border-b-transparent border-r-black" />
          <span className="sr-only">Previous slide</span>
        </Button>
      </LiquidGlass>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"
