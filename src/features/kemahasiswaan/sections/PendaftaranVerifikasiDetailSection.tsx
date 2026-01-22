import Image from "next/image"
import { ItemDataJSON } from "../types/data"
import { ContentBlock } from "../types/content"
import { ContentRenderer } from "../components/ContentRenderer"
import { FolderCard } from "../components/FolderCard"

interface Props {
  item: ItemDataJSON
}

export function PendaftaranVerifikasiDetailSection({ item }: Props) {
  return (
    <section className="px-12 mx-auto min-h-[65vh] flex justify-center relative">
      <div className="relative h-60 max-h-80">
        {/* Decorations */}
        <div className="aspect-4/3 w-40 :w-48 xl:w-60 absolute z-30 right-0 translate-x-[45%] -translate-y-[20%]">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-3.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="aspect-4/3 w-72 absolute left-0 bottom-0 -translate-x-[45%] lg:-translate-x-[65%] rotate-15 translate-y-[150%] lg:translate-y-[160%]">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-1.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <FolderCard title="Pendaftaran & Verifikasi" hasLayer>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-center">
            {item.title}
          </h1>

          <ContentRenderer content={item.content as ContentBlock[]} />
        </FolderCard>
      </div>
    </section>

  )
}
