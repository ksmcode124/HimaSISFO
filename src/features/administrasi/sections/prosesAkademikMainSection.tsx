import { Dispatch, SetStateAction } from "react"
import { ItemDataJSON } from "../types/data"
import { ShellLayer } from "@/components/layout/shellLayer"
import { BackgroundLayer, ContentLayer } from "@/components/layout/layer"
import RadialBackground from "@/components/ui/radialBg"
import { CloudDecoration } from "@/components/ui/cloudDecoration"
import { ProsesAkademikGridSection } from "./ProsesAkademikGridSection"

interface Props {
  items: ItemDataJSON[]
  openModal: Dispatch<SetStateAction<string | null>>
  selectedId: string | null
}

export function ProsesAkademikMainSection({ items, selectedId, openModal }: Props) {
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