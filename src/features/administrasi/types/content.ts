// Union type for any content block on a page
// Can be either a simple paragraph or a nested list
export type ContentBlock =
  | ListNode      // Represents a list structure
  | ParagraphNode // Represents a paragraph of text

// Paragraph node represents a single block of text
export type ParagraphNode = {
  type: "paragraph" // Discriminator for type-checking
  text: string      // The paragraph content
}

// List node represents a nested list, ordered or unordered
export type ListNode = {
  type: "list"      // Discriminator for type-checking
  ordered?: boolean // Optional flag for ordered list (default unordered)
  items: ListItem[] // Array of list items
}

// Represents an individual item in a list
export type ListItem = {
  text: string       // Text content of the list item
  ordered?: boolean  // Optional override for ordered flag
  listStyle?:        // Optional CSS-style list representation
    | "list-disc"
    | "list-circle"
    | "list-square"
    | "list-decimal"
    | "list-upper-roman"
    | "list-lower-roman"
    | "list-upper-alpha"
    | "list-lower-alpha"
  items?: ListItem[] // Optional nested sub-items
}