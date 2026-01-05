import Link from "next/link"
import { CTASection } from "../types"
import Image from "next/image"

export default function BlankoSection({ title, subtitle, iconUrl }: CTASection) {
  return (
    <section className="w-full min-h-[55vh] grid grid-cols-2 bg-center items-center justify-items-center px-2">
      <div className="relative h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64 z-20">
        <Image
          src={iconUrl}
          alt="Blanko Icon"
          className="object-contain"
          fill
          priority
        />
      </div>


      <div className="flex flex-col gap-3 sm:gap-4 text-center items-center max-w-xl z-20">
        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl leading-tight">
          {title}
        </h1>

        <p className="font-medium text-sm sm:text-base lg:text-xl leading-relaxed">
          {subtitle}
        </p>

        <Link
          href="kemahasiswaan/blanko"
          className="text-[10px] sm:text-xs lg:text-sm rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 bg-tb-gradient-primary text-white"
        >
          Selengkapnya ➔
        </Link>
      </div>

      <div className="absolute w-screen min-h-[60vh] z-10">
        <Image
          src="/assets/kemahasiswaan/bg-blanko.webp"
          alt="Blanko Icon"
          className="object-cover"
          fill
          priority
        />
      </div>
    </section>
  )
}
