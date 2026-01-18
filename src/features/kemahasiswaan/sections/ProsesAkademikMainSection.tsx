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
}

export function ProsesAkademikMainSection({items, openModal}: Props) {
  return (
    <ShellLayer>
      <BackgroundLayer>
        <RadialBackground />
      </BackgroundLayer>

      <ContentLayer>
        <ProsesAkademikGridSection items={items} onSelect={openModal} />
        <CloudDecoration />
      </ContentLayer>
    </ShellLayer>
  )
}