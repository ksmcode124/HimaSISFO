import { ContentLayer, DecorationLayer } from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"
import Image from "next/image"
import {
  BreadcrumbSection,
  getPendaftaranVerifikasiDetail,
  PendaftaranVerifikasiDetailSection,
} from "@/features/kemahasiswaan"

type PageProps = {
  /**
   * Dynamic route parameter.
   * Provided by Next.js App Router.
   */
  params: Promise<{ slug: string }>
}

/**
 * Page: Pendaftaran & Verifikasi Detail
 *
 * Type: Server Component (async)
 *
 * Purpose:
 * Renders detail view based on dynamic slug.
 *
 * Architectural Boundary:
 * - Data retrieval is delegated to the feature layer.
 * - This page composes layout + feature section only.
 * - No transformation logic should be introduced here.
 *
 * Invariant:
 * - slug must map to a valid item.
 * - getPendaftaranVerifikasiDetail must return
 *   a structurally valid { item, breadcrumbItems } object.
 *
 * Maintenance Rule:
 * - If slug resolution logic changes, update it inside
 *   the feature function — not in this file.
 * - Keep layout concerns (ShellLayer, DecorationLayer, ContentLayer)
 *   separate from feature logic.
 */
export default async function DetailPage({ params }: PageProps) {
  /**
   * Resolve dynamic route parameter.
   * This is awaited because params is typed as Promise.
   */
  const { slug } = await params

  /**
   * Data contract:
   * - item: detail content entity
   * - breadcrumbItems: navigation hierarchy representation
   *
   * This function defines the feature boundary.
   */
  const { item, breadcrumbItems } =
    getPendaftaranVerifikasiDetail(slug)

  return (
    <>
      <ShellLayer>
        {/* 
          Decoration layer is purely visual.
          Must not contain business or interactive logic.
        */}
        <DecorationLayer className="min-h-screen">
          <div className="relative w-full aspect-3/2">
            <Image
              src="/assets/kemahasiswaan/bg-hero.webp"
              alt="" 
              /*
                Background image is decorative.
                Empty alt is intentional to avoid redundant
                screen reader noise.
              */
              fill
              className="object-cover h-full"
              priority
            />
          </div>
        </DecorationLayer>

        {/* Content layer holds actual navigable UI */}
        <ContentLayer className="flex flex-col justify-center items-center w-full">
          {/* Hierarchical navigation context */}
          <BreadcrumbSection items={breadcrumbItems} />

          {/* Feature-specific detail rendering */}
          <PendaftaranVerifikasiDetailSection item={item} />
        </ContentLayer>
      </ShellLayer>
    </>
  )
}