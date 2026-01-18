import Link from "next/link"
import { Card, CardAction, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardProps } from "../types/ui"

interface Props {
  data: CardProps
  active: boolean
}

export function KemahasiswaanCard({ data, active }: Props) {
  return (
    <Card
      className={cn(
        "h-full flex flex-col transition-[transform,opacity]",
        active
          ? "scale-100 opacity-100"
          : "scale-80 bg-linear-to-r from-[#456882] to-[#1B3C53] text-white"
      )}
    >
      <CardContent
        className={cn(
          "flex flex-col flex-1 gap-3 p-6",
          active ? "justify-start" : "justify-center"
        )}
      >
        <p className={cn("font-semibold", active ? "text-md" : "text-xl")}>
          {data.title}
        </p>

        <p
          className={cn(
            "text-sm transition-all",
            active ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          {data.description}
        </p>
      </CardContent>

      <CardAction
        className={cn(
          "pb-4 grid justify-items-center w-full",
          active ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Link
          href={`/kemahasiswaan/${data.id}`}
          className="text-xs rounded-full border px-4 py-2 bg-linear-to-t from-[#456882] to-[#1B3C53] text-white"
        >
          Selengkapnya ➔
        </Link>
      </CardAction>
    </Card>
  )
}
