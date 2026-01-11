import { notFound } from "next/navigation"
import {
  PendaftaranVerifikasi,
  ContentRenderer,
  ContentBlock,
  BreadcrumbSection,
  getSectionData,
  AccordionItemBlock,
  KemahasiswaanDataFile,
} from "@/features/kemahasiswaan"
import FolderCard from "@/features/kemahasiswaan/components/FolderCard"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params

  const items = getSectionData<AccordionItemBlock[]>(PendaftaranVerifikasi as KemahasiswaanDataFile, "item-collection");

  const item = items.find(
    (item) => item.id === slug
  )

  if (!item) {
    notFound()
  }
  
  const breadcrumbItems = [
    ...PendaftaranVerifikasi.breadcrumbItems,
    {
      display: item.title,
      link: `/kemahasiswaan/pendaftaran-dan-verifikasi/${slug}`
    }
  ]

  return (
    <>
    {breadcrumbItems && <BreadcrumbSection items={breadcrumbItems!} />}
    
    <DetailSection item={item} />
    </>
  )
}

function DetailSection({item} : {item: AccordionItemBlock}) {
  return (
    <section className="px-6 lg:px-12 mx-auto min-h-[65vh] flex justify-center">
      <FolderCard title="Pendaftaran & Verifikasi" hasLayer={true}>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-center">
          {item.title}
        </h1>

        <ContentRenderer content={item.content as ContentBlock[]} />
      </FolderCard>
    </section>
  )
}