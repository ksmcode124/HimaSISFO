import Image from "next/image";
import { cn } from "@/lib/utils";
import BreadcrumbSection from "./BreadcrumbSection";
import { BreadcrumbItemData } from "@/components/ui/Breadcrumb";

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
