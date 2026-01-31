"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface VisiMisiProps {
  data: {
    visi: { text: string }[];
    misi: { text: string }[];
  };
}

export default function VisiMisiAccordion({ data }: VisiMisiProps) {
  const sections = [
    { id: "visi", label: "Visi", items: data.visi },
    { id: "misi", label: "Misi", items: data.misi },
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
            <AccordionTrigger hasChevron={false} className="h-12 relative z-20">
              <div className="w-full h-full" />

              {/* CHEVRON CUSTOM */}
              <div className="absolute -right-5 top-0 h-12 flex items-center z-30 pointer-events-none">
                <div className="bg-white w-15 h-13 rounded-2xl flex items-center justify-center">
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

            <div className="absolute top-0 left-0 right-0 h-12 z-10 overflow-hidden rounded-xl">
              <div className="w-full h-full bg-linear-to-r from-[#B956BA] via-[#FFFFFF] to-[#B956BA] flex items-center justify-center">
                <span className="font-semibold text-xl">{section.label}</span>
              </div>
            </div>

            <AccordionContent className="pt-2 pb-4">
              <ul className="list-disc ml-4">
                {section.items.map((item, index) => (
                  <li key={index} className="text-xs">
                    {item.text}
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
