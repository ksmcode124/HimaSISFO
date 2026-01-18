import React from "react"
import { InlineRenderer } from "./InlineRenderer"
import { ListItem } from "../types/content"
import { cn } from "@/lib/utils"

interface ListRendererProps {
  ordered?: boolean
  listStyle?:
    | "list-disc"
    | "list-circle"
    | "list-square"
    | "list-decimal"
    | "list-upper-roman"
    | "list-lower-roman"
    | "list-upper-alpha"
    | "list-lower-alpha"
  items: ListItem[]
}

/** ListRenderer dibuat rekursif agar bisa menampilkan multi-level list */
export function ListRenderer({ ordered = true, items, listStyle }: ListRendererProps) {
  const ListTag = ordered ? "ol" : "ul"
  const defaultStyle = ordered ? "list-decimal" : "list-disc"
  return (
    <ListTag className={cn(
      "ml-5 space-y-1",
      listStyle ?? defaultStyle

    )}>
      {items.map((item, index) => {
        const isOrdered = item.ordered ?? ordered

        return (
          <li key={index}>
            <InlineRenderer text={item.text} />

            {item.items && item.items.length > 0 && (
              <ListRenderer ordered={isOrdered} items={item.items} listStyle={item.listStyle} />
            )}
          </li>
        )
      })}
    </ListTag>
  )
}
