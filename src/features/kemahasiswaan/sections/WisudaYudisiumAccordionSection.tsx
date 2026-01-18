import { ItemDataJSON } from "../types/data"
import { HorizontalAccordion } from "../components/HorizontalAccordion"
interface Props {
  items: ItemDataJSON[]
}

export function WisudaAccordionSection({ items }: Props) {
  return (
    <section className="w-full max-w-7xl px-2 sm:px-6 lg:px-8 mb-10">
      <HorizontalAccordion items={items} />
    </section>
  )
}
