'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ItemDataJSON } from "../types/data";
import { ContentRenderer } from "./ContentRenderer";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown } from "lucide-react";
import { Glass } from "@/components/ui/Glass";

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
export function FeaturedHorizontalAccordion({ items, activeIndex, onChange }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col justify-around gap-4"
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
function HorizontalAccordionItem({ item }: { item: ItemDataJSON }) {
  return (
    <AccordionItem
      key={item.id}
      value={item.id}
      className="
        space-y-5
        overflow-hidden
        w-full
      "
    >
      <Glass
        preset="soft"
        className="border border-[#25253B] rounded-2xl w-full"
      >
        <AccordionTrigger className="justify-between w-full rounded-xl text-3xs sm:text-xs md:text-sm lg:text-xl font-semibold">
          <span className="line-clamp-1">
            {item.title}
          </span>
        </AccordionTrigger>
      </Glass>


      <AccordionContent className="flex flex-col text-balance w-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Glass
              preset="soft"
              className="border border-black flex flex-col text-3xs sm:text-2xs md:text-xs lg:text-sm rounded-2xl px-6 py-4 mt-2"
            >
              <div className="flex w-full justify-between">
                <h3 className="flex-1 text-3xs sm:text-2xs md:text-xs lg:text-sm">Panduan: </h3>
                <ChevronsUpDown />
              </div>
              <ContentRenderer content={item.content} />
            </Glass>
          </motion.div>
        </AnimatePresence>
      </AccordionContent>
    </AccordionItem>
  )
}