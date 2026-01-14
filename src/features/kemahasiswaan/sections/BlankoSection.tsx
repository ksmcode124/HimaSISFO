import Link from "next/link"
import { CTASection } from "../types"
import Image from "next/image"
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"

export default function BlankoSection({ title, subtitle, iconUrl }: CTASection) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <div className="absolute w-full min-h-[60vh] z-10">
          <Image
            src="/assets/kemahasiswaan/bg-blanko.webp"
            alt="Blanko Icon"
            className="object-cover"
            fill
            priority
          />
        </div>
      </BackgroundLayer>
      <ContentLayer>    
        <section className="w-full min-h-[55vh] grid grid-cols-2 bg-center items-center justify-items-center px-2">
          <div className="relative -translate-x-15 h-32 w-32 sm:h-64 sm:w-64 lg:h-96 lg:w-96 z-20">
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
              className="text-[10px] sm:text-xs lg:text-sm rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-t from-[#456882] to-50%-[#1F445F] to-[#1B3C53] text-white"
            >
              Selengkapnya ➔
            </Link>
          </div>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}
