"use client";

import { motion } from "framer-motion";
import {
  Ornament6,
  Ornament7,
  Ornament8,
} from "../components/KabinetOrnaments";

export default function ComingSoonSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#444444] flex flex-col items-center justify-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="text-white text-2xl md:text-6xl font-bold z-10"
      >
        Coming Soon
      </motion.h2>

      {/* pita kanan atas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="hidden md:block absolute md:-scale-y-100 md:-scale-x-100 md:top-0 md:-right-165 md:w-500"
      >
        <Ornament8 />
      </motion.div>

      {/* pita kiri bawah */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="hidden md:block absolute md:bottom-0 md:-left-165 md:w-500"
      >
        <Ornament8 />
      </motion.div>

      {/* ornamen kiri atas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-0 -left-55 md:-left-90 xl:-left-110 w-150 md:w-200 xl:w-300"
      >
        <Ornament6 />
      </motion.div>

      {/* awan kanan bawah */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute bottom-0 -right-45 md:-right-80 xl:-right-110 w-120 md:w-200 xl:w-300"
      >
        <Ornament7 />
      </motion.div>
    </section>
  );
}
