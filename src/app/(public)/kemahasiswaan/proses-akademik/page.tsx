"use client"
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer";
import { ShellLayer } from "@/components/layout/ShellLayer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CloudDecoration from "@/components/ui/cloud-decoration";
import RadialBackground from "@/components/ui/radial-bg";
import { ItemDataJSON, getSectionData, HeroSection, KemahasiswaanDataFile, Modal, ProsesAkademik } from "@/features/kemahasiswaan";
import { useState } from "react";

export default function ProsesAkademikPage() {
  const itemCollectionData = getSectionData<ItemDataJSON[]>(ProsesAkademik as KemahasiswaanDataFile, "item-collection")
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
    <HeroSection {...ProsesAkademik.hero} breadcrumbItems={ProsesAkademik.breadcrumbItems}/>

    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>
      <ContentLayer>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 lg:px-12 max-w-7xl mx-auto">
            {itemCollectionData?.map((item) => 
              <ItemCard key={item.id} title={item.title} onClick={() => setSelectedId(item.id)} />
            )}
        </section>
        <CloudDecoration />
      </ContentLayer>
    </ShellLayer>

    <Modal open={!!selectedId} onClose={() => setSelectedId(null)} id={selectedId} />
    </>
  )
}

function ItemCard({title, onClick} : {title: string, onClick: () => void}) {
  return (
    <Card
      onClick={onClick}
      className=" border-0 w-full h-40 sm:h-48 md:h-52 lg:h-60 overflow-hidden bg-[#D9D9D9] rounded-md shadow-md relative hover:-translate-y-10 transition-transform duration-100 group"
    >
      <CardHeader className="px-4 h-full flex flex-col">
        <CardTitle className="text-base sm:text-2xs md:text-xs lg:text-sm font-medium line-clamp-1 group-hover:line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}