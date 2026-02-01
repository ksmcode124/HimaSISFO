'use client'
import { useState } from "react"
import {
  ProsesAkademik,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"
import { HeroData } from "../types/hero"

export function useProsesAkademikPage() {
  const hero: HeroData = {
    ...ProsesAkademik.hero,
    breadcrumbItems: ProsesAkademik.breadcrumbItems,
  }

  const items = getSectionData<ItemDataJSON[]>(
    ProsesAkademik as KemahasiswaanDataFile,
    "item-collection"
  )

  const [selectedId, setSelectedId] = useState<string | null>(null)

  return {
    hero,
    items,
    selectedId,
    openModal: setSelectedId,
    closeModal: () => setSelectedId(null),
  }
}
