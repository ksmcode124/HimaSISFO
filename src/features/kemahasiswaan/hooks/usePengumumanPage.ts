import {
  Pengumuman,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function usePengumumanPage() {
  const hero: HeroData = {
    ...Pengumuman.hero,
    breadcrumbItems: Pengumuman.breadcrumbItems,
  }

  const informasiItems = getSectionData<ItemDataJSON[]>(
    Pengumuman as KemahasiswaanDataFile, "accordion"
  )

  return {
    hero,
    informasiItems
  }
}