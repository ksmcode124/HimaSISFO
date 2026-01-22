interface HeroViewProps {
  title: string
  subtitle: string
}

export function HeroView({ title, subtitle }: HeroViewProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-20 text-center">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
        {title}
      </h1>

      <h2 className="mt-2 sm:mt-4 font-semibold text-base sm:text-lg md:text-xl">
        {subtitle}
      </h2>
    </section>
  )
}
