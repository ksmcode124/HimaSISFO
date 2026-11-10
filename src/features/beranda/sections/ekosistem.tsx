"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/features/shared/components/ui/button";

const ekosistemData = {
  programStudi: {
    title: "Program Studi",
    description:
      'Program Studi Sistem Informasi UPN "Veteran" Yogyakarta dirancang untuk mencetak lulusan yang mampu merancang, mengembangkan, dan mengelola solusi berbasis teknologi yang relevan dengan kebutuhan industri.',
    background: "#062048",
    bgImage: "/assets/beranda/ekosistem/backgroundSI.webp",
    logo: "/assets/shared/logos/logo-SI.webp",
  },
  code: {
    title: "The Code 124",
    description:
      "Code124 merupakan wadah eksplorasi teknologi bagi mahasiswa Sistem Informasi. Berfokus pada pengembangan website, KSM ini hadir sebagai sarana belajar kelompok, penyelenggaraan workshop, serta persiapan kompetisi di bidang teknologi informasi.",
    background: "#131313",
    bgImage: "/assets/beranda/ekosistem/backgroundSI.webp",
    logo: "/assets/shared/logos/logo-code124.webp",
  },
};

const tabBase = "relative w-[122px] md:w-[360px] h-[34px] md:h-[100px] font-semibold text-xs sm:text-base md:text-2xl text-white";
const tabAktif = "rounded-t-[12px] md:rounded-t-[30px] rounded-b-[12px] md:rounded-b-[30px]";
const tabNonaktif = "rounded-[12px] md:rounded-[30px]";

const lengkung = "absolute bottom-[1px] md:bottom-[55px] w-[8px] h-[15px] md:w-[12px] md:h-[15px] pointer-events-none z-10";
const lengkungKiri = "right-full";
const lengkungKanan = "left-full";

export default function EkosistemLainnya() {
  const [activeTab, setActiveTab] = useState<"programStudi" | "code">("programStudi");

  const data = ekosistemData[activeTab];

  return (
    <section
      className="w-full px-4 sm:px-6 md:px-10 flex flex-col items-center"
      style={{
        paddingTop: "24px",
        paddingBottom: "24px",
        gap: "16px",
      }}
    >
      <h1
        className="text-center text-3xl md:text-5xl font-bold mb-5 md:mb-8 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-blue-light-active) 0%, var(--color-blue-dark-hover) 50%, var(--color-blue-light-active) 100%)",
        }}
      >
        Ekosistem Lainnya
      </h1>

      <div
        aria-hidden
        className="pointer-events-none absolute left-[50%] top-[64%] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#C9D6FA] via-[#CDB9F8] to-[#C9D6FA] opacity-70 md:block md:h-[450px] md:w-[45%] md:blur-[90px] z-0"
      />

      <div className="relative w-[334px] h-[264px] md:w-[980px] md:h-[574px] mx-auto mt-0">
        {/* Kotak Konten Utama (z-10) */}
        <div
          className="absolute left-0 right-0 bottom-0 top-[20.12px] md:top-[43px] rounded-[30px] p-4 pt-8 md:p-14 md:pt-[64px] transition-all duration-500 flex items-center border border-white/10 overflow-hidden z-10"
          style={{ backgroundColor: data.background }}
        >
          {data.bgImage && (
            <div 
              className="hidden md:block absolute inset-0 rounded-[30px] pointer-events-none z-0 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 40%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 40%)",
              }}
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  opacity: 0.01, 
                  mixBlendMode: "overlay", 
                  backgroundImage: `url(${data.bgImage})`,
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
              <p className="title4 text-[10px] sm:text-[11px] md:text-xl font-normal leading-[1.4] md:leading-[1.5] text-justify">
                {data.description}
              </p>

              <Button className="bg-[#E3F2FD55] hover:bg-[#E3F2FD33] w-[130px] h-[43px] rounded-[12px] text-xs md:text-sm font-jakarta">
                <a href="#">Lanjut Jelajahi</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigasi Atas */}
        <div className="absolute top-0 left-0 right-0 flex justify-center gap-[22px] md:gap-[117px] z-20 pointer-events-none">
          {/* Tab Program Studi */}
          <button
            type="button"
            onClick={() => setActiveTab("programStudi")}
            className={`${tabBase} ${
              activeTab === "programStudi" ? tabAktif : tabNonaktif
            } pointer-events-auto ${activeTab === "programStudi" ? "z-30" : "z-0"}`}
            style={{
              background:
                activeTab === "programStudi"
                  ? `linear-gradient(to bottom, ${ekosistemData.programStudi.background} 60%, rgba(6, 32, 72, 0) 100%)`
                  : ekosistemData.programStudi.background,
            }}
          >
            <h2 className="font-title text-xs md:font-heading md:text-[40px]">
              Program Studi
            </h2>
            <span
              aria-hidden
              className={`${lengkung} ${lengkungKiri} hidden md:block`}
              style={{
                backgroundImage: `radial-gradient(circle at 0 0, transparent 12px, ${data.background} 12.5px)`,
              }}
            />
            <span
              aria-hidden
              className={`${lengkung} ${lengkungKanan} hidden md:block`}
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0, transparent 12px, ${data.background} 12.5px)`,
              }}
            />
          </button>

          {/* Tab The Code 124 */}
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`${tabBase} ${
              activeTab === "code" ? tabAktif : tabNonaktif
            } pointer-events-auto ${activeTab === "code" ? "z-30" : "z-0"}`}
            style={{
              background:
                activeTab === "code"
                  ? `linear-gradient(to bottom, ${ekosistemData.code.background} 60%, rgba(19, 19, 19, 0) 100%)`
                  : ekosistemData.code.background,
            }}
          >
            <h2 className="font-title text-xs md:font-heading md:text-[40px]">The Code 124</h2>
            <span
              aria-hidden
              className={`${lengkung} ${lengkungKiri} hidden md:block`}
              style={{
                backgroundImage: `radial-gradient(circle at 0 0, transparent 12px, ${data.background} 12.5px)`,
              }}
            />
            <span
              aria-hidden
              className={`${lengkung} ${lengkungKanan} hidden md:block`}
              style={{
                backgroundImage: `radial-gradient(circle at 100% 0, transparent 12px, ${data.background} 12.5px)`,
              }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}