import Image from "next/image";
import { Pita } from "../components/KabinetOrnaments";

interface Props {
  nama: string;
  deskripsi: string;
  logo: string;
  image_url: string;
}

export default function DepartemenHeroSection({
  nama,
  deskripsi,
  logo,
  image_url,
}: Props) {
  return (
    <div className="relative w-full">
      <section className="relative flex flex-col w-full h-[450px] md:h-[933px] items-center">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={image_url}
            alt={`Departemen ${nama}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* space buat breadcrumb */}
        <div className="w-full pt-20 md:pt-35 px-6 md:px-20 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-full h-12 border-2 flex items-center px-4">
              <span>space buat breadcrumb</span>
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col items-center pt-5 md:pt-10">
          {/* Nama Departemen */}
          <h1 className="text-lg text-white md:text-2xl lg:text-3xl font-bold mb-6 md:mb-12">
            {nama}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:mt-10 lg:mt-0 items-center w-full max-w-6xl mx-auto">
            {/* Deskripsi Departemen */}
            <div className="flex w-80 md:w-96 lg:w-full md:pl-10 -mt-12 md:mt-0 items-center justify-center md:justify-end">
              <p className="text-white text-xs md:text-lg text-center max-w-md">
                {deskripsi}
              </p>
            </div>

            {/* Logo Departemen*/}
            <div className="flex justify-center md:justify-start order-first md:order-0 md:pr-10">
              <div className="relative w-25 h-25 md:w-100 md:h-100 bg-white flex">
                <Image
                  src={logo}
                  alt={`Logo Departemen ${nama}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute -bottom-4 md:-bottom-4 w-full z-10 translate-y-1/2">
        <Pita />
      </div>
    </div>
  );
}