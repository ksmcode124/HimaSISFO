import {
  Pembayaran,
  HeroSection,
  ContentRenderer,
  AccordionItemBlock
} from "@/features/kemahasiswaan"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

import Image from "next/image"

export default function Page() {
  const accordionSection = Pembayaran.sections.find(
    (section) => section.type === "accordion"
  )
  const accordionData = accordionSection?.items as AccordionItemBlock[]

  return (
    <>
      <HeroSection {...Pembayaran.hero} breadcrumbItems={Pembayaran.breadcrumbItems} />

      <section className="max-w-7xl min-h-[55vh] mx-auto space-y-5">
        <div className="grid lg:grid-cols-[1fr_3fr] grid-rows-2 lg:grid-rows-1 justify-items-center items-center">
          <div className="relative h-50 w-50">
            <Image src="/assets/kemahasiswaan/icon-pembayaran.webp" alt={""} fill className="object-contain" />
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4"
          >
            {accordionData.slice(0, 3).map((item) => (
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
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {accordionData.slice(3).map((item) => (
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
