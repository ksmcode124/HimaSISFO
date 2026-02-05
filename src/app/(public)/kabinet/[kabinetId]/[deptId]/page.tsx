"use client";

import { useParams } from "next/navigation";
import { useDepartemenDetail } from "@/features/kabinet/hooks/useDepartemen";
import { Spinner } from "@/components/ui/spinner";
import {
  DepartemenHeroSection,
  StaffSection,
  ProkerSection,
} from "@/features/kabinet";

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

  return (
    <>
      <DepartemenHeroSection
        nama_dept={info.nama_departemen}
        deskripsi={info.deskripsi_departemen}
        logo_dept={info.logo_departemen}
        bg_image={info.foto_departemen}
        kabinet_id={kabinetId}
        kabinet_nama="Tentang"
      />
      <ProkerSection data={proker} />
      <StaffSection data={anggota} />
    </>
  );
}
