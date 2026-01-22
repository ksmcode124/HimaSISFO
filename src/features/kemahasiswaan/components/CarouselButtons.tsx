import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCarousel } from "@/components/ui/carousel"
import { LiquidGlass } from "@liquidglass/react"
import { Triangle } from "lucide-react"

const buttonStyle = "w-20 h-20 sm:h-24 sm:w-24 flex items-center justify-center rounded-full"
const glassStyle = "absolute flex items-center z-20 max-w-20 max-h-20 sm:max-w-24 sm:max-h-24"
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
          "-translate-x-full rounded-full",
          glassStyle,
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        )}
      >
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className={cn(buttonStyle, !canScrollNext ? "hidden" : "", className)}
          disabled={!canScrollNext}
          onClick={scrollNext}
          {...props}
        >
          <Triangle className="rotate-90 size-8" fill="black" strokeWidth={0}/>
        </Button>
      </LiquidGlass>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <LiquidGlass
        blur={12}
        saturation={1.2}
        elasticity={0}
        borderRadius={9999}
        className={cn(
          "translate-x-full rounded-full",
          glassStyle,
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        )}
      >
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className={cn(buttonStyle, className, !canScrollPrev ? "hidden" : "",)}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          {...props}
        >
          <Triangle className="-rotate-90 size-8" fill="black" strokeWidth={0} />
        </Button>
      </LiquidGlass>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"
