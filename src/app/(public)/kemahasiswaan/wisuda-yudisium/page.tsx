import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { HeroSection, WisudaYudisium } from "@/features/kemahasiswaan";

export default function WisudaPage() {
  const itemCollectionSection = WisudaYudisium.sections.find(
    (section) => section.type === "item-collection"
  )
  const itemCollectionData = itemCollectionSection?.items
  return (
    <>
    <HeroSection {...WisudaYudisium.hero} breadcrumbItems={WisudaYudisium.breadcrumbItems} />

    {/** TODO: Menyesuaikan UI UX folder & modal */}
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 lg:px-12 max-w-7xl mx-auto">
        {itemCollectionData?.map((item) => (
          <Card
            key={item.id}
            className="w-full h-40 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-md shadow-md relative"
          >
            <CardHeader className="pt-8 px-4 h-full flex flex-col justify-center">
              <CardTitle className="text-base sm:text-sm md:text-md lg:text-lg font-semibold line-clamp-2">
                {item.title}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
    </section>
    </>
  )
}