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

  if (!accordionData) return null

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
    </>
  )
}
