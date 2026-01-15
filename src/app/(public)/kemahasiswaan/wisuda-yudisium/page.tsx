// import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer";
import { ShellLayer } from "@/components/layout/ShellLayer";
import Image from "next/image";
import RadialBackground from "@/components/ui/radial-bg";
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
import CloudDecoration from "@/components/ui/cloud-decoration";

export default function WisudaPage() {
  const wisudaAccordionItems = getSectionData<ItemDataJSON[]>(WisudaYudisium as KemahasiswaanDataFile, "accordion")
  const itemCollectionData = getSectionData<ItemDataJSON[]>(WisudaYudisium as KemahasiswaanDataFile, "item-collection")

  return (
    <>
      <HeroSection {...WisudaYudisium.hero} breadcrumbItems={WisudaYudisium.breadcrumbItems} />
      <ShellLayer>
        <BackgroundLayer>
          <RadialBackground />
        </BackgroundLayer>
        <DecorationLayer className="rotate-y-180">
          <div className="absolute w-full aspect-2/1 scale-x-150 lg:scale-y-90 translate-y-[30%]">
            <Image src={"/assets/kemahasiswaan/bg-shape-1.webp"} alt={""} fill className=""/>
          </div>
          <div className="absolute w-full aspect-2/1 scale-x-150 lg:scale-y-90 -translate-y-[25%] rotate-y-180">
            <Image src={"/assets/kemahasiswaan/bg-shape-1.webp"} alt={""} fill className=""/>
          </div>
        </DecorationLayer>
        <ContentLayer>
          <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 min-h-screen pb-10">
            <ShellLayer>
              <ContentLayer>
                <div className="flex-col flex justify-center items-center">
                <section className="w-full max-w-7xl px-2 sm:px-6 lg:px-8 mb-10">
                  <HorizontalAccordion items={wisudaAccordionItems}/>
                </section>

                <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10 lg:pb-30">
                  {itemCollectionData?.map((item, index) => {
                    const isFirst = index == 0
                    const isOdd = itemCollectionData.length % 2 !== 0

                    return (
                      <div
                        key={item.id}
                        className={
                          isFirst && isOdd
                            ? "sm:col-span-2 w-full justify-self-center"
                            : ""
                        }
                      >
                        <ItemCard item={item} />
                      </div>
                  )})}
                </section>
                <CloudDecoration />
                </div>
              </ContentLayer>
            </ShellLayer>
          </section>
        </ContentLayer>
      </ShellLayer>
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