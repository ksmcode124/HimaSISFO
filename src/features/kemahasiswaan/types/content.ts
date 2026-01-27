// types/content.ts
export type ContentBlock =
  | ListNode
  | ParagraphNode

export type ParagraphNode = {
  type: "paragraph"
  text: string
}

export type ListNode = {
  type: "list"
  ordered?: boolean
  items: ListItem[]
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