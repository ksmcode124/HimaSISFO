import {
  PelayananAdministratif,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function usePelayananAdministratifPage() {
  const hero: HeroData = {
    ...PelayananAdministratif.hero,
    breadcrumbItems: PelayananAdministratif.breadcrumbItems,
  }

  const items = getSectionData<ItemDataJSON[]>(
    PelayananAdministratif as KemahasiswaanDataFile,
    "accordion"
  )

  return {
    hero,
    items,
  }
}
