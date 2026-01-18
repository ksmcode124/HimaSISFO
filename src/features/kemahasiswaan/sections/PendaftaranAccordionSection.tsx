import Image from "next/image"
import { ItemDataJSON } from "../types/data"
import { HorizontalAccordion } from "../components/HorizontalAccordion"

interface Props {
  items: ItemDataJSON[]
}

export function PendaftaranAccordionSection({ items }: Props) {
  return (
    <section className="max-w-7xl mb-10 mx-auto space-y-5">
      <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
        <div className="relative h-50 w-50">
          <Image
            src="/assets/kemahasiswaan/icon-pendaftaran-dan-verifikasi.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <HorizontalAccordion items={items} />
      </div>
    </section>
  )
}
