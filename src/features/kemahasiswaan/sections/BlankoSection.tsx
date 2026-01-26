import Image from "next/image"
import { ShellLayer } from "@/components/layout/ShellLayer"
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer"
import { CTASection } from "../types/ui"
import { useBlankoSection } from "../hooks/useBlankoSection"
import { BlankoCTA } from "../components/BlankoCTA"

export function BlankoSection(data: CTASection) {
  const blanko = useBlankoSection(data)

  return (
    <ShellLayer>
      <BackgroundLayer>
        <div className="absolute w-full min-h-[60vh] z-10">
          <Image
            src="/assets/kemahasiswaan/bg-blanko.webp"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      </BackgroundLayer>

      <ContentLayer>
        <BlankoCTA {...blanko} />
      </ContentLayer>
    </ShellLayer>
  )
}
