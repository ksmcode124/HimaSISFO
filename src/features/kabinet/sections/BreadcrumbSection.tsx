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
    <section className="relative min-h-[30vh] lg:min-h-[25vh] px-8 sm:px-12 lg:px-30 flex flex-col justify-center w-full overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar pb-3">
        <Breadcrumb className="mt-10">
          <BreadcrumbList className="flex items-center flex-nowrap gap-2.5 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink
                asChild
                className="text-white text-md sm:text-lg lg:text-xl font-medium hover:text-[#2D2D51] active:text-[#2D2D51] z-90"
              >
                <Link href={kabinet.link}>{kabinet.display}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white">
              <SlashIcon className="font-bold" />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="shrink-0">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#E63258] to-[#A43DA5] text-md sm:text-lg lg:text-xl font-medium">
                {departemen.display}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          className="h-0.5 max-w-full"
          style={{
            backgroundImage: `linear-gradient(to right, #E63258, #FFFFFF, #A43DA5)`,
          }}
        />
      </div>
    </section>
  );
}
