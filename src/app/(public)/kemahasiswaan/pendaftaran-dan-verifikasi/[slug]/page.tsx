export const dynamic = "force-static"
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
    
    <section className="px-6 lg:px-12 mx-auto min-h-[65vh] flex justify-center">
      <div className="relative max-h-[75vh] sm:w-[40vw] overflow-visible">
        <div className="relative">
          
          {/* background offset layer */}
          <div
            className="
              absolute inset-0 h-[90%]
              bg-linear-to-r to-[#1B3C53] from-50%-[#1F445F] from-[#456882] rounded-xl
              z-0
              translate-y-15 -translate-x-6
              sm:translate-y-17 sm:-translate-x-8
              lg:translate-y-25 lg:-translate-x-10
            "
          />

          {/* header */}
          <h1
            className="
              relative z-20
              bg-[#EDF3F6] rounded-xl
              font-medium
              px-4 py-2
              text-base
              max-w-[80%]
              sm:text-md border-t-2 border-[#CECECE]
              md:text-lg md:px-5 md:py-3
              lg:text-xl lg:max-w-[70%]
            "
          >
            Pendaftaran & Verifikasi
          </h1>

          {/* content */}
          <div
            className="
              relative z-10
              border-2 border-[#CECECE]
              bg-[#EDF3F6] rounded-xl
              overflow-y-auto
              -mt-4
              pt-6 pb-8
              px-4
              sm:px-6 sm:-mt-5 sm:pt-7
              md:px-8 md:-mt-6 md:pt-8
              lg:px-10 lg:-mt-7 lg:pt-9
            "
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-center">
              {item.title}
            </h1>

            <ContentRenderer content={item.content as ContentBlock[]} />
          </div>

        </div>
      </div>

    </section>
    </>
  )
}