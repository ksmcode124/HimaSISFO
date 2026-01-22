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
    <section className="w-full min-h-[55vh] grid grid-cols-2 items-center justify-items-center px-2">
      <div className="relative -translate-x-5 lg:-translate-x-15 h-32 w-32 sm:h-64 sm:w-64 lg:h-96 lg:w-96 z-20">
        <Image
          src={iconUrl}
          alt="Blanko Icon"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 text-center items-center max-w-xl z-20">
        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl leading-tight">
          {title}
        </h1>

        <p className="font-medium text-sm sm:text-base lg:text-xl leading-relaxed">
          {subtitle}
        </p>

        <Button asChild variant="hima">
          <Link
            href={href}
          >
            Selengkapnya ➔
          </Link>
        </Button>
      </div>
    </section>
  )
}
