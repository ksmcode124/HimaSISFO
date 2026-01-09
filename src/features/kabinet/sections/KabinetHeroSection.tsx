"use client";

import kabinetDataRaw from "../data/kabinet.json";
import KabinetYearButton from "../components/YearButton";
import { Pita, Ornament2 } from "../components/KabinetOrnaments";
import { HeroMobilePreview } from "../components/PhotoSlideshowMobile";
import { KabinetDataJSON } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const data = kabinetDataRaw as unknown as KabinetDataJSON;

export default function KabinetHeroSection() {
  const router = useRouter();

  const currentKabinet = data.kabinet_list[0];

  if (!currentKabinet) return null;

  const getRelativeYear = (currentYear: string, offset: number) => {
    const years = currentYear.split("/");
    const startYear = parseInt(years[0]) + offset;
    const endYear = parseInt(years[1]) + offset;
    return `${startYear}/${endYear}`;
  };

  const prevKabinet = data.kabinet_list.find(
    (k) =>
      k.tahun_akademik === getRelativeYear(currentKabinet.tahun_akademik, -1)
  );
  const nextKabinet = data.kabinet_list.find(
    (k) =>
      k.tahun_akademik === getRelativeYear(currentKabinet.tahun_akademik, 1)
  );

  return (
    <div
      className="relative w-full"
      style={
        {
          ["--primary-color" as string]: currentKabinet.colors.primary,
          ["--secondary-color" as string]: currentKabinet.colors.secondary,
          ["--bg-kabinet" as string]: currentKabinet.colors.background,
        } as React.CSSProperties
      }
    >
      <section className="relative w-full h-[700px] flex flex-col items-center justify-center bg-pink-100 text-white overflow-hidden">
        {/* Background Desktop */}
        <div className="absolute md:inset-0">
          <Image
            src={currentKabinet.image_url[0]}
            alt="Foto Kabinet"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Background Mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/assets/kabinet/bg-hero-mobile.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute top-15 md:top-20 md:left-0 z-10  md:w-full flex justify-between items-center px-60">
          <KabinetYearButton
            label={getRelativeYear(currentKabinet.tahun_akademik, -1)}
            onClick={() => {
              if (prevKabinet) {
                router.push(`/kabinet/${prevKabinet.id}`);
              } else {
                router.push("/kabinet/aksayapatra");
              }
            }}
          />
          {/* Logo Kabinet */}
          <div className=" relative w-15 h-15 mt-15 md:mt-0 md:w-40 md:h-40 flex items-center justify-center ">
            <Image
              src={currentKabinet.logo_url}
              alt="Logo Kabinet"
              fill
              className="object-contain md:mt-10 bg-gray-200 rounded-full border-4 border-pink-500"
            />
          </div>
          <KabinetYearButton
            label={getRelativeYear(currentKabinet.tahun_akademik, 1)}
            onClick={() => {
              if (nextKabinet) {
                router.push(`/kabinet/${nextKabinet.id}`);
              } else {
                router.push("/kabinet/coming-soon");
              }
            }}
          />
        </div>

        <div className="absolute inset-0 flex justify-center items-center mb-[360px] md:mb-50">
          <div className="grid grid-cols-2 w-full max-w-[1200px] drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)]">
            <div className="flex justify-start -scale-x-100">
              <Ornament2 />
            </div>
            <div className="flex justify-start">
              <Ornament2 />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mt-35 md:mt-80">
          <div className="drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] md:mb-0 md:mt-4">
            <div className="text-2xl md:text-7xl font-bold leading-15 md:leading-relaxed">
              <h1>SELAMAT DATANG DI</h1>
              <h2>HIMASISFO {currentKabinet.tahun_akademik}</h2>
            </div>
            <h3
              className="text-2xl mt-4 md:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
              }}
            >
              Kabinet {currentKabinet.nama_kabinet}
            </h3>
          </div>
        </div>
        <HeroMobilePreview />
      </section>

      <div className="absolute -bottom-4 md:-bottom-10 w-full z-10 translate-y-1/2">
        <Pita />
      </div>
    </div>
  );
}
