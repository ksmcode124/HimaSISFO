import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { ContentBlock, ContentRenderer, HeroSection, PelayananAdministratif } from "@/features/kemahasiswaan";

type AccordionItemData = {
  id: string
  title: string
  content: ContentBlock[]
}

export default function Page() { 
  const accordionSection = PelayananAdministratif.sections.find(
    (section) => section.type === "accordion"
  )
  const accordionData = accordionSection?.items as AccordionItemData[]
  
  return (
    <>
      <HeroSection {...PelayananAdministratif.hero} breadcrumbItems={PelayananAdministratif.breadcrumbItems} />
      
      <section className="max-w-7xl min-h-[55vh] mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col justify-center lg:flex-row gap-4"
        >
          {accordionData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="group border rounded-xl lg:h-160 max-w-170 p-0 overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between">
                {/* CONTENT */}
                <AccordionContent
                  className="
                    hidden
                    group-data-[state=open]:block
                    px-6 py-4
                  "
                >
                  <ContentRenderer content={item.content} />
                </AccordionContent>

                {/* TITLE */}
                <AccordionTrigger
                  hasChevron={false}
                  writingMode="vertical-btt"
                  className="
                    px-4 py-6
                    bg-rl-gradient-primary
                    text-white
                    w-full

                    /* KEY FIX */
                    lg:group-data-[state=closed]:h-full
                    lg:group-data-[state=open]:h-auto

                    flex-row
                    justify-between
                  "
                >
                  {item.title}
                </AccordionTrigger>

              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}