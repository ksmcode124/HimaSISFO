// ContentRenderer.tsx
import React from "react"
import { ListRenderer } from "./ListRenderer"
import { ContentBlock } from "../types"

interface ContentRendererProps {
  content: ContentBlock[]
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        switch (block.type) {
          case "list":
            return <ListRenderer key={index} ordered={block.ordered} items={block.items} />
          case "paragraph":
            return <p key={index}>{block.text}</p>
          default:
            return null
        }
      })}
    </div>
  )
}
