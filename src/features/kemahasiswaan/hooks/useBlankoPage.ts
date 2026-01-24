import {
  Blanko,
  BlankoItem,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function useBlankoPage() {
  const items = getSectionData<BlankoItem[]>(
    Blanko as KemahasiswaanDataFile,
    "item-collection"
  )

  const hero: HeroData = {
    ...Blanko.hero,
    breadcrumbItems: Blanko.breadcrumbItems
  }
  return {
    hero,
    items,
  }
}