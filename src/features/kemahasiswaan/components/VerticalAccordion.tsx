'use client'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTriggerVertical
} from "@/components/ui/accordion";
import { ItemDataJSON } from "../types/data";
import { ContentRenderer } from "./ContentRenderer";
import { AnimatePresence, motion } from "framer-motion";
import { LiquidGlass } from "@liquidglass/react";

interface VerticalAccordionProps {
  items: ItemDataJSON[]
}

export function VerticalAccordion({ items }: VerticalAccordionProps) {
  return (
    <Accordion
      type="single"
      defaultValue={items[0]?.id}
      collapsible
      className="w-full flex flex-col justify-center lg:flex-row gap-4 py-10"
    >
      {items.map((item) => (
        <VerticalAccordionItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}

/** --- Internal Component --- */
function VerticalAccordionItem({ item }: { item: ItemDataJSON }) {
  return (
    <AccordionItem
      value={item.id}
      className="group flex flex-col sm:max-h-150 overflow-hidden p-0 max-w-170"
    >       
      {/* Content */}
      <AccordionContent className="overflow-hidden p-0 translate-y-5">
        <AnimatePresence initial={false}>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
          >
            <LiquidGlass
              blur={12}
              saturation={1.2}
              elasticity={0}
              borderRadius={16}
              className="w-full min-h-80 lg:min-h-150 border border-neutral-400 rounded-2xl flex flex-col"
            >
              <ContentRenderer content={item.content} />
            </LiquidGlass>
          </motion.div>
        </AnimatePresence>
      </AccordionContent>

      {/* Trigger */}
      <AccordionTriggerVertical
        hasChevron={false}
        writingMode= "vertical-btt"
        className="
          px-4 py-6
          text-white
          w-full
          flex-row
          justify-end
        "
      >
        {item.title}
      </AccordionTriggerVertical>
    </AccordionItem>
  )
}
