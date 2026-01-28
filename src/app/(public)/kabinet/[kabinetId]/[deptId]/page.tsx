"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import deptDataRaw from "@/features/kabinet/data/departemen.json";
import { DepartemenResponse, Kabinet } from "@/features/kabinet/types";
import {
  DepartemenHeroSection,
  StaffSection,
  ProkerSection,
} from "@/features/kabinet";

interface KabinetDataSchema {
  kabinet: Kabinet[];
}

interface DeptDetailRecord extends DepartemenResponse {
  id_departemen: number;
  kabinet_id: number;
}

export default function DepartemenPage() {
  const params = useParams();
  const kabinetIdFromUrl = Number(params.kabinetId);
  const deptIdFromUrl = Number(params.deptId);

  const { currentKabinet, selectedDeptDetail } = useMemo(() => {
    const kabinetData = kabinetDataRaw as unknown as KabinetDataSchema;
    const kabinetArray = kabinetData.kabinet;

    const deptArray = deptDataRaw as unknown as DeptDetailRecord[];

    return {
      currentKabinet: kabinetArray.find((k) => k.id === kabinetIdFromUrl),
      selectedDeptDetail: deptArray.find(
        (d) =>
          d.id_departemen === deptIdFromUrl &&
          d.kabinet_id === kabinetIdFromUrl,
      ),
    };
  }, [kabinetIdFromUrl, deptIdFromUrl]);

  if (!currentKabinet || !selectedDeptDetail) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1>Departemen Tidak Ditemukan.</h1>
      </div>
    );
  }

  return (
    <main className="bg-white antialiased">
      <DepartemenHeroSection
        nama_dept={selectedDeptDetail.departemen.nama_departemen}
        deskripsi={selectedDeptDetail.departemen.deskripsi_departemen}
        logo_dept={selectedDeptDetail.departemen.logo_departemen}
        bg_image={selectedDeptDetail.departemen.foto_departemen}
        kabinet_id={currentKabinet.id}
        kabinet_nama={currentKabinet.nama_kabinet}
      />
      <ProkerSection data={selectedDeptDetail.proker} />
      <StaffSection data={selectedDeptDetail.anggota} />
    </main>
  );
}
