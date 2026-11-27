"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorMap } from "../types";

interface VisiMisiMobileProps {
  visi: string[];
  misi: string[];
  onToggle?: (isOpen: boolean) => void;
  colorMap: ColorMap;
}

export default function VisiMisiMobile({
  visi,
  misi,
  onToggle,
  colorMap,
}: VisiMisiMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onToggle) onToggle(nextState);
  };

  const RenderList = ({ items }: { items: string[] }) => (
    <ul>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span
            className="shrink-0 w-1 h-1 rounded-full mt-2"
            style={{ backgroundColor: colorMap.text }}
          />
          <span className="text-2xs" style={{ color: colorMap.text }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <motion.div
      layout
      onClick={handleToggle}
      transition={{
        layout: {
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          damping: 22,
        },
      }}
      className={`relative z-20 flex border-2 border-transparent border-gradient-kabinet ${
        isOpen
          ? "flex-col w-full p-4 rounded-4xl"
          : "flex-row items-center w-full h-12 md:h-16 rounded-full gap-4"
      }`}
      style={{
        borderWidth: "1px",
        background: colorMap.visiMisi,
        backgroundClip: "padding-box",
        "--gradient": colorMap.borderGradient,
      } as React.CSSProperties}
    >
      {/* VISI */}
      <motion.div
        layout
        className={`flex flex-col w-full ${isOpen ? "items-start" : "items-end"}`}
      >
        <motion.h2 layout="position" className="text-xl font-semibold">
          Visi
        </motion.h2>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="visi-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                position: "absolute",
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <RenderList items={visi} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* AMPERSAND (&) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.span
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-lg"
          >
            &
          </motion.span>
        )}
      </AnimatePresence>

      {/* MISI */}
      <motion.div
        layout
        className={`flex flex-col w-full ${isOpen ? "mt-8 items-end" : ""}`}
      >
        <motion.h2 layout="position" className="text-xl font-semibold">
          Misi
        </motion.h2>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="misi-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                position: "absolute",
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <RenderList items={misi} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
