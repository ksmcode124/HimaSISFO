import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Props {
  title: string
  subtitle: string
  iconUrl: string
  href: string
}

export function BlankoCTA({ title, subtitle, iconUrl, href }: Props) {
  return (
    <section className="w-full py-20 xl:py-60 grid grid-cols-2 items-center justify-items-center px-2 lg:mb-15">
      <div className="relative -translate-x-5 lg:-translate-x-15 size-32 sm:size-64 lg:size-80 xl:size-96 z-20">
        <Image
          src={iconUrl}
          alt="Blanko Icon"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 text-center items-center max-w-xl z-20">
        <h1 className="font-semibold font-heading text-xl sm:text-2xl md:text-4xl lg:text-6xl leading-tight text-[#323257]">
          {title}
        </h1>

        <p className="text-2xs sm:text-xs md:text-sm lg:text-xl leading-relaxed text-[#323257]">
          {subtitle}
        </p>

        <Button asChild variant="hima">
          <Link
            href={href}
            className="text-xs lg:text-sm px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-5 lg:py-4 2xl:px-6 2xl:py-5"
          >
            Selengkapnya ➔
          </Link>
        </Button>
      </div>
    </section>
  )
}
