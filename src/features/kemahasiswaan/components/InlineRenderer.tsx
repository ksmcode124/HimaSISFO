// InlineRenderer.tsx
import React from "react"
import ReactMarkdown from "react-markdown"

interface InlineRendererProps {
  text: string
}

export function InlineRenderer({ text }: InlineRendererProps) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <>{children}</>,
        a: ({ href, children }) => (
          <a
            target="_blank"
            href={href}
            className="text-primary underline underline-offset-4"
          >
            {children}
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  )
}
