import {
  Pengumuman,
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
  const accordionSection = Pengumuman.sections.find(
    (section) => section.type === "accordion"
  )
  const accordionData = accordionSection?.items as AccordionItemData[]

  return (
    <>
      <HeroSection {...Pengumuman.hero} breadcrumbItems={Pengumuman.breadcrumbItems} />

      <section className="max-w-7xl min-h-[55vh] mx-auto">
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
      </section>

    </>
  )
}
