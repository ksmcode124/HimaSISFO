"use client";
import Card from "@/app/behind-the-web/components/hasbi";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useState, useEffect, useRef } from "react";

export default function AccordionParent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mask, setMask] = useState<string>("none");

  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // ambil posisi & ukuran card yang terlihat
    const visibleCards: { left: number; width: number }[] = [];
    const visibleCardsHeight: { top: number; height: number }[] = [];
    cardRefs.forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // relatif terhadap parent
      const parentRect = el.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      visibleCards.push({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
      visibleCardsHeight.push({
        top: rect.top - parentRect.top,
        height: rect.height,
      });
    });

    if (visibleCards.length === 0 && visibleCardsHeight.length === 0) {
      setMask("none");
      return;
    }

    // bangun mask gradient dari area setiap card
    const segments: string[] = [];
    let prevEnd = 0;

    visibleCards.forEach(({ left, width }, i) => {
      const start = left;
      const end = left + width;

      // area sebelum card → transparan
      if (start > prevEnd) {
        segments.push(`transparent ${prevEnd}px, transparent ${start}px`);
      }
      // area card → putih (terlihat)
      segments.push(`white ${start}px, white ${end}px`);
      prevEnd = end;
    });

    // area setelah card terakhir → transparan
    segments.push(`transparent ${prevEnd}px, transparent 100%`);

    setMask(`linear-gradient(to right, ${segments.join(", ")})`);
  }, [openIndex]);




  return (
    <div
      className="flex gap-4 bg-cover justify-center items-center"
    >
      <div ref={cardRefs[0]}>
        <Card
          title="visi"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          expanded={openIndex === 0}
          onToggle={() => handleToggle(0)}
        />
      </div>

      <div ref={cardRefs[1]}>
        <Card
          title="misi"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          expanded={openIndex === 1}
          onToggle={() => handleToggle(1)}
        />
      </div>
    </div>
  );


}
