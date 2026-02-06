"use client";

import { useParams } from "next/navigation";
import { useKabinetDisplay } from "@/features/kabinet/hooks/useKabinet";
import { Spinner } from "@/components/ui/spinner";
import {
  KabinetHeroSection,
  FilosofiSection,
  IntiHimpunanSection,
  DepartemenListSection,
} from "@/features/kabinet";
import { ShellLayer } from "@/components/layout/ShellLayer";
import { ThemeProvider } from "@/features/kabinet/components/ThemeProvider";
import { translateToSlug } from "@/lib/utils/translate-slug";
import { KabinetColorType } from "@/features/kabinet/styles/KabinetColorConfig";

export default function Page() {
  const params = useParams();
  const kabinetId = params.kabinetId as string;

  const { displayData, isLoading, isError } = useKabinetDisplay(kabinetId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (isError || !displayData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <h1 className="text-md md:text-xl font-bold text-gray-800">
          Data Kabinet Tidak Ditemukan
        </h1>
      </div>
    );
  }

  const { currentKabinet, kabinetList, departemenList, raw } = displayData;
  const kabinet = translateToSlug(currentKabinet.nama_kabinet) as KabinetColorType
  return ( 
    <ThemeProvider kabinet={kabinet}>
      <ShellLayer>
        <KabinetHeroSection
          currentKabinet={currentKabinet}
          kabinetList={kabinetList}
          colorMap={{
            pita: "var(--kabinet-gradient-pita)",
            ornament2: "var(--kabinet-gradient-ornament-2)"
          }}
        />
        <FilosofiSection 
          data={currentKabinet} 
          kabinet={kabinet}
          ColorMap={{
            pita: "var(--kabinet-gradient-pita)",
            filosofiBackground: "var(--kabinet-gradient-filosofi-background)",
            tentangText: "var(--kabinet-gradient-tentang-text)",
            tentangBorder: "var(--kabinet-gradient-tentang-border)",
            visiMisi: "var(--kabinet-gradient-visi-misi)",
            visiMisiBorder: "var(--kabinet-color-visi-misi-border)",
          }}
        />
        <IntiHimpunanSection 
          data={raw.kabinet.departemenInti} 
          colorMap={{
            ornament1: "var(--kabinet-gradient-ornament-1",
            ornament4: "var(--kabinet-gradient-ornament-4)",
            gradientIntiBackground: "var(--kabinet-gradient-inti-background)",
            borderBottom: "var(--kabinet-gradient-tentang-border)"
          }} />
        <DepartemenListSection 
          data={departemenList} 
          colorMap={{
            ornament5: "var(--kabinet-gradient-ornament-5)",
            ornament9: "var(--kabinet-gradient-ornament-9)",
            ornament1: "var(--kabinet-gradient-ornament-1)",
            buttonGradient: "var(--kabinet-gradient-button-dept-card)"
          }} />
      </ShellLayer>
    </ThemeProvider>
  );
}
