import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ItemDataJSON } from "../types";
import ContentRenderer from "./ContentRenderer";

export default function VerticalAccordion({ items }: { items: ItemDataJSON[] }) {
  return (

    <Accordion
      type="single"
      defaultValue={items[0].id}
      className="w-full flex flex-col justify-center lg:flex-row gap-4"
    >
      {items.map((item) => (
        <VerticalAccordionItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}

/** --- Internal Components --- */
function VerticalAccordionItem( {item} : {item: ItemDataJSON}) {
  return (
     <AccordionItem
      key={item.id}
      value={item.id}
      className="group border rounded-xl lg:h-160 max-w-170 p-0 overflow-hidden"
    >
      <div className="flex flex-col h-full justify-between">
        <AccordionContent
          className="
            max-w-0
            group-data-[state=open]:max-w-full
            px-6 py-4
          "
        >
          <ContentRenderer content={item.content} />
        </AccordionContent>

        <AccordionTrigger
          hasChevron={false}
          writingMode="vertical-btt"
          className="
            px-4 py-6
            text-white
            bg-linear-to-r to-[#1B3C53] from-[#1F445F]
            w-full
            lg:group-data-[state=closed]:h-full
            lg:group-data-[state=open]:h-auto
            flex-row
            justify-between
          "
        >
          {item.title}
        </AccordionTrigger>

      </div>
    </AccordionItem>
  )
}