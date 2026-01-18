import { ContentBlock, ItemDataJSON } from "@/features/kemahasiswaan"
import { FlipHorizontal, GraduationCap } from "lucide-react"
import { FlipCard } from "./Flipcard"
import { ContentRenderer } from "./ContentRenderer"

interface Props {
  item: ItemDataJSON
}

export function WisudaFlipCard({ item }: Props) {
  return (
    <FlipCard
      className="
        w-full h-72 sm:h-80 lg:h-88
        rounded-xl shadow-md overflow-hidden relative
      "
      front={
        <>
          <h3 className="text-sm sm:text-base lg:text-lg text-center font-semibold transition-transform duration-500 group-hover:-translate-y-2">
            {item.title}
          </h3>
          <FlipHorizontal className="absolute bottom-4 left-4 text-[#BCCCDC]" />
          <GraduationCap className="absolute top-4 right-4 text-[#BCCCDC]" />
        </>
      }
      back={
        <>
          <div className="flex flex-col h-full relative">
            <div className="sticky top-0 z-10 py-2">
              <h3 className="font-semibold text-center text-xs">
                {item.title}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto text-xs pr-1">
              <ContentRenderer content={item.content as ContentBlock[]} />
            </div>
          </div>
          <GraduationCap className="absolute top-4 right-4 text-black" />
        </>
      }
    />
  )
}
