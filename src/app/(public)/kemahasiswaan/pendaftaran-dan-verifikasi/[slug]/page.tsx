import { 
  BreadcrumbSection, 
  getPendaftaranVerifikasiDetail,
  PendaftaranVerifikasiDetailSection
} from "@/features/kemahasiswaan"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params
  const { item, breadcrumbItems } =
    getPendaftaranVerifikasiDetail(slug)

  return (
    <>
      <BreadcrumbSection items={breadcrumbItems} />
      <PendaftaranVerifikasiDetailSection item={item} />
    </>
  )
}
