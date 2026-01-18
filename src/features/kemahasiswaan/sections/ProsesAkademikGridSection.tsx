import { ItemDataJSON } from "@/features/kemahasiswaan"
import { ProsesAkademikCard } from "../components/ProsesAkademikCard"

interface Props {
  items: ItemDataJSON[]
  onSelect: (id: string) => void
}

export function ProsesAkademikGridSection({ items, onSelect }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto">
      {items.map(item => (
        <ProsesAkademikCard
          key={item.id}
          title={item.title}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </section>
  )
}
