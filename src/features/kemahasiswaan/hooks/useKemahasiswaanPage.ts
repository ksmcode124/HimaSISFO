import Kemahasiswaan from "../data/kemahasiswaan.json"
import { CardProps } from "../types/ui"
import { CTASection } from "../types/ui"

export function useKemahasiswaanPage() {
  const hero = selectHero()
  const alurItems = selectAlurCarouselItems()
  const blankoSection = selectBlankoSection()

  return {
    hero,
    alurItems,
    blankoSection,
  }
}

function selectAlurCarouselItems(): CardProps[] {
  const section = Kemahasiswaan.sections.find(
    (s) => s.type === "item-collection"
  )

  if (!section || !Array.isArray(section.items)) {
    return []
  }

  return section.items as CardProps[]
}

function selectBlankoSection(): CTASection | null {
  const section = Kemahasiswaan.sections.find(
    (s) => s.type === "section"
  )

  return section?.items as CTASection ?? null
}

function selectHero() {
  return Kemahasiswaan.hero
}