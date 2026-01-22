'use client'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ItemDataJSON } from "../types/data";
import { ContentRenderer } from "./ContentRenderer";
import { LiquidGlass } from "@liquidglass/react";
import { AnimatePresence, motion } from "framer-motion";

export function HorizontalAccordion({ items }: { items: ItemDataJSON[] }) {
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
      <LiquidGlass
        blur={12}
        saturation={1.2}
        elasticity={0}
        borderRadius={16}
        className="border border-black rounded-xl"
      >
        <AccordionTrigger className="justify-between rounded-xl">
          {item.title}
        </AccordionTrigger>
      </LiquidGlass>  

      
      <AccordionContent className="flex flex-col text-balance">
        <AnimatePresence initial={false}>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LiquidGlass
              blur={12}
              saturation={1.2}
              elasticity={0}
              borderRadius={16}
              className="border border-black rounded-xl px-6 py-4 mt-2"
            >
              <ContentRenderer content={item.content} />
            </LiquidGlass>
          </motion.div>
        </AnimatePresence>
      </AccordionContent>
    </AccordionItem>
  )
}