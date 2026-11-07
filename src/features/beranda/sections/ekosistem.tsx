"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from '@/features/shared/components/ui/button'
import LogoSI from "../../../../public/assets/shared/logos/logo-SI.webp";
import LogoCode from "../../../../public/assets/shared/logos/logo-code124.webp";

const ekosistemData = {
  programStudi: {
    title: "Program Studi",
    description: 'Program Studi Sistem Informasi UPN "Veteran" Yogyakarta dirancang untuk mencetak lulusan yang mampu merancang, mengembangkan, dan mengelola solusi berbasis teknologi yang relevan dengan kebutuhan industri.',
    background: "#062048",
    logo: LogoSI
  },
  code: {
    title: "The Code 124",
    description: "Code124 merupakan wadah eksplorasi teknologi bagi mahasiswa Sistem Informasi. Berfokus pada pengembangan website, KSM ini hadir sebagai sarana belajar kelompok, penyelenggaraan workshop, serta persiapan kompetisi di bidang teknologi informasi.",
    background: "#131313",
    logo: LogoCode
  },
};

export default function EkosistemLainnya() {
  const [activeTab, setActiveTab] = useState<"programStudi" | "code">("programStudi");
  const data = ekosistemData[activeTab];

  return (
    <section className="w-full min-h-[768px] py-12 px-4 sm:px-6 md:px-10 flex flex-col items-center">

      <h1 className="text-center text-3xl md:text-5xl font-bold mb-14 bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, #BADEFB 0%, #145A92 50%, #BADEFB 100%)",
        }} >
        Ekosistem Lainnya
      </h1>
 

      <div className="relative w-[334px] h-[264px] md:w-[980px] md:h-[574px] mx-auto mt-[50px] rounded-[30px] p-4 md:p-14 transition-colors duration-500 flex items-center border border-white/10 shadow-xl"
        style={{ backgroundColor: data.background }}
      >

        <div className="absolute -top-[43px] sm:-top-[55px] md:-top-[60px] left-0 right-0 w-full flex justify-center items-center gap-2 sm:gap-4 md:gap-[72px] px-4">
          <button
            type="button"
            onClick={() => setActiveTab("programStudi")}
            className={`w-1/2 max-w-[360px] h-[55px] sm:h-[72px] md:h-[100px] rounded-t-[20px] md:rounded-t-[30px] font-semibold text-sm sm:text-base md:text-2xl transition-all duration-300 ${
              activeTab === "programStudi"
                ? "bg-[#062048] text-white rounded-b-none shadow-md"
                : "bg-[#062048] text-white hover:bg-[#062048] rounded-b-[20px] md:rounded-b-[30px]"
            }`}
          >
            Program Studi
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`w-1/2 max-w-[360px] h-[55px] sm:h-[72px] md:h-[100px] rounded-t-[20px] md:rounded-t-[30px] font-semibold text-sm sm:text-base md:text-2xl transition-all duration-300 ${
              activeTab === "code"
                ? "bg-[#131313] text-white rounded-b-none shadow-md"
                : "bg-[#131313] text-white hover:bg-[#131313] rounded-b-[20px] md:rounded-b-[30px]"
            }`}
          >
            The Code 124
          </button>
        </div>

        {/* Dynamic Card Content - Menggunakan flex-row agar foto di kiri dan tulisan di kanan */}
        <div key={activeTab} className="flex flex-row items-center gap-3 md:gap-12 mt-4 md:mt-4 transition-opacity duration-300">
          <div className="flex-shrink-0 w-[76px] h-[86px] md:w-[230px] md:h-[230px] relative flex items-center justify-center">
            <Image src={data.logo} alt={data.title} width={230} height={260} className="w-full h-full object-contain" priority />
          </div>

          <div className="flex flex-col items-start gap-4 md:gap-6 text-white w-full">
            <p className="body2 md:title4 font-[Poppins] text-[11px] font-normal leading-[1.5] text-justify">
              {data.description}
            </p>

            <Button className="bg-[#E3F2FD55] hover:bg-[#E3F2FD33]"> 
                <a href="#">Lanjut Jelajahi</a> 
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}