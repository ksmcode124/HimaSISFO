interface HeroViewProps {
  title: string
  subtitle: string
}

export function HeroView({ title, subtitle }: HeroViewProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-20 text-center">
      <h1 className="font-bold text-[clamp(1.25rem,5vw,2.25rem)] leading-tight">
        {title}
      </h1>

      <h2 className="mt-2 sm:mt-4 font-semibold text-[clamp(0.875rem,3vw,1.25rem)] leading-snug text-gray-700">
        {subtitle}
      </h2>
    </section>
  )
}
