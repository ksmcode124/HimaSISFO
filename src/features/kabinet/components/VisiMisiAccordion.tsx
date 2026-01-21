"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface VisiMisiProps {
  visi: string[];
  misi: string[];
}

export default function VisiMisiAccordion({ visi, misi }: VisiMisiProps) {
  const sections = [
    { id: "visi", label: "Visi", items: visi },
    { id: "misi", label: "Misi", items: misi },
  ];

  return (
    <div className="hidden lg:block">
      <Accordion type="single" collapsible className="space-y-6">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border-2 border-[#D14D72] rounded-2xl bg-white/70 relative group"
          >
            <AccordionTrigger
              hasChevron={false}
              className="h-12 2xl:h-16 relative z-20"
            >
              <div className="w-full h-full" />

              {/* CHEVRON CUSTOM */}
              <div className="absolute -right-5 top-0 h-12 2xl:h-16 flex items-center z-30 pointer-events-none">
                <div className="bg-white w-15 h-13 2xl:h-17 rounded-2xl flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D14D72"
                    className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </AccordionTrigger>

            <div className="absolute top-0 left-0 right-0 h-12 2xl:h-16 z-10 overflow-hidden rounded-xl">
              <div className="w-full h-full bg-linear-to-r from-[#B956BA] via-[#FFFFFF] to-[#B956BA] flex items-center justify-center">
                <span className="font-semibold text-xl 2xl:text-3xl">
                  {section.label}
                </span>
              </div>
            </div>

            <AccordionContent className="pt-2 pb-4">
              <ul className="list-disc ml-4">
                {section.items.map((text, index) => (
                  <li key={index} className="text-xs 2xl:text-lg">
                    {text}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
