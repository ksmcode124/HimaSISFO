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
    <section className="grid grid-cols-12 min-h-[50vh] w-full justify-items-center place-items-center relative">

      <div className="relative col-span-12 lg:col-span-8 lg:col-start-3 xl:col-start-4 xl:col-span-6 w-full h-full flex items-center justify-center">
        <div className="
          absolute z-30 top-0 right-0 w-22.5 sm:w-36 md:w-52 lg:w-45 aspect-4/3
          -translate-x-[40%] translate-y-[80%]
          md:translate-0
        ">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-3.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="
          absolute left-0 bottom-0 rotate-15 w-35 sm:w-52 md:w-80 xl:w-115 aspect-4/3
          -translate-x-[5%] translate-y-[8%]
          md:translate-y-[25%] md:-translate-x-[10%]
          lg:translate-y-[35%] lg:-translate-x-[25%]
        ">
          <Image
            src="/assets/kemahasiswaan/decoration-cloud-1.webp"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <FolderCard hasLayer title="Pendaftaran dan Verifikasi" heightClass="h-[70%] lg:h-[80%]">
          <h1 className="sticky top-0 bg-[#EDF3F6] text-sm sm:text-lg md:text-xl lg:text-3xl py-2 sm:py-4 md:py-6 lg:py-8 font-semibold text-center">
            {item.title}
          </h1>

          {/* Content scrollable */}
          <div className="overflow-y-auto max-h-[calc(70vh-6rem)] lg:max-h-[calc(60vh-6rem)] pb-5">
            <ContentRenderer content={item.content as ContentBlock[]} />
          </div>
        </FolderCard>
      </div>


    </section>
  )
}
