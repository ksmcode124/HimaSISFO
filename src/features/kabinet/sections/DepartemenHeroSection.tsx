import Image from "next/image";
import { Pita } from "../components/KabinetOrnaments";
import BreadcrumbSection from "./BreadcrumbSection";
import { BreadcrumbItemData } from "@/components/ui/breadcrumb";
import { ColorMap } from "../types";

interface DepartemenHeroProps {
  nama_dept: string;
  deskripsi: string | null;
  logo_dept: string | null;
  bg_image: string | null;
  kabinet_id: number | string;
  kabinet_nama: string;
  colorMap: ColorMap
}

export default function DepartemenHeroSection({
  nama_dept,
  deskripsi,
  logo_dept,
  bg_image,
  kabinet_id,
  kabinet_nama,
  colorMap
}: DepartemenHeroProps) {
  const breadcrumbItems: BreadcrumbItemData[] = [
    {
      display: kabinet_nama,
      link: `/kabinet/${kabinet_id}`,
    },
    {
      display: nama_dept,
      link: "#",
    },
  ];
  return (
    <div className="relative w-full">
      <section className="relative flex flex-col w-full min-h-120 items-center">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={bg_image || "/assets/kabinet/placeholder-bg.webp"}
            alt={`Departemen ${nama_dept}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Breadcrumb */}
        <div className="w-full pt-20 md:pt-35 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-full h-12 flex items-center">
              <BreadcrumbSection items={breadcrumbItems} />
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col items-center pt-5 md:pt-10">
          {/* Nama Departemen */}
          <h1 className="text-lg text-white md:text-2xl lg:text-3xl font-bold px-8 mb-6 md:mb-12 text-center">
            {nama_dept}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:-mt-10 lg:mt-0 items-center w-full max-w-6xl mx-auto">
            {/* Deskripsi Departemen */}
            <div className="flex w-full md:w-96 lg:w-full md:pl-10 -mt-12 px-8 items-center justify-center md:justify-end">
              <p className="text-white text-xs md:text-lg text-center max-w-md mb-10 md:mb-0">
                {deskripsi || "Deskripsi departemen belum tersedia."}
              </p>
            </div>

            {/* Logo Departemen*/}
            <div className="flex justify-center md:justify-start order-first md:order-0 md:pr-10 md:mb-25">
              <div className="relative w-25 h-25 md:w-100 md:h-100 flex">
                <Image
                  src={logo_dept || "/assets/shared/logos/logo-himasisfo.webp"}
                  alt={`Logo ${nama_dept}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute -bottom-4 md:-bottom-4 w-full z-10 translate-y-1/2">
        <Pita pitaGradient={colorMap.pita ?? ''} />
      </div>
    </div>
  );
}
