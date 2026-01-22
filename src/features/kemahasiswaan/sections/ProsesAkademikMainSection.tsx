import { Dispatch, SetStateAction } from "react"
import { ItemDataJSON } from "../types/data"
import { ShellLayer } from "@/components/layout/ShellLayer"
import { BackgroundLayer, ContentLayer } from "@/components/layout/Layer"
import RadialBackground from "@/components/ui/radial-bg"
import { CloudDecoration } from "@/components/ui/cloud-decoration"
import { ProsesAkademikGridSection } from "./ProsesAkademikGridSection"

interface Props {
  items: ItemDataJSON[]
  openModal: Dispatch<SetStateAction<string | null>>
  selectedId: string | null
}

export function ProsesAkademikMainSection({items, selectedId, openModal}: Props) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <ContentLayer>
        <ProsesAkademikGridSection selectedId={selectedId} items={items} onSelect={openModal} />
        <CloudDecoration />
      </ContentLayer>
    </ShellLayer>
  )
}