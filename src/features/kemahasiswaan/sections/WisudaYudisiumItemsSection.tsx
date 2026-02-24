import { ItemDataJSON } from "@/features/kemahasiswaan"
import { WisudaFlipCard } from "../components/WisudaFlipCard"

interface Props {
  items: ItemDataJSON[]
  setSelectedId: (id: string | null) => void
}

export function WisudaYudisiumItemsSection({ items, setSelectedId }: Props) {
  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-6 pb-10 lg:pb-30 *:last:col-start-4">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={"col-span-6"}
          >
            <WisudaFlipCard setSelectedIdAction={setSelectedId} item={item} />
          </div>
        )
      })}
    </section>
  )
}
