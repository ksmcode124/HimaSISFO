import { cn } from "@/lib/utils/cn"

interface HeroViewProps {
  title: string
  subtitle: string
  minHeightClass: string
}

export function HeroView({
  title,
  subtitle,
  minHeightClass,
}: HeroViewProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20",
        minHeightClass
      )}
    >
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
        {title}
      </h1>
      <h2 className="font-semibold text-base sm:text-lg md:text-xl text-center mt-2 sm:mt-4">
        {subtitle}
      </h2>
    </section>
  )
}