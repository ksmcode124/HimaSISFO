export type CardProps = {
  id: string,
  title: string,
  description: string,
}

export type CTASection = {
  title: string,
  subtitle: string,
  cta: string
}

// content-types.ts
export type TextNode = {
  type: "text"
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export type LinkNode = {
  type: "link"
  href: string
  children: InlineNode[]
}

export type InlineNode = TextNode | LinkNode


export type ParagraphNode = {
  type: "paragraph"
  children: InlineNode[]
}

export type ListNode = {
  type: "list"
  ordered?: boolean
  items: ListItemNode[]
}

export type ListItemNode = {
  content: InlineNode[]
  children?: ListNode
}

export interface ListItem {
  text: string
  ordered?: boolean
  items?: ListItem[]
}

export type ContentBlock =
  | {
      type: "list"
      ordered?: boolean
      items: ListItem[]
    }
  | {
      type: "paragraph"
      text: string
    }

export type BlockNode = ParagraphNode | ListNode
