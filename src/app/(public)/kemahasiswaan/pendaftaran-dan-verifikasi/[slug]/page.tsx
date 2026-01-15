import { notFound } from "next/navigation"
import Image from "next/image"
import {
  PendaftaranVerifikasi,
  ContentRenderer,
  ContentBlock,
  BreadcrumbSection,
  getSectionData,
  ItemDataJSON,
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

  const items = getSectionData<ItemDataJSON[]>(PendaftaranVerifikasi as KemahasiswaanDataFile, "item-collection");

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

function DetailSection({item} : {item: ItemDataJSON}) {
  return (
    <section className="px-12 mx-auto min-h-[65vh] flex justify-center relative">
      <div className="relative">
        <div className="aspect-4/3 w-70 absolute z-30 right-0 translate-x-[65%] -translate-y-[30%]">
          <Image src={"/assets/kemahasiswaan/decoration-cloud-3.webp"} alt={""} fill className="object-contain" />
        </div>
        <div className="aspect-4/3 w-120 absolute left-0 top-1/2 -translate-x-[45%] rotate-15 -translate-y-[10%]">
          <Image src={"/assets/kemahasiswaan/decoration-cloud-1.webp"} alt={""} fill className="object-contain" />
        </div>
        <FolderCard title="Pendaftaran & Verifikasi" hasLayer={true}>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-center">
            {item.title}
          </h1>

          <ContentRenderer content={item.content as ContentBlock[]} />
        </FolderCard>
      </div>
    </section>
  )
}