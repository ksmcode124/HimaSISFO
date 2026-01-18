import {
  WisudaYudisium,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function useWisudaYudisiumPage() {
  const hero: HeroData = {
    ...WisudaYudisium.hero,
    breadcrumbItems: WisudaYudisium.breadcrumbItems,
  }

  const accordionItems = getSectionData<ItemDataJSON[]>(
    WisudaYudisium as KemahasiswaanDataFile,
    "accordion"
  )

  const itemCollectionItems = getSectionData<ItemDataJSON[]>(
    WisudaYudisium as KemahasiswaanDataFile,
    "item-collection"
  )

  return {
    hero,
    accordionItems,
    itemCollectionItems,
  }
}
