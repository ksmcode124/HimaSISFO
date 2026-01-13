import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbItemData, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BreadcrumbSection({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <section className="min-h-[30vh] lg:min-h-[25vh] px-8 sm:px-12 lg:px-30 flex flex-col justify-center w-full">
      <Breadcrumb className="border-b">
        <BreadcrumbList>
          {items.map(({link, display}, index) => {
            const isLast = index === items.length - 1

            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    asChild 
                    className={cn(
                      isLast ? "text-black" : "",
                      "text-md sm:text-lg lg:text-xl font-medium"
                    )}
                  >
                    <Link href={link}>{display}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {/* Separator hanya ditampilkan untuk item non-terakhir supaya tidak ada garis miring ekstra di akhir (trailing separator) */}
                { !isLast && (
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}