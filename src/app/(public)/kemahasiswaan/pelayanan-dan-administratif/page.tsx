import { 
  PelayananAdministratif,
  AccordionItemBlock, 
  HeroSection, 
  KemahasiswaanDataFile, 
  getSectionData,
  VerticalAccordion
} from "@/features/kemahasiswaan";

export default function Page() { 
  const pelayananAdministratifItems = getSectionData<AccordionItemBlock[]>(PelayananAdministratif as KemahasiswaanDataFile, "accordion")
  
  return (
    <>
      <HeroSection {...PelayananAdministratif.hero} breadcrumbItems={PelayananAdministratif.breadcrumbItems} />
      
      <section className="max-w-7xl min-h-[55vh] mx-auto">
        <VerticalAccordion items={pelayananAdministratifItems} />
      </section>
    </>
  )
}

