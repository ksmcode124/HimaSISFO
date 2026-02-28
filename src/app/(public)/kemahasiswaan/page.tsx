import { Spinner } from "@/components/ui/spinner"
import {
  KemahasiswaanMainSection,
  BlankoSection,
  HeroSection,
  useKemahasiswaanPage,
} from "@/features/kemahasiswaan"
import { Suspense } from "react"

/**
 * Page: Kemahasiswaan
 *
 * Purpose:
 * Entry point for the Kemahasiswaan page.
 * Responsible only for composing UI sections.
 *
 * Architectural Boundary:
 * - This file must NOT contain business logic.
 * - Data fetching, transformation, and validation belong
 *   to the feature layer (useKemahasiswaanPage).
 *
 * Maintenance Rule:
 * - If new sections are added, keep this file declarative.
 * - Avoid introducing conditional data logic here.
 */
export default function Page() {
  /**
   * Data contract for this page.
   *
   * Invariants:
   * - hero: required
   * - alurItems: required
   * - blankoSection: optional
   *
   * If the shape changes, update the feature layer —
   * not this page component.
   */
  const { hero, alurItems, blankoSection } = useKemahasiswaanPage()

  return (
    <>
      {/* Static hero section. Should remain lightweight. */}
      <HeroSection data={hero} />

      {/* 
        Suspense boundary isolates async dependencies
        inside KemahasiswaanMainSection.

        If loading behavior changes, adjust fallback
        or move async responsibility to feature layer.
      */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-64 w-full gap-4">
            <Spinner className="h-10 w-10 text-primary" />
            <p className="text-gray-500 text-sm">Memuat konten...</p>
          </div>
        }
      >
        <KemahasiswaanMainSection items={alurItems} />
      </Suspense>

      {/* Optional section. Render only if configured. */}
      {blankoSection && <BlankoSection {...blankoSection} />}
    </>
  )
}