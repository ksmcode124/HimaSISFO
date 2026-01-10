import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/Accordion";
import { AccordionItemBlock } from "../types";
import ContentRenderer from "./ContentRenderer";

export default function VerticalAccordion({ items }: { items: AccordionItemBlock[] }) {
  return (

    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col justify-center lg:flex-row gap-4"
    >
      {items.map((item) => (
        <VerticalAccordionItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}

/** --- Internal Components --- */
function VerticalAccordionItem( {item} : {item: AccordionItemBlock}) {
  return (
     <AccordionItem
      key={item.id}
      value={item.id}
      className="group border rounded-xl lg:h-160 max-w-170 p-0 overflow-hidden"
    >
      <div className="flex flex-col h-full justify-between">
        <AccordionContent
          className="
            hidden
            group-data-[state=open]:block
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
            bg-rl-gradient-primary
            text-white
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