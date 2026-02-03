import Image from "next/image"
import { ItemDataJSON } from "@/features/kemahasiswaan"
import { PendaftaranItemCard } from "../components/PendaftaranItemCard"
import { Glass } from "@/components/ui/Glass"

interface Props {
  items: ItemDataJSON[]
}

export function PendaftaranItemCollectionSection({ items }: Props) {
  return (
    <section className="relative flex items-center justify-center w-[90%] mb-5 mx-auto">
      <Glass
        className="w-[90%] max-w-7xl relative border border-neutral-400 rounded-6xl"
      >

        {/* Item Grid */}
        <div className="w-full grid grid-cols-12 *:col-span-6 *:last:col-start-4 md:grid-cols-12 md:col-span-4 md:*:last:col-start-4 gap-6 px-6 lg:px-12 py-5 rounded-2xl">
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
        <div className="absolute bottom-0 left-0 w-36 sm:w-52 md:w-80 lg:w-115 xl:w-120 aspect-4/3 -translate-x-1/4 lg:translate-x-1/4 translate-y-1/3 rotate-15">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-1.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Right Bottom */}
        <div className="absolute bottom-0 right-0 w-36 sm:w-48 md:w-72 lg:w-95 xl:w-120 aspect-4/3 translate-x-1/6 lg:-translate-x-1/4 translate-y-1/3 -rotate-10">
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
