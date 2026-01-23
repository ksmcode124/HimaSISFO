'use client'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Props {
  title: string
  onClick: () => void
  active?: boolean 
}

export function ProsesAkademikCard({ title, onClick, active }: Props) {
  return (
    <div className="relative group flex justify-center">
      <Card
        onClick={onClick}
        className={`
          border-0 w-[90%] h-40 sm:h-48 md:h-52 lg:h-60 aspect-4/3
          overflow-hidden bg-[#D9D9D9]
          rounded-md shadow-md
          cursor-pointer
          relative
          transition-all duration-500 transform
          ${active ? '-translate-y-10 shadow-xl z-30' : 'group-hover:-translate-y-10 group-hover:shadow-xl z-10 group-hover:z-30'}
        `}
      >
        <CardHeader className="px-4 h-full flex flex-col">
          <CardTitle className="text-xs sm:text-sm md:text-base font-medium line-clamp-1">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>

      <Image
        src="/assets/kemahasiswaan/overlay-folder.webp"
        alt="Overlay Folder"
        className={`
          absolute bottom-0 translate-y-[25%] sm:translate-y-[20%]
          pointer-events-none
          aspect-4/3
          transition-all duration-500
          ${active ? 'z-10' : 'z-20'}
        `}
        fill
      />
    </div>
  )
}
