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
      <HeroSection {...PelayananAdministratif.hero} />
      
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