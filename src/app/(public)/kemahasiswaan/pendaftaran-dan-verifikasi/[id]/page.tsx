import { notFound } from "next/navigation"
import {
  PendaftaranVerifikasi,
  ContentRenderer,
  ContentBlock,
} from "@/features/kemahasiswaan"

type PageProps = {
  params: {
    id: string
  }
}

export default function DetailPage({ params }: PageProps) {
  const section = PendaftaranVerifikasi.sections.find(
    (section) => section.type === "item-collection"
  )

  const item = section?.items.find(
    (item) => item.id === params.id
  )

  if (!item) {
    notFound()
  }

  return (
    <section className="px-6 lg:px-12 max-w-4xl mx-auto min-h-[65vh]">
      <h1 className="text-2xl font-semibold mb-6">
        {item.title}
      </h1>

      <ContentRenderer content={item.content as ContentBlock[]} />
    </section>
  )
}
