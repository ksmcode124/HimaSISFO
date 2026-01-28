// types/section.ts
import { ItemDataJSON } from "./data"

export type SectionType =
  | "item-collection"
  | "accordion"
  | "section"

export interface BaseSection {
  type: SectionType
}

export type Section = {
  type: SectionType
  items: unknown[]
}

export interface ItemCollectionSection extends BaseSection {
  type: "item-collection"
  items: ItemDataJSON[]
}
