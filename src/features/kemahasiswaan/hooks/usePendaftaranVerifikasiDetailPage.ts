import { notFound } from "next/navigation"
import {
  PendaftaranVerifikasi,
  ItemDataJSON,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import { getSectionData } from "../services/getSectionData"

/**
 * Function: getPendaftaranVerifikasiDetail
 *
 * Purpose:
 * Retrieves a single item from the Pendaftaran & Verifikasi section
 * by slug, along with its breadcrumb trail for navigation.
 *
 * Architectural Boundary:
 * - Purely a data retrieval function; no UI rendering responsibilities.
 * - Delegates JSON section extraction to `getSectionData`.
 *
 * Invariants:
 * - Slug must correspond to an existing item; otherwise `notFound` triggers 404.
 * - Breadcrumbs always include the static section breadcrumbs followed by the current item.
 *
 * Risks / Failure Modes:
 * - Casting `PendaftaranVerifikasi as KemahasiswaanDataFile` bypasses TypeScript safety.
 * - If JSON schema changes (e.g., missing `breadcrumbItems` or `items`), function may throw unexpectedly.
 *
 * Maintenance Guidelines:
 * - Ensure JSON section "item-collection" exists and each item has a unique `id`.
 * - Keep breadcrumb structure consistent with routing patterns.
 */
export function getPendaftaranVerifikasiDetail(slug: string) {
  // Extract item-collection items from JSON
  const items = getSectionData<ItemDataJSON[]>(
    PendaftaranVerifikasi as KemahasiswaanDataFile,
    "item-collection"
  )

  // Find the item matching the slug
  const item = items.find(item => item.id === slug)
  if (!item) notFound() // Trigger Next.js 404 if item is missing

  // Construct breadcrumb trail for navigation
  const breadcrumbItems = [
    ...PendaftaranVerifikasi.breadcrumbItems,
    {
      display: item.title,
      link: `/kemahasiswaan/pendaftaran-dan-verifikasi/${slug}`,
    },
  ]

  return {
    item,
    breadcrumbItems,
  }
}