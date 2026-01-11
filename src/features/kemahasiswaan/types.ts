/* JSON Data-related TYPES */
export type ParagraphNode = {
  type: "paragraph"
  text: string
}

export type ListNode = {
  type: "list"
  ordered?: boolean
  items: ListItem[]
}

export type ItemDataJSON = {
  id: string
  title: string
  content: ContentBlock[]
  image?: string
}

export type ListItem = {
  text: string
  ordered?: boolean
  listStyle?: | "list-disc"
    | "list-circle"
    | "list-square"
    | "list-decimal"
    | "list-upper-roman"
    | "list-lower-roman"
    | "list-upper-alpha"
    | "list-lower-alpha"
  items?: ListItem[]
}

export type ContentBlock =
  | ListNode
  | ParagraphNode

export type SectionType = "item-collection" | "section" | "accordion"
export type Section = {
  type: SectionType
  items: unknown[]
}

export type KemahasiswaanDataFile = {
  schemaVersion: number
  slug: string
  seo: {
    title: string
    description: string
  };
  hero: {
    title: string
    subtitle: string
  };
  sections: Section[];
  [key: string]: unknown;
}


/* UI-Centric Types */
export interface CardProps {
  id: string,
  title: string,
  description: string,
}

export interface BlankoItem {
  id: string,
  title: string,
  image: string,
  filepath: string
}

export interface CTASection {
  title: string,
  subtitle: string,
  iconUrl: string
}