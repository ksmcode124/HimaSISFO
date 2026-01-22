import { ItemDataJSON } from "@/features/kemahasiswaan"
import { WisudaFlipCard } from "../components/WisudaFlipCard"

interface Props {
  items: ItemDataJSON[]
  setSelectedId: (id: string | null) => void
}

export function WisudaYudisiumItemsSection({ items, setSelectedId }: Props) {
  const isOdd = items.length % 2 !== 0

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-2 gap-6 pb-10 lg:pb-30">
      {items.map((item, index) => {
        const isFirst = index === 0

        return (
          <div
            key={item.id}
            className={isFirst && isOdd ? "sm:col-span-2" : ""}
          >
            <WisudaFlipCard setSelectedId={setSelectedId} item={item} />
          </div>
        )
      })}
    </section>
  )
}
