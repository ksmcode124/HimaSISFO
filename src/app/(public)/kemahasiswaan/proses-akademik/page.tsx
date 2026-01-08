"use client"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { HeroSection, Modal, ProsesAkademik } from "@/features/kemahasiswaan";
import { useState } from "react";

export default function ProsesAkademikPage() {
  const itemCollectionSection = ProsesAkademik.sections.find(
    (section) => section.type === "item-collection"
  )
  const itemCollectionData = itemCollectionSection?.items

  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
    <HeroSection {...ProsesAkademik.hero} breadcrumbItems={ProsesAkademik.breadcrumbItems}/>

    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto">
        {itemCollectionData?.map((item) => (
          <Card
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className=" border-0 w-full h-40 sm:h-48 md:h-52 lg:h-60 overflow-hidden bg-[#D9D9D9] rounded-md shadow-md relative hover:-translate-y-10 transition-transform duration-100 group"
          >
            <CardHeader className="px-4 h-full flex flex-col">
              <CardTitle className="text-base sm:text-2xs md:text-xs lg:text-sm font-medium line-clamp-1 group-hover:line-clamp-2">
                {item.title}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
    </section>

    <Modal open={!!selectedId} onClose={() => setSelectedId(null)} id={selectedId} />
    </>
  )
}