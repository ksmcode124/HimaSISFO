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

export type AccordionItemBlock = {
  id: string
  title: string
  content: ContentBlock[]
}

export type ListItem = {
  text: string
  ordered?: boolean
  items?: ListItem[]
}

export type ContentBlock =
  | ListNode
  | ParagraphNode

export type SectionType = "item-collection" | "section" | "accordion"
export type Section = {
  type: SectionType
  items: any[]
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
  [key: string]: any;
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