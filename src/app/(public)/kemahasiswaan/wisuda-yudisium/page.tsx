// import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ContentBlock, ContentRenderer, FlipCard, HeroSection, WisudaYudisium } from "@/features/kemahasiswaan";
import { FlipHorizontal, Folder, GraduationCap } from "lucide-react";


export default function WisudaPage() {
  const itemCollectionSection = WisudaYudisium.sections.find(
    (section) => section.type === "item-collection"
  )
  const itemCollectionData = itemCollectionSection?.items
  return (
    <>
    <HeroSection {...WisudaYudisium.hero} breadcrumbItems={WisudaYudisium.breadcrumbItems} />

    <section className="flex flex-wrap justify-center gap-6 px-6 lg:px-8 max-w-7xl mx-auto">
      {itemCollectionData?.map((item) => (
        <FlipCard
          key={item.id}
          className="
            w-full 
            sm:w-88 
            md:w-104 
            lg:w-120
            h-60 
            sm:h-68 
            lg:h-76
            overflow-hidden
            rounded-xl 
            shadow-md 
            relative
          "
          front={
            <>
              <h3 className="text-base sm:text-lg text-center font-semibold">
                {item.title}
              </h3>
              <FlipHorizontal className="absolute bottom-4 left-4 text-[#BCCCDC]" />
              <GraduationCap className="absolute top-4 right-4 text-[#BCCCDC]" />
            </>
          }
          back={
            <>
              <div className="flex flex-col text-2xs gap-2">
                <h3 className="font-semibold text-center text-xs">{item.title}</h3>
                <ContentRenderer content={item.content as ContentBlock[]} />
              </div>
              <GraduationCap className="absolute top-4 right-4 text-black" />
            </>
          }
        />
      ))}
    </section>
    </>
  )
}