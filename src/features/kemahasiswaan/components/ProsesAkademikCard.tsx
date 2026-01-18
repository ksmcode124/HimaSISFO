import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  title: string
  onClick: () => void
}

export function ProsesAkademikCard({ title, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="
        border-0 w-full h-40 sm:h-48 md:h-52 lg:h-60
        overflow-hidden bg-[#D9D9D9]
        rounded-md shadow-md relative
        transition-transform duration-150
        hover:-translate-y-4 group cursor-pointer
      "
    >
      <CardHeader className="px-4 h-full flex flex-col justify-center">
        <CardTitle className="text-xs sm:text-sm md:text-base font-medium line-clamp-1 group-hover:line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
