"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("px-4 bg-none", className)}
      {...props}
    />
  )
}

type AccordionTriggerProps =
  React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
    hasChevron?: boolean
    writingMode?: "horizontal" | "vertical-btt"
  }

function AccordionTrigger({
  className,
  children,
  hasChevron = true,
  writingMode = "horizontal",
  ...props
}: AccordionTriggerProps) {
  const isVertical = writingMode === "vertical-btt"

  return (
    <AccordionPrimitive.Header 
      data-slot="accordion-trigger"
      className="flex sm:data-[state=closed]:h-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        {...props}
        className={cn(
          `
          flex flex-1 gap-4
          rounded-md px-4 py-4
          text-sm font-medium
          transition-shadow outline-none
          hover:underline
          disabled:pointer-events-none disabled:opacity-50

          /* DEFAULT (mobile + open) */
          flex-row items-center justify-between
          [writing-mode:horizontal-tb]

          /* CLOSED — VERTICAL MODE */
          ${isVertical ? `
            lg:data-[state=closed]:flex
            lg:data-[state=closed]:items-center
            lg:data-[state=closed]:justify-end
            lg:data-[state=closed]:-rotate-180
            lg:data-[state=closed]:[writing-mode:vertical-rl]
            lg:data-[state=closed]:[direction:rtl]
            lg:data-[state=closed]:h-full
            lg:data-[state=closed]:overflow-hidden
          ` : ""}

          /* OPEN — FORCE NORMAL FLOW */
          lg:data-[state=open]:flex-row
          lg:data-[state=open]:items-center
          lg:data-[state=open]:justify-center
          lg:data-[state=open]:[writing-mode:horizontal-tb]
          `,
          className
        )}
      >
        {/* TEXT */}
        <span
          className={cn(
            `
            block text-center
            whitespace-normal
            break-words
            max-w-full
            `,
            isVertical &&
              `
              lg:data-[state=closed]:flex
              lg:data-[state=closed]:items-center
              lg:data-[state=closed]:justify-center
              `
          )}
        >
          {children}
        </span>

        {/* CHEVRON */}
        {hasChevron && (
          <ChevronDownIcon
            className={cn(
              `
              pointer-events-none size-6 shrink-0
              transition-transform duration-200
              data-[state=open]:rotate-180
              `,
              isVertical && "lg:data-[state=closed]:rotate-90"
            )}
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:opacity-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
