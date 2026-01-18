import Link from "next/link"
import { ItemDataJSON } from "@/features/kemahasiswaan"

interface Props {
  item: ItemDataJSON
}

export function PendaftaranItemCard({ item }: Props) {
  return (
    <Link
      href={`pendaftaran-dan-verifikasi/${item.id}`}
      className="relative aspect-4/3"
    >
      <div
        className="
          absolute inset-0
          bg-[url('/assets/kemahasiswaan/bg-folder.webp')]
          bg-contain bg-no-repeat bg-center
        "
      />
      <div className="absolute bottom-2 left-2 md:bottom-10 md:left-10 z-10 px-8 w-[80%] pt-6">
        <span className="text-white text-xs md:text-sm font-medium">
          {item.title}
        </span>
      </div>
    </Link>
  )
}
