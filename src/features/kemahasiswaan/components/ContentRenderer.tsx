// ContentRenderer.tsx
import React from "react"
import { ListRenderer } from "./ListRenderer"
import { ContentBlock } from "../types/content"
import { cn } from "@/lib/utils"

interface ContentRendererProps {
  content: ContentBlock[]
  className?: string
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  return (
    <div className={cn("w-full", className)}>
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
