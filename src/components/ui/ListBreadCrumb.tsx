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
import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
  display: string,
  link: string
}

export function ListBreadcrumb({items} : {items?: BreadcrumbItem[]}) {
  if (!items) return

  return (
    <Breadcrumb className="border-b-2 border-b-[#265A8C]">
      <BreadcrumbList>
      {items?.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <Fragment key={index}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={cn(
              isLast ? "text-black" : "text-[#747474]",
              "font-semibold text-xs sm:text-sm md:text-md lg:text-xl"
            )}>
              <Link href={item.link}>{item.display}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          { !isLast &&
            <BreadcrumbSeparator color="#747474">
              /
            </BreadcrumbSeparator>
          }
          </Fragment>
        )
      })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}