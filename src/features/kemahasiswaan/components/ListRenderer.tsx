import React from "react"
import { InlineRenderer } from "./InlineRenderer"
import { ListItem } from "../types"

interface ListRendererProps {
  ordered?: boolean
  items: ListItem[]
}

/** ListRenderer dibuat rekursif agar bisa menampilkan multi-level list */
export function ListRenderer({ ordered = true, items }: ListRendererProps) {
  const ListTag = ordered ? "ol" : "ul"

  return (
    <ListTag className={ordered ? "list-decimal ml-5 space-y-2" : "list-disc ml-5 space-y-2"}>
      {items.map((item, index) => {
        const isOrdered = item.ordered ?? ordered

        return (
          <li key={index}>
            <InlineRenderer text={item.text} />

            {item.items && item.items.length > 0 && (
              <ListRenderer ordered={isOrdered} items={item.items} />
            )}
          </li>
        )
      })}
    </ListTag>
  )
}
