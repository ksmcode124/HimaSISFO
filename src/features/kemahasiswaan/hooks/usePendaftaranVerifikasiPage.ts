import {
  PendaftaranVerifikasi,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function usePendaftaranVerifikasiPage() {
  const hero: HeroData = {
    ...PendaftaranVerifikasi.hero,
    breadcrumbItems: PendaftaranVerifikasi.breadcrumbItems,
  }

  const accordionItems = getSectionData<ItemDataJSON[]>(
    PendaftaranVerifikasi as KemahasiswaanDataFile,
    "accordion"
  )

  const itemCollectionItems = getSectionData<ItemDataJSON[]>(
    PendaftaranVerifikasi as KemahasiswaanDataFile,
    "item-collection"
  )

  return {
    hero,
    accordionItems,
    itemCollectionItems,
  }
}