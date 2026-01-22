import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { SlashIcon } from "lucide-react";

interface BreadcrumbItemType {
  display: string;
  link: string;
}

export default function BreadcrumbSection({
  items,
}: {
  items: BreadcrumbItemType[];
}) {
  if (!items || items.length < 2) return null;

  const kabinet = items[0];
  const departemen = items[1];

  return (
    <section className="min-h-[30vh] lg:min-h-[25vh] px-8 sm:px-12 lg:px-30 flex flex-col justify-center w-full">
      <Breadcrumb className="border-b">
        <BreadcrumbList className="flex items-center flex-nowrap gap-2.5 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
          <BreadcrumbItem className="shrink-0">
            <BreadcrumbLink
              asChild
              className="text-white text-md sm:text-lg lg:text-xl"
            >
              <Link href={kabinet.link}>{kabinet.display}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="shrink-0">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#E63258] to-[#A43DA5] text-md sm:text-lg lg:text-xl">
              {departemen.display}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}
