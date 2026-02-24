"use client";

import { useParams } from "next/navigation";
import { useDepartemenDetail } from "@/features/kabinet/hooks/useDepartemen";
import { Spinner } from "@/components/ui/spinner";
import {
  DepartemenHeroSection,
  StaffSection,
  ProkerSection,
} from "@/features/kabinet";
import { ShellLayer } from "@/components/layout/ShellLayer";
import { ThemeProvider } from "@/features/kabinet/components/ThemeProvider";
import { KABINET_ID_MAP } from "@/features/kabinet/styles/KabinetMapping";
import { KabinetColorType } from "@/features/kabinet/styles/KabinetColorConfig";

export default function DepartemenPage() {
  const params = useParams();
  const kabinetId = (params.kabinetId as string) || "1";
  const deptId = params.deptId as string;

  const { detailData, isLoading, isError } = useDepartemenDetail(deptId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (isError || !detailData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <h1 className="text-md md:text-xl font-bold text-gray-800">
          Data Departemen Tidak Ditemukan
        </h1>
      </div>
    );
  }

  const { info, proker, anggota } = detailData;

  /**
   * TODO: Hapus mapping manual ini jika API sudah menyediakan field 'nama_kabinet'
   * Saat ini masih manual via KABINET_ID_MAP karena data di info.nama_kabinet belum ada.
   */
  const kabinetDisplayName = KABINET_ID_MAP[kabinetId] || "Gelora Harmoni";

  // Transformasi nama (misal: "Gelora Harmoni") jadi slug warna ("gelora-harmoni")
  const kabinetColorKey = kabinetDisplayName.toLowerCase().replace(/\s+/g, '-') as KabinetColorType;

  return (
    <ThemeProvider kabinet={kabinetColorKey}>
      <ShellLayer  backgroundColor={"var(--kabinet-background)"}>
        <DepartemenHeroSection
          nama_dept={info.nama_departemen}
          deskripsi={info.deskripsi_departemen}
          logo_dept={info.logo_departemen}
          bg_image={info.foto_departemen}
          kabinet_id={kabinetId}
          kabinet_nama={kabinetDisplayName}
          colorMap={{
            pita: "var(--kabinet-gradient-pita)",
            hoverText: "var(--kabinet-color-text)",
            breadcrumbText: "var(--kabinet-breadcrumb-text)",
            breadcrumbUnderline: "var(--kabinet-breadcrumb-underline)"
          }}
        />
        <ProkerSection 
          data={proker} 
          colorMap={{
            pita: "var(--kabinet-gradient-pita)",
            text: "var(--kabinet-color-text)",
            bgOrnament: "var(--kabinet-color-ornament)",
            ornament2: "var(--kabinet-gradient-ornament-2)",
            ornament3: "var(--kabinet-gradient-ornament-3)"
          }} />
        <StaffSection 
          data={anggota} 
          colorMap={{
            text: "var(--kabinet-color-text)",
            ornament1: "var(--kabinet-gradient-ornament-1)",
            ornament4: "var(--kabinet-gradient-ornament-4)",
            ornament5: "var(--kabinet-gradient-ornament-5)",
            ornament9: "var(--kabinet-gradient-ornament-9)"
          }}
        />
      </ShellLayer>
    </ThemeProvider>
  );
}
