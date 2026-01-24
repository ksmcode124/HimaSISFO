import { ShellLayer } from "@/components/layout/ShellLayer"
import { ItemDataJSON } from "../types/data"
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer"
import RadialBackground from "@/components/ui/radial-bg"
import { PendaftaranAccordionSection } from "./PendaftaranAccordionSection"
import { CloudDecoration } from "@/components/ui/cloud-decoration"
import { PendaftaranItemCollectionSection } from "./PendaftaranItemCollectionSection"

interface Props {
  accordionItems: ItemDataJSON[],
  itemCollectionItems: ItemDataJSON[],
}
export function PendaftaranMainSection({accordionItems, itemCollectionItems}: Props) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <ContentLayer>
        <PendaftaranAccordionSection items={accordionItems} />
        <CloudDecoration className="rotate-z-180" />
        <PendaftaranItemCollectionSection items={itemCollectionItems} />
      </ContentLayer>
    </ShellLayer>
  )
}