'use client'

import { ItemDataJSON } from "@/features/kemahasiswaan"
import { ProsesAkademikCard } from "../components/ProsesAkademikCard"

interface Props {
  items: ItemDataJSON[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ProsesAkademikGridSection({ items, selectedId, onSelect }: Props) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-25 gap-x-10 px-6 lg:px-12 max-w-7xl mx-auto">
      {items.map(item => (
        <ProsesAkademikCard
          key={item.id}
          title={item.title}
          active={selectedId === item.id} // active state
          onClick={() => onSelect(item.id)}
        />
      ))}
    </section>
  )
}
