import { VerticalAccordion } from "../components/VerticalAccordion"
import { ItemDataJSON } from "../types/data"

interface Props {
  items: ItemDataJSON[]
}

export function PelayananAdministratifSection({ items }: Props) {
  return (
    <section className="max-w-7xl min-h-[55vh] mx-auto px-4">
      <VerticalAccordion items={items} />
    </section>
  )
}
