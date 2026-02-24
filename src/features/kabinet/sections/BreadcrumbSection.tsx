import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { ColorMap } from "../types";
import { useState } from "react";

interface BreadcrumbItemType {
  display: string;
  link: string;
}

interface BreadcrumbSectionProps {
  items: BreadcrumbItemType[];
  colorMap: ColorMap;
}

export default function BreadcrumbSection({
  items,
  colorMap
}: BreadcrumbSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!items || items.length < 2) return null;

  const kabinet = items[0];
  const departemen = items[1];

  return (
    <section className="relative min-h-[30vh] lg:min-h-[25vh] px-8 sm:px-12 lg:px-30 flex flex-col justify-center w-full overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar pb-3">
        <Breadcrumb className="mt-10">
          <BreadcrumbList className="flex items-center flex-nowrap gap-2.5 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link 
                  href={kabinet.link}
                  className="text-white text-md sm:text-lg lg:text-xl font-medium z-90"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    color: isHovered ? (colorMap.hoverText || "white") : "white",
                  }}
                >
                  {kabinet.display}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white">
              <SlashIcon className="font-bold" />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="shrink-0">
              <span 
                className="bg-clip-text text-transparent text-md sm:text-lg lg:text-xl font-medium"
                style={{ 
                  backgroundImage: colorMap?.breadcrumbText
                }}
              >
                {departemen.display}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          className="h-0.5 max-w-full"
          style={{ 
            backgroundImage: colorMap?.breadcrumbUnderline
          }}
        />
      </div>
    </section>
  );
}
