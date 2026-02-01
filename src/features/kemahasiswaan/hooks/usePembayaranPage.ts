import {
  Pembayaran,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function usePembayaranPage() {
  const hero: HeroData = {
    ...Pembayaran.hero,
    breadcrumbItems: Pembayaran.breadcrumbItems,
  }

  const items = getSectionData<ItemDataJSON[]>(
    Pembayaran as KemahasiswaanDataFile,
    "accordion"
  )

  return {
    hero,
    featuredItems: items.slice(0, 3),
    otherItems: items.slice(3),
  }
}
