import Image from "next/image"
import { ItemDataJSON } from "@/features/kemahasiswaan"
import { PendaftaranItemCard } from "../components/PendaftaranItemCard"

interface Props {
  items: ItemDataJSON[]
}

export function PendaftaranItemCollectionSection({ items }: Props) {
  return (
    <section className="relative grid grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto py-5 border border-black rounded-2xl mb-5">
      {items.map((item) => (
        <PendaftaranItemCard key={item.id} item={item} />
      ))}

      <Decoration />
    </section>
  )
}

function Decoration() {
  return (
    <>
      <div className="aspect-4/3 -z-1 w-120 absolute bottom-0 translate-y-[30%] -translate-x-[45%] rotate-15">
        <Image
          src="/assets/kemahasiswaan/decoration-cloud-1.webp"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="aspect-4/3 -z-1 w-90 absolute bottom-0 right-0 translate-y-[30%] translate-x-[45%] -rotate-10">
        <Image
          src="/assets/kemahasiswaan/decoration-cloud-1.webp"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </>
  )
}
