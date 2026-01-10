import Image from "next/image";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbItemData, BreadcrumbSeparator } from "@/components/ui/Breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import { SlashIcon } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  breadcrumbItems?: BreadcrumbItemData[];
}

export default function HeroSection({ title, subtitle, breadcrumbItems }: HeroSectionProps) {
  const hasBreadcrumb = breadcrumbItems && breadcrumbItems.length > 0;

  return (
    <>
      {hasBreadcrumb && <BreadcrumbSection items={breadcrumbItems!} />}
      <HeroContent title={title} subtitle={subtitle} hasBreadcrumb={!!hasBreadcrumb} />
      <PitaDecoration />
    </>
  );
}

/** --- Internal Components --- */
function BreadcrumbSection({ items }: { items: BreadcrumbItemData[] }) {
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

function HeroContent({ title, subtitle, hasBreadcrumb }: { title: string; subtitle: string; hasBreadcrumb: boolean }) {
  /** Gunakan 30vh agar hero tetap seimbang dengan breadcrumb; 55vh untuk hero tanpa breadcrumb supaya tidak terlalu pendek */
  const minHeightClass = hasBreadcrumb ? "min-h-[30vh]" : "min-h-[55vh]";
  return (
    <section className={cn("flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20", minHeightClass)}>
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">{title}</h1>
      <h2 className="font-semibold text-base sm:text-lg md:text-xl text-center mt-2 sm:mt-4">{subtitle}</h2>
    </section>
  );
}

function PitaDecoration() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kemahasiswaan/decoration-pita.webp"
        alt=""
        fill
        className="object-contain pointer-events-none"
        priority
      />
    </div>
  );
}
