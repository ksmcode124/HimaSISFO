import { ItemDataJSON } from "./data"

// Defines possible section types in a Kemahasiswaan page
export type SectionType =
  | "item-collection" // Represents a grouped collection of items (cards, lists, etc.)
  | "accordion"       // Represents a collapsible section
  | "section"         // Generic section for CTA or content blocks

// Base section with only type info for type narrowing
export interface BaseSection {
  type: SectionType  // Discriminator for narrowing to specific section types
}

// Generic section representation with flexible items
export type Section = {
  type: SectionType  // Section type discriminator
  items: unknown[]   // Items can be any shape; narrowed in feature hooks
}

// Item-collection section with strict typing
export interface ItemCollectionSection extends BaseSection {
  type: "item-collection"  // Discriminator for item-collection
  items: ItemDataJSON[]    // Strongly typed array of items for rendering
}