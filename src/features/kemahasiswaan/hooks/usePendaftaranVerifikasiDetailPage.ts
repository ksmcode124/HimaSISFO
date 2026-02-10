import { notFound } from "next/navigation"
import {
  PendaftaranVerifikasi,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"

export function getPendaftaranVerifikasiDetail(slug: string) {
  const items = getSectionData<ItemDataJSON[]>(
    PendaftaranVerifikasi as KemahasiswaanDataFile,
    "item-collection"
  )

  const item = items.find(item => item.id === slug)
  if (!item) notFound()

  const breadcrumbItems = [
    ...PendaftaranVerifikasi.breadcrumbItems,
    {
      display: item.title,
      link: `/kemahasiswaan/pendaftaran-dan-verifikasi/${slug}`,
    },
  ]

  return {
    item,
    breadcrumbItems,
  }
}
