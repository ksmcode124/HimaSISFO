"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      axis: orientation === "horizontal" ? "x" : "y",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      ...opts,
    },
    plugins
  )

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation,
        opts,
      }}
    >
      <div
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          "flex ml-0 sm:-ml-4",
          orientation === "horizontal"
            ? "ml-0 sm:-ml-4"
            : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}


function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full sm:basis-1/3",
        orientation === "horizontal" ? "pl-0 sm:pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselSpacer() {
  const { orientation } = useCarousel()
  
  return (
     <div
      aria-hidden
      className={cn(
        "hidden sm:block min-w-0 shrink-0 grow-0 sm:basis-1/3 sm:-mx-15 z-10",
        orientation === "horizontal" ? "pl-0 sm:pl-4" : "pt-4",
      )}
    />
  )
}

function CarouselPrevious(
  { className, ...props }: React.ComponentProps<typeof Button>
) {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      type="button"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn("relative z-10", className)}
      {...props}
    >
      <ArrowLeft />
    </Button>
  )
}

function CarouselNext(
  { className, ...props }: React.ComponentProps<typeof Button>
) {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      type="button"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn("relative z-10", className)}
      {...props}
    >
      <ArrowRight />
    </Button>
  )
}


export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSpacer,
  CarouselPrevious,
  CarouselNext,
}
