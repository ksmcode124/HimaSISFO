import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/Accordion";
import { ItemDataJSON } from "../types";
import ContentRenderer from "./ContentRenderer";

export default function HorizontalAccordion({ items }: { items: ItemDataJSON[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-4"
    >
      {items.map((item) => (
        <HorizontalAccordionItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}

interface Props {
  items: ItemDataJSON[]
  activeIndex: number
  onChange: (index: number) => void
}

// komponen ini digunakan bersamaan dengan AccordionVisualImage untuk mendapatkan visual gambar secara looping
export function FeaturedHorizontalAccordion({ items, activeIndex, onChange }:  Props ) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-4"
      value={activeIndex >= 0 ? items[activeIndex]?.id : ""}
      onValueChange={(id) => {
        if (!id) {
          onChange(-1)
          return
        }
        const index = items.findIndex(item => item.id === id)
        if (index !== -1) onChange(index)
      }}
    >
      {items.map((item) => (
        <HorizontalAccordionItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}

/** --- Internal Components --- */
function HorizontalAccordionItem( {item} : {item: ItemDataJSON}) {
  return (
    <AccordionItem
      key={item.id}
      value={item.id}
      className="
        space-y-5
        overflow-hidden
      "
    >
      <AccordionTrigger className="justify-between items-center rounded-xl border-black border">
        {item.title}
      </AccordionTrigger>

      <AccordionContent className="flex flex-col gap-4 py-4 px-6 text-balance border border-black rounded-xl">
        <ContentRenderer content={item.content} />
      </AccordionContent>
    </AccordionItem>
  )
}