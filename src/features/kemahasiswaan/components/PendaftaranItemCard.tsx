import Link from "next/link"
import { ItemDataJSON } from "@/features/kemahasiswaan"

interface Props {
  item: ItemDataJSON
}

export function PendaftaranItemCard({ item }: Props) {
  return (
    <Link
      href={`pendaftaran-dan-verifikasi/${item.id}`}
      className="relative w-full aspect-4/3 rounded-xl overflow-hidden"
    >
      <div
        className="
          absolute inset-0
          bg-[url('/assets/kemahasiswaan/bg-folder.webp')]
          bg-contain bg-no-repeat bg-center
        "
      />
      <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 z-10 px-4 md:px-8 w-[80%] pt-6">
        <span className="text-white text-[8px] sm:text-2xs md:text-sm lg:text-xl font-semibold line-clamp-1">
          {item.title}
        </span>
      </div>
    </Link>
  )
}
