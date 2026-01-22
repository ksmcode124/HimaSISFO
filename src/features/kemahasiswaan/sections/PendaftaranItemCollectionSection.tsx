import Image from "next/image"
import { ItemDataJSON } from "@/features/kemahasiswaan"
import { PendaftaranItemCard } from "../components/PendaftaranItemCard"
import { LiquidGlass } from "@liquidglass/react"
import { Glass } from "@/components/ui/Glass"

interface Props {
  items: ItemDataJSON[]
}

export function PendaftaranItemCollectionSection({ items }: Props) {
  return (
    <section className="relative flex items-center justify-center w-[90%] mb-5 mx-auto">
      <Glass
        borderRadius={24}
        className="w-[90%] max-w-7xl p-6 relative flex justify-center border border-neutral-400"
      >

        {/* Item Grid */}
        <div className="relative w-full grid grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 py-5 rounded-2xl">
          {items.map((item) => (
            <PendaftaranItemCard key={item.id} item={item} />
          ))}
        </div>
      </Glass>
      <Decoration />
    </section>
  )
}

function Decoration() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        {/* Left Bottom */}
        <div className="absolute bottom-0 left-0 w-40 sm:w-60 md:w-80 lg:w-90 xl:w-120 aspect-4/3 -translate-x-1/4 lg:translate-x-1/4 translate-y-1/3 rotate-15">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-1.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Right Bottom */}
        <div className="absolute bottom-0 right-0 w-32 sm:w-50 md:w-70 lg:w-90 xl:w-120 aspect-4/3 translate-x-1/6 lg:-translate-x-1/4 translate-y-1/3 -rotate-10">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-1.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  )
}
