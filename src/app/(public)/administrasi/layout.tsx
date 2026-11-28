import { SiteFooter } from "@/components/layout"

/**
 * Layout: Kemahasiswaan
 *
 * Purpose:
 * Provides shared structural elements for all routes
 * under the Kemahasiswaan segment.
 *
 * Architectural Boundary:
 * - This layout is responsible only for structural composition.
 * - It must not contain page-specific logic or data fetching.
 *
 * Invariant:
 * - Footer is always rendered for every child route
 *   within this layout scope.
 *
 * Maintenance Rule:
 * - If additional global UI (e.g., banner, wrapper, tracking)
 *   is required for all Kemahasiswaan pages,
 *   add it here — not inside individual pages.
 */
export default function KemahasiswaanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Render nested route content */}
      {children}

      {/* Global footer shared across this layout scope */}
      <SiteFooter />
    </>
  )
}