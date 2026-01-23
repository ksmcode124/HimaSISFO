import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer"
import { ShellLayer } from "@/components/layout/ShellLayer"
import Image from "next/image"
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
    <ShellLayer>
      <BackgroundLayer>
        <Image
          src="/assets/kemahasiswaan/bg-hero.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </BackgroundLayer>
      <ContentLayer className="flex flex-col justify-center items-center w-full">
        <BreadcrumbSection items={breadcrumbItems} />
        <PendaftaranVerifikasiDetailSection item={item} />
      </ContentLayer>
    </ShellLayer>
    </>
  )
}
