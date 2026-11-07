"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fotoKabinet = [
  {
    id: 1,
    src: "/assets/kabinet/advaya_cita/kabinet1.webp",
    alt: "Kabinet Advaya Cita",
  },
  {
    id: 2,
    src: "/assets/kabinet/advaya_cita/test1.webp",
    alt: "Kabinet Advaya Cita",
  },
];

const fotoLogo = [
  {
    id: 1,
    src: "/assets/kabinet/advaya_cita/logo.webp",
    alt: "Logo Kabinet Advaya Cita",
  },
];

export default function KabinetPage() {
  const [indexFoto, setIndexFoto] = useState(0);

  const fotoSaatIni = fotoKabinet[indexFoto] || fotoKabinet[0];

  const handleNextFoto = () =>
    setIndexFoto((prev) => (prev + 1) % fotoKabinet.length);
  const handlePrevFoto = () =>
    setIndexFoto((prev) => (prev - 1 + fotoKabinet.length) % fotoKabinet.length);

  const [indexLogo] = useState(0);
  const logoKabinet = fotoLogo[indexLogo] || fotoLogo[0];

  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#F2F2F2] text-center
                        min-h-[326px] gap-2 pt-4 md:h-[522px] md:gap-6 md:gap-6 lg:min-h-[718px] lg:gap-8">
      <div className="w-full min-h-[35px] md:[50px] lg:h-[60px]">
        <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold text-gradient-blue">
        Kabinet Kami
        </h1>
      </div>

      <div className="relative flex w-[342px] items-center justify-center md:w-[500px] lg:w-[1031px]">
        
        <Card className="h-[199px] w-full gap-0 overflow-hidden rounded-[20px] border-none bg-transparent py-0 shadow-none md:h-[300px] md:rounded-[40px] lg:h-[549px] lg:rounded-[50px]">
          <CardContent className="relative h-full w-full p-0">
             {fotoKabinet.map((foto, i) => (
            <Image
                key={foto.id}
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 768px) 342px, (max-width: 1024px) 500px, 1031px"
                priority={i === 0}
                className={`object-cover transition-opacity duration-700 ease-in-out ${i === indexFoto ? "opacity-100" : "opacity-0"}`}
            />
            ))}
          </CardContent>
        </Card>
       <div className="absolute -bottom-6 -right-2 z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F2F2F2] md:-bottom-9 md:-right-3 md:h-[110px] md:w-[110px] lg:-bottom-[50px] lg:-right-4 lg:h-[220px] lg:w-[220px]">
        <Image
            src={logoKabinet.src}
            alt={logoKabinet.alt}
            width={141}
            height={141}
            className="h-[62%] w-[62%] mb-3 mr-2 lg:mb-6 lg:mr-4 object-contain drop-shadow-2xl"
            />
        </div>

        {/* kiri */}
       <Button
            onClick={handlePrevFoto}
            aria-label="Foto Sebelumnya"
            className="absolute -left-3 top-1/2 z-10 flex h-[25px] w-[25px] -translate-y-1/2 items-center justify-center rounded-md bg-[#D4D3D3] p-0 text-black hover:bg-[#b0b0b0] active:bg-[#b0b0b0] md:-left-5 md:h-[34px] md:w-[34px] lg:-left-6 lg:h-[41px] lg:w-[41px] lg:rounded-[12px]"
        >
            <ChevronLeft className="!size-[85%]" strokeWidth={2} />
        </Button>

        {/* kanan */}
        <Button
            onClick={handleNextFoto}
            aria-label="Foto Selanjutnya"
            className="absolute -right-3 top-1/2 z-10 flex h-[25px] w-[25px] -translate-y-1/2 items-center justify-center rounded-md bg-[#D4D3D3] p-0 text-black hover:bg-[#b0b0b0] active:bg-[#b0b0b0] md:-right-5 md:h-[34px] md:w-[34px] lg:-right-6 lg:h-[41px] lg:w-[41px] lg:rounded-[12px]"
        >
            <ChevronRight className="!size-[85%]" strokeWidth={2} />
        </Button>
      </div>

    
      <div className="flex h-[60px] w-[264px] items-center justify-center md:h-[50px] md:w-[367px] lg:h-[45px] lg:w-[657px]">
        <h2 className="title4 text-xl font-semibold md:text-3xl lg:text-4xl">
          Kabinet Advaya Cita 2026/2027
        </h2>
      </div>
    </section>
  );
}