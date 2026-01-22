import { cn } from "@/lib/utils"

interface Params {
  isActive: boolean
  isNeighbor: boolean
}

export function getCarouselItemClass({ isActive, isNeighbor }: Params) {
  return cn(
    "h-90 z-20 ease-in",
    isActive && "basis-full sm:basis-1/2 z-30 duration-900",
    isNeighbor && "basis-full sm:basis-1/3 sm:-mx-25 z-20 duration-500",
    !isActive && !isNeighbor &&
      "basis-full sm:basis-1/3 sm:mx-25 z-10 duration-700"
  )
}
