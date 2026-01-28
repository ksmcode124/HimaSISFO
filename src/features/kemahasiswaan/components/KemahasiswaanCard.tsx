import Link from "next/link"
import { cn } from "@/lib/utils/cn"
import { CardProps } from "../types/ui"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

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
          ? "bg-transparent px-2.5 pt-1.5 pb-2.5"
          : "bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white px-5 py-15"
      )}
    >
      <div
        className={cn(
          "flex flex-col flex-1 gap-2 sm:gap-3 px-10 py-5 lg:px-5 lg:py-2.5",
          active ? "justify-start" : "justify-center "
        )}
      >
        <motion.p
          className={cn(
            "font-semibold origin-left text-xs sm:text-sm md:text-sm lg:text-xl wrap-break-word",
            !active ? "text-center px-[20%]" : ""
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
                "line-clamp-5 text-justify text-3xs sm:text-2xs md:text-xs lg:text-sm",
                device === 'tablet' && " line-clamp-2",
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
            <Button variant={"hima"} className={cn(
              "text-xs lg:text-sm px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-5 lg:py-4 2xl:px-6 2xl:py-5",
            )} asChild>
              <Link href={`/kemahasiswaan/${data.id}`}>
                Selengkapnya ➔
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}