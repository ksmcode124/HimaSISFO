"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColorMap } from "../types";
import { cn } from "@/lib/utils";

interface VisiMisiProps {
  visi: string[];
  misi: string[];
  colorMap: ColorMap;
}

export default function VisiMisiAccordion({
  visi,
  misi,
  colorMap,
}: VisiMisiProps) {
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
            className={cn(
              "rounded-2xl relative group border-transparent border-gradient-kabinet overflow-hidden p-1",
            )}
            style={
              {
                color: colorMap.text,
                backgroundColor: `color-mix(in srgb, ${colorMap.background}, transparent 15%)`,
                backgroundClip: "padding-box",
                "--gradient": colorMap.borderGradient,
              } as React.CSSProperties
            }
          >
            <AccordionTrigger
              hasChevron={false}
              className="h-12 2xl:h-16 relative z-20 hover:no-underline"
            >
              <div className="absolute top-0 left-0 right-0 h-12 2xl:h-16 z-10 overflow-hidden rounded-xl pointer-events-none">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: colorMap.visiMisi }}
                >
                  <span className="font-semibold text-xl 2xl:text-3xl">
                    {label}
                  </span>
                </div>
              </div>

              {/* CHEVRON CUSTOM */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="bg-white w-16 h-14 rounded-xl flex items-center justify-center shadow-sm">
                  {" "}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ stroke: colorMap.chevronIcon }}
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

            <AccordionContent className="pt-2 pb-4">
              <ul className="list-disc ml-6 mr-2">
                {items.map((text, index) => (
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
