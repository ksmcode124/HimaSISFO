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
    <section className="relative px-6 sm:px-12 w-fit flex justify-center py-12">
      
      {/* Decorations */}
      <div className="absolute z-30 right-0 -translate-x-[10%] -translate-y-[20%] w-20 sm:w-28 xl:w-30 aspect-[4/3]">
        <Image
          src="/assets/kemahasiswaan/decoration-cloud-3.webp"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="absolute left-0 bottom-0 -translate-x-[15%] lg:-translate-x-[25%] rotate-[15deg] translate-y-[50%] lg:translate-y-[60%] w-72 aspect-[4/3]">
        <Image
          src="/assets/kemahasiswaan/decoration-cloud-1.webp"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* FolderCard */}
      <FolderCard
        title="Pendaftaran & Verifikasi"
        hasLayer
        widthClass="w-full max-w-3xl"
        maxHeightClass="max-h-[70vh] lg:max-h-[75vh]" // batas maksimal tinggi
      >
        <h1 className="sticky top-0 bg-[#EDF3F6] text-base sm:text-lg md:text-xl lg:text-3xl py-2 sm:py-4 md:py-6 lg:py-8 font-semibold mb-6 text-center">
          {item.title}
        </h1>

        {/* Content scrollable */}
        <div className="overflow-y-auto max-h-[calc(70vh-6rem)] lg:max-h-[calc(60vh-6rem)]">
          <ContentRenderer content={item.content as ContentBlock[]} />
        </div>
      </FolderCard>
    </section>
  )
}
