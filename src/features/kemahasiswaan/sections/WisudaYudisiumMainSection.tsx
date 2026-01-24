import { ShellLayer } from "@/components/layout/ShellLayer";
import { ItemDataJSON } from "../types/data";
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer";
import RadialBackground from "@/components/ui/radial-bg";
import { WisudaDecorationLayer } from "./WisudaYudisiumDecorationSection";
import { WisudaAccordionSection } from "./WisudaYudisiumAccordionSection";
import { WisudaYudisiumItemsSection } from "./WisudaYudisiumItemsSection";
import { CloudDecoration } from "@/components/ui/cloud-decoration";

interface Props {
  accordionItems: ItemDataJSON[],
  itemCollectionItems: ItemDataJSON[],
  setSelectedId: (id: string | null) => void
}

export function WisudaYudisiumMainSection({accordionItems, itemCollectionItems, setSelectedId}: Props) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <WisudaDecorationLayer />

      <ContentLayer>
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-18 min-h-screen pb-10">
          <ShellLayer>
            <ContentLayer className="flex flex-col items-center">
              <WisudaAccordionSection items={accordionItems} />
              <WisudaYudisiumItemsSection setSelectedId={setSelectedId} items={itemCollectionItems} />
              <CloudDecoration />
            </ContentLayer>
          </ShellLayer>
        </section>
      </ContentLayer>
    </ShellLayer>
  )
}