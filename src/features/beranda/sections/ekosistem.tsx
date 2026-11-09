"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/features/shared/components/ui/button";
import LogoSI from "../../../../public/assets/shared/logos/logo-SI.webp";
import LogoCode from "../../../../public/assets/shared/logos/logo-code124.webp";
import backgroundSI from "@/../public/assets/beranda/ekosistem/backgroundSI.webp";

const ekosistemData = {
  programStudi: {
    title: "Program Studi",
    description:
      'Program Studi Sistem Informasi UPN "Veteran" Yogyakarta dirancang untuk mencetak lulusan yang mampu merancang, mengembangkan, dan mengelola solusi berbasis teknologi yang relevan dengan kebutuhan industri.',
    background: "#062048",
    bgImage: backgroundSI.src,
    logo: LogoSI,
  },
  code: {
    title: "The Code 124",
    description:
      "Code124 merupakan wadah eksplorasi teknologi bagi mahasiswa Sistem Informasi. Berfokus pada pengembangan website, KSM ini hadir sebagai sarana belajar kelompok, penyelenggaraan workshop, serta persiapan kompetisi di bidang teknologi informasi.",
    background: "#131313",
    bgImage: null,
    logo: LogoCode,
  },
};


const tabBase =
  "relative w-[108px] md:w-[360px] h-[42px] md:h-[100px] font-semibold text-xs sm:text-base md:text-2xl text-white";


const tabAktif = "rounded-t-[14px] md:rounded-t-[30px]";
const tabNonaktif = "rounded-[14px] md:rounded-[30px]";


const lengkung =
  "absolute bottom-[16px] md:bottom-[40px] w-[10px] h-[10px] md:w-[24px] md:h-[24px] pointer-events-none";
const lengkungKiri =
  "right-full bg-[radial-gradient(circle_at_0_0,transparent_10px,var(--c)_10.5px)] md:bg-[radial-gradient(circle_at_0_0,transparent_24px,var(--c)_24.5px)]";
const lengkungKanan =
  "left-full bg-[radial-gradient(circle_at_100%_0,transparent_10px,var(--c)_10.5px)] md:bg-[radial-gradient(circle_at_100%_0,transparent_24px,var(--c)_24.5px)]";

export default function EkosistemLainnya() {
  const [activeTab, setActiveTab] = useState<"programStudi" | "code">(
    "programStudi"
  );

  const data = ekosistemData[activeTab];

  return (
    <section className="w-full pt-8 md:pt-12 px-4 sm:px-6 md:px-10 flex flex-col items-center">
      <h1
        className="text-center text-3xl md:text-5xl font-bold mb-5 md:mb-8 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-blue-light-active) 0%, var(--color-blue-dark-hover) 50%, var(--color-blue-light-active) 100%)",
        }}
      >
        Ekosistem Lainnya
      </h1>


      <div className="relative w-[334px] h-[264px] md:w-[980px] md:h-[574px] mx-auto mt-0">
        <div
          className="absolute left-0 right-0 bottom-0 top-[26px] md:top-[60px] rounded-[30px] p-4 pt-8 md:p-14 md:pt-[64px] transition-all duration-500 flex items-center border border-white/10 shadow-xl overflow-visible"
          style={{ backgroundColor: data.background }}
        >

          {data.bgImage && (
            <div className="absolute inset-0 rounded-[30px] overflow-hidden pointer-events-none z-0">
              <div
                className="absolute top-0 left-0 w-full h-full md:top-[19px] md:left-[49px] md:w-[980px] md:h-[654px] bg-cover bg-center opacity-[0.09] blur-[30px] scale-105"
                style={{
                  backgroundImage: `url(${data.bgImage})`,
                  mixBlendMode: "overlay",
                }}
              />


              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                }}
              />
            </div>
          )}


          <div
            key={activeTab}
            className="flex flex-row items-center gap-3 md:gap-12 transition-opacity duration-300 z-10 w-full"
          >
            <div className="flex-shrink-0 w-[76px] h-[86px] md:w-[230px] md:h-[230px] relative flex items-center justify-center">
              <Image src={data.logo} alt={data.title} width={230} height={260} className="w-full h-full object-contain" priority />
            </div>

            <div className="flex flex-col items-start gap-3 md:gap-6 text-white w-full">
              <p className="body2 md:title4 font-[Poppins] text-[10px] sm:text-[11px] md:text-base font-normal leading-[1.4] md:leading-[1.5] text-justify">
                {data.description}
              </p>

              <Button className="bg-[#E3F2FD55] hover:bg-[#E3F2FD33] h-8 md:h-10 text-xs md:text-sm">
                <a href="#">Lanjut Jelajahi</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 flex justify-center gap-[44px] md:gap-[72px] z-20">
          <button
            type="button"
            onClick={() => setActiveTab("programStudi")}
            className={`${tabBase} bg-[#062048] ${
              activeTab === "programStudi" ? tabAktif : tabNonaktif
            }`}
            style={{ "--c": "#062048" } as React.CSSProperties}
          >
            Program Studi
            {activeTab === "programStudi" && (
              <>
                <span aria-hidden className={`${lengkung} ${lengkungKiri}`} />
                <span aria-hidden className={`${lengkung} ${lengkungKanan}`} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`${tabBase} bg-[#131313] ${
              activeTab === "code" ? tabAktif : tabNonaktif
            }`}
            style={{ "--c": "#131313" } as React.CSSProperties}
          >
            The Code 124
            {activeTab === "code" && (
              <>
                <span aria-hidden className={`${lengkung} ${lengkungKiri}`} />
                <span aria-hidden className={`${lengkung} ${lengkungKanan}`} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}