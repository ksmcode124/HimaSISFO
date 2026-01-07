import {
  PendaftaranVerifikasi,
  HeroSection,
  ContentRenderer,
  ContentBlock
} from "@/features/kemahasiswaan"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

import Link from "next/link"
import Image from "next/image"

type AccordionItemData = {
  id: string
  title: string
  content: ContentBlock[]
}

export default function Page() {
  const accordionSection = PendaftaranVerifikasi.sections.find(
    (section) => section.type === "accordion"
  )
  const accordionData = accordionSection?.items as AccordionItemData[]

  const itemCollectionSection = PendaftaranVerifikasi.sections.find(
    (section) => section.type === "item-collection"
  )
  const itemCollectionData = itemCollectionSection?.items
  return (
    <>
      <HeroSection {...PendaftaranVerifikasi.hero} breadcrumbItems={PendaftaranVerifikasi.breadcrumbItems} />

      <section className="max-w-7xl min-h-[55vh] mx-auto space-y-5">
        <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
          <div className="relative h-50 w-50">
            <Image src="/assets/kemahasiswaan/icon-pendaftaran-dan-verifikasi.webp" alt={""} fill className="object-contain" />
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4"
          >
            {accordionData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="
                  space-y-5
                  overflow-hidden
                "
              >
                <AccordionTrigger className="justify-between items-center rounded-xl border-black border">
                  {item.title}
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 py-4 px-6 text-balance border border-black rounded-xl">
                  <ContentRenderer content={item.content} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto py-5 border border-black rounded-2xl mb-5">
        {itemCollectionData?.map((item) => {
          return (
            <Link
              key={item.id}
              href={`pendaftaran-dan-verifikasi/${item.id}`}
              className="border bg-rl-gradient-primary aspect-square h-80 flex flex-col justify-end p-5"
            >
              <span className="text-white font-semibold text-xl">
                {item.title}
              </span>
            </Link>
          )
        })}
      </section>

    </>
  )
}
