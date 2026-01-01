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

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import Link from "next/link"

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
      <HeroSection {...PendaftaranVerifikasi.hero} />

      <section className="px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {accordionData.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger>
                {item.title}
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance">
                <ContentRenderer content={item.content} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto">
        {itemCollectionData?.map((item) => (
          <Card
            key={item.id}
            className="w-full h-40 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-md shadow-md relative"
          >
            <CardHeader className="pt-8 px-4 h-full flex flex-col justify-center">
              <CardTitle className="text-base sm:text-sm md:text-md lg:text-lg font-semibold line-clamp-2">
                {item.title}
              </CardTitle>
              <CardAction className="mt-4">
                <Link
                  href={`pendaftaran-dan-verifikasi/${item.id}`}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Lihat Detail
                </Link>
              </CardAction>

            </CardHeader>
          </Card>
        ))}
      </section>
    </>
  )
}
