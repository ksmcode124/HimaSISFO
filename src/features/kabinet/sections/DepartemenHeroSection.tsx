"use client";

import Image from "next/image";

interface Props {
  nama: string;
  deskripsi: string;
  logo: string;
}

export default function DepartemenHeroSection({
  nama,
  deskripsi,
  logo,
}: Props) {
  return (
    <section className="relative flex flex-col w-full h-[933px] items-center">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/assets/kabinet/hero-akpro.png"
          alt="Background Departemen Akpro"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* space buat breadcrumb */}
      <div className="w-full pt-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-12 border-2 flex items-center px-4">
            <span>
              space buat breadcrumb
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center pt-10">
        {/* Nama Departemen */}
        <h1 className="text-lg text-white md:text-2xl lg:text-3xl font-bold mb-12">
          {nama}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center w-full max-w-6xl mx-auto">
          {/* Deskripsi Departemen */}
          <div className="flex items-center justify-center md:justify-end">
            <p className="text-white md:text-lg text-center max-w-md">
              {deskripsi}
            </p>
          </div>

          {/* Logo Departemen*/}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-56 h-56 md:w-100 md:h-100 bg-white flex">
              <Image
                src={logo || "/assets/kabinet/departemen/logo-akpro.png"}
                alt="Logo Departemen"
                fill
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
