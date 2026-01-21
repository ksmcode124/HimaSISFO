"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisiMisiMobileProps {
  visi: string[];
  misi: string[];
  onToggle?: (isOpen: boolean) => void;
}

export default function VisiMisiMobile({
  visi,
  misi,
  onToggle,
}: VisiMisiMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onToggle) onToggle(nextState);
  };

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
      className={`
          relative z-20 border-2 border-[#A43DA5] bg-linear-to-r from-[#B956BA] via-white to-[#B956BA] flex
          ${
            isOpen
              ? "flex-col w-full p-4 rounded-4xl"
              : "flex-row items-center w-full h-12 md:h-16 rounded-full gap-4"
          }
        `}
    >
      {/* VISI */}
      <motion.div
        layout
        className={`flex flex-col items-end w-full ${
          isOpen ? "items-start" : ""
        }`}
      >
        <motion.h2 layout="position" className="text-lg font-bold">
          VISI
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
              <ul>
                {visi.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 w-1 h-1 rounded-full mt-2 bg-black" />
                    <span className="text-2xs">{item}</span>
                  </li>
                ))}
              </ul>
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
        <motion.h2 layout="position" className="text-lg font-bold">
          MISI
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
              <ul>
                {misi.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 w-1 h-1 rounded-full mt-2 bg-black" />
                    <span className="text-2xs">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
