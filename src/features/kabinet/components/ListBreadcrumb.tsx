"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ColorMap } from "../types";

interface BreadcrumbItemData {
  display: string;
  link: string;
}

export function ModifiedListBreadcrumb({
  items,
  colorMap,
}: {
  items: BreadcrumbItemData[];
  colorMap: ColorMap;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Breadcrumb
      className="w-full border-b-2"
      style={{
        borderImageSource: colorMap.breadcrumbUnderline,
        borderImageSlice: 1,
        borderBottomColor: "transparent",
      }}
    >
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {isLast ? (
                    <span
                      className="text-md sm:text-lg lg:text-xl font-medium"
                      style={{
                        backgroundImage: colorMap.breadcrumbText,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.display}
                    </span>
                  ) : (
                    <Link
                      href={item.link}
                      className="text-md sm:text-lg lg:text-xl font-medium transition-colors"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        color:
                          hoveredIndex === index
                            ? colorMap.hoverText || "white"
                            : "white",
                      }}
                    >
                      {item.display}
                    </Link>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="text-white">
                  /
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
