// import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  ItemDataJSON,
  ContentBlock,
  ContentRenderer,
  FlipCard,
  getSectionData,
  HeroSection,
  HorizontalAccordion,
  KemahasiswaanDataFile,
  WisudaYudisium,
} from "@/features/kemahasiswaan";
import { FlipHorizontal, GraduationCap } from "lucide-react";

export default function WisudaPage() {
  const wisudaAccordionItems = getSectionData<ItemDataJSON[]>(WisudaYudisium as KemahasiswaanDataFile, "accordion")
  const itemCollectionData = getSectionData<ItemDataJSON[]>(WisudaYudisium as KemahasiswaanDataFile, "item-collection")

  return (
    <>
      <HeroSection {...WisudaYudisium.hero} breadcrumbItems={WisudaYudisium.breadcrumbItems} />
      
      <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-10">
        <HorizontalAccordion items={wisudaAccordionItems}/>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {itemCollectionData?.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
    </>
  );
}

function ItemCard({item}: {item: ItemDataJSON}) {
  return (
    <FlipCard
      className="
        w-full
        h-72 sm:h-80 lg:h-88
        rounded-xl
        shadow-md
        overflow-hidden
        relative
      "
      front={
        <>
          <h3 className="group-hover:-translate-y-2 transform-transform duration-500 text-sm sm:text-base lg:text-lg text-center font-semibold">
            {item.title}
          </h3>

          <FlipHorizontal className="absolute bottom-4 left-4 text-[#BCCCDC]" />
          <GraduationCap className="absolute top-4 right-4 text-[#BCCCDC]" />
        </>
      }
      back={
        <>
          <div className="flex flex-col h-full relative">
            <div className="sticky top-0 z-10 py-2">
              <h3 className="font-semibold text-center text-xs">
                {item.title}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto text-xs pr-1">
              <ContentRenderer
                content={item.content as ContentBlock[]}
              />
            </div>
          </div>

          <GraduationCap className="absolute top-4 right-4 text-black" />
        </>
      }
    />
  )
}