import Image from "next/image"
import { KemahasiswaanBreadcrumb, BreadcrumbItem } from "../components/KemahasiswaanBreadcrumbs"

interface ContentProps {
  title: string
  subtitle: string
  breadcrumbItems?: BreadcrumbItem[]
}

export default function HeroSection({title, subtitle, breadcrumbItems} : ContentProps) {
  return (
    <>
    { breadcrumbItems &&
      <section className="min-h-[30vh] lg:min-h-[25vh] px-8 sm:px-12 lg:px-30 flex flex-col justify-center w-full">
        <KemahasiswaanBreadcrumb items={breadcrumbItems} />
      </section>
    }
    <section className="flex flex-col items-center justify-center min-h-[55vh] px-4 sm:px-6 lg:px-20">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
        {title}
      </h1>
      <h2 className="font-semibold text-base sm:text-lg md:text-xl text-center mt-2 sm:mt-4">
        {subtitle}
      </h2>
    </section>

    <Pita />
    </>
  )
}

function Pita() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kemahasiswaan/decoration-pita.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}