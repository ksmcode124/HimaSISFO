import Link from "next/link"
import { SlashIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { Fragment } from "react"
import { cn } from "@/lib/utils/cn"

export type BreadcrumbItem = {
  display: string,
  link: string
}

export function ListBreadcrumb({items} : {items?: BreadcrumbItem[]}) {
  if (!items) return

  return (
    <Breadcrumb className="border-b">
      <BreadcrumbList>
      {items?.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <Fragment key={index}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={cn(
              isLast ? "text-black" : "",
              "text-md sm:text-lg lg:text-xl font-medium"
            )}>
              <Link href={item.link}>{item.display}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          { !isLast &&
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          }
          </Fragment>
        )
      })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}