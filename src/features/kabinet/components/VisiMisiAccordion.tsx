"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface VisiMisiProps {
  visi: string[];
  misi: string[];
  visiMisiGradient: string;
  visiMisiBorder: string
}

export default function VisiMisiAccordion({ visi, misi, visiMisiGradient, visiMisiBorder }: VisiMisiProps) {
  const sections = [
    { id: "visi", label: "Visi", items: visi },
    { id: "misi", label: "Misi", items: misi },
  ];

  return (
    <div className="hidden lg:block">
      <Accordion type="single" collapsible className="space-y-6">
        {sections.map(({ id, label, items }) => (
          <AccordionItem
            key={id}
            value={id}
            className={cn("border-3 rounded-2xl /80 relative group border-gradient-kabinet", visiMisiBorder)}
            style={{ "--gradient" : visiMisiGradient } as React.CSSProperties} // Menjaga konsistensi border shadcn
          >
            <AccordionTrigger
              hasChevron={false}
              className="h-12 2xl:h-16 relative z-20 hover:no-underline"
            >
              <div className="w-full h-full" />

              {/* CHEVRON CUSTOM */}
              <div className="absolute -right-5 top-0 h-12 2xl:h-16 flex items-center z-30 pointer-events-none">
                <div className="bg-white w-15 h-13 2xl:h-17 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E63258"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </AccordionTrigger>

            <div className="absolute top-0 left-0 right-0 h-12 2xl:h-16 z-10 overflow-hidden rounded-xl pointer-events-none">
              <div className="w-full h-full flex items-center justify-center" style={{background: visiMisiGradient}}>
                <span className="font-semibold text-xl 2xl:text-3xl text-[#2D2D51]">
                  {label}
                </span>
              </div>
            </div>

            <AccordionContent className="pt-2 pb-4">
              <ul className="list-disc ml-4">
                {items.map((text, index) => (
                  <li
                    key={index}
                    className="text-xs 2xl:text-lg text-[#2D2D51]"
                  >
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
