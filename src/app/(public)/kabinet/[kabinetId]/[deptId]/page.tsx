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
import { translateToSlug } from "@/lib/utils/translate-slug";
import { KabinetColorType } from "@/features/kabinet/styles/KabinetColorConfig";

export default function DepartemenPage() {
  const params = useParams();
  const kabinetId = params.kabinetId as string;
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
  // const kabinet = translateToSlug(nama_kabinet) as KabinetColorType
  const kabinet = 'aksayapatra' // need to change or get the nama_kabinet
  return (
    <ThemeProvider kabinet={kabinet}>
      <ShellLayer>
        <DepartemenHeroSection
          nama_dept={info.nama_departemen}
          deskripsi={info.deskripsi_departemen}
          logo_dept={info.logo_departemen}
          bg_image={info.foto_departemen}
          kabinet_id={kabinetId}
          kabinet_nama="Tentang"
          colorMap={{
            pita: "var(--kabinet-gradient-pita)",
          }}
        />
        <ProkerSection 
          data={proker} 
          colorMap={{
            pita: "var(--kabinet-gradient-pita)",
            ornament2: "var(--kabinet-gradient-ornament-2)",
            ornament: "var(--kabinet-color-ornament)"
          }} />
        <StaffSection 
          data={anggota} 
          colorMap={{
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
