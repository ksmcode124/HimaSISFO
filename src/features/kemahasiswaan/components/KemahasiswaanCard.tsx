import Link from "next/link"
import { Card, CardAction, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardProps } from "../types/ui"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Props {
  data: CardProps
  active: boolean
}

export function KemahasiswaanCard({ data, active }: Props) {
  return (
    <Card
      className={cn(
        "h-full w-full flex flex-col border-0 overflow-hidden",
        active
          ? "bg-transparent"
          : "bg-linear-to-r from-[#456882] to-[#1B3C53] text-white"
      )}
    >
      <CardContent
        className={cn(
          "flex flex-col flex-1 gap-3 px-17 py-6",
          active ? "justify-start" : "justify-center"
        )}
      >
        <motion.p
          className="font-semibold origin-left text-md sm:text-lg"
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {data.title}
        </motion.p>

        {active && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="text-xs sm:text-sm md:text-md"
          >
            {data.description}
          </motion.p>
        )}
      </CardContent>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="pb-4 grid justify-items-center w-full"
        >
          <Button variant="hima" asChild>
            <Link href={`/kemahasiswaan/${data.id}`}>
              Selengkapnya ➔
            </Link>
          </Button>
        </motion.div>
      )}
    </Card>
  )
}


