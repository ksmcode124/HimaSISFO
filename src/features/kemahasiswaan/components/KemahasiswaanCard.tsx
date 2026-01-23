import Link from "next/link"
import { cn } from "@/lib/utils"
import { CardProps } from "../types/ui"
import { motion, AnimatePresence } from "framer-motion"

interface KemahasiswaanCardProps {
  data: CardProps
  active: boolean
  device: 'mobile' | 'tablet' | 'desktop'
}

export function KemahasiswaanCard({ data, active, device }: KemahasiswaanCardProps) {
  return (
    <div
      className={cn(
        "h-full w-full flex flex-col rounded-lg overflow-hidden",
        active
          ? "bg-transparent"
          : "bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white"
      )}
    >
      <div
        className={cn(
          "flex flex-col flex-1 gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6",
          active ? "justify-start" : "justify-center"
        )}
      >
        <motion.p
          className={cn(
            "font-semibold origin-left",
            device === 'mobile' && "text-sm",
            device === 'tablet' && "text-base",
            device === 'desktop' && "text-lg"
          )}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {data.title}
        </motion.p>

        <AnimatePresence>
          {active && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.3,
                ease: "easeOut",
              }}
              className={cn(
                "line-clamp-5 text-justify",
                device === 'mobile' && "text-xs",
                device === 'tablet' && "text-sm line-clamp-2",
                device === 'desktop' && "text-base"
              )}
            >
              {data.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="grid justify-items-center w-full pb-4"
          >
            <button className={cn(
              "px-4 py-2 rounded-full bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white font-medium transition-all hover:scale-105",
              device === 'mobile' && "text-xs",
              device === 'tablet' && "text-sm",
              device === 'desktop' && "text-base px-6"
            )}>
              Selengkapnya ➔
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}