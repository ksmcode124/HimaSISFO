interface HeroViewProps {
  title: string
  subtitle: string
}

export function HeroView({ title, subtitle }: HeroViewProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-20 text-center">
      <h2 className="font-bold font-heading text-xl sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-5xl leading-tight">
        {title}
      </h2>

      <h3 className="mt-2 sm:mt-4 font-body font-semibold text-base sm:text-lg md:text-xl lg:text-3xl 2xl:text-3xl leading-snug">
        {subtitle}
      </h3>
    </section>
  )
}
