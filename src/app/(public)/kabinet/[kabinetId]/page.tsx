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
      <ShellLayer backgroundColor={"var(--kabinet-background)"}>
        <KabinetHeroSection
          currentKabinet={currentKabinet}
          kabinetList={kabinetList}
          colorMap={{
            heroBackground: "var(--kabinet-gradient-hero-background)",
            titleText: "var(--kabinet-gradient-name-text)",
            layerBackground: "var(--kabinet-gradient-layer-background)",
            pita: "var(--kabinet-gradient-pita)",
            ornament2: "var(--kabinet-gradient-ornament-2)",
            ornament3: "var(--kabinet-gradient-ornament-3)",
            ornament5: "var(--kabinet-gradient-ornament-5)",
          }}
        />
        <FilosofiSection 
          data={currentKabinet} 
          kabinet={kabinet}
          colorMap={{
            background: "var(--kabinet-background)",
            text: "var(--kabinet-color-text)",
            pita: "var(--kabinet-gradient-pita)",
            filosofiBackground: "var(--kabinet-gradient-filosofi-background)",
            tentangText: "var(--kabinet-gradient-tentang-text)",
            tentangBorder: "var(--kabinet-gradient-tentang-border)",
            visiMisi: "var(--kabinet-gradient-visi-misi)",
            visiMisiBorder: "var(--kabinet-color-visi-misi-border)",
            visiMisiInnerBg: "var(--kabinet-color-background)",
            cardBorder: "var(--kabinet-color-dept-card-border)",
            chevronIcon: "var(--kabinet-color-chevron-icon)",
          }}
        />
        <IntiHimpunanSection 
          data={raw.kabinet.departemenInti} 
          colorMap={{
            text: "var(--kabinet-color-text)",
            carouselButton: "var(--kabinet-gradient-carousel-button)",
            pagination: "var(--kabinet-color-pagination)",
            ornament1: "var(--kabinet-gradient-ornament-1",
            ornament4: "var(--kabinet-gradient-ornament-4)",
            gradientIntiBackground: "var(--kabinet-gradient-inti-background)",
            borderBottom: "var(--kabinet-gradient-tentang-border)"
          }} />
        <DepartemenListSection 
          data={departemenList} 
          colorMap={{
            text: "var(--kabinet-color-text)",
            ornament1: "var(--kabinet-gradient-ornament-1)",
            ornament2: "var(--kabinet-gradient-ornament-2)",
            ornament5: "var(--kabinet-gradient-ornament-5)",
            ornament9: "var(--kabinet-gradient-ornament-9)",
            buttonGradient: "var(--kabinet-gradient-dept-card-button)",
            cardBorder: "var(--kabinet-color-dept-card-border)",
          }} />
      </ShellLayer>
    </ThemeProvider>
  );
}
