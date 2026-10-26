import { ContentBlock, ItemDataJSON } from "@/features/kemahasiswaan"
import { FlipHorizontal, GraduationCap } from "lucide-react"
import { FlipCard } from "./Flipcard"
import { ContentRenderer } from "./ContentRenderer"

interface Props {
  item: ItemDataJSON
  setSelectedIdAction: (id: string | null) => void
}

export function WisudaFlipCard({ item, setSelectedIdAction }: Props) {
  return (
    <FlipCard
      id={item.id}
      setSelectedIdAction={setSelectedIdAction}
      className="w-full aspect-square lg:aspect-4/3 rounded-xl shadow-md overflow-hidden relative"
      front={
        <>
          <h3 className="   text-center font-semibold transition-transform duration-500 group-hover:-translate-y-2">
            {item.title}
          </h3>
          <FlipHorizontal className="absolute bottom-4 left-4 text-[#BCCCDC]" />
          
          {/* GraduationCap outline */}
          <GraduationCap
            className="absolute top-4 right-4 text-[#BCCCDC]"
            strokeWidth={2}   // ketebalan garis
            fill="none"       // fill transparan
          />
        </>
      }
      back={
        <>
          <div className="flex flex-col h-full relative w-full">
            <div className="sticky top-0 z-10 py-2 w-full">
              <h3 className="font-semibold text-center ">{item.title}</h3>
            </div>

            <div className="flex-1 overflow-y-auto  pr-1 w-full">
              <ContentRenderer content={item.content as ContentBlock[]} />
            </div>
          </div>

          {/* GraduationCap outline di back */}
          <GraduationCap
            className="absolute top-4 right-4 text-black"
            strokeWidth={2}
            fill="none"
          />
        </>
      }
    />
  )
}
