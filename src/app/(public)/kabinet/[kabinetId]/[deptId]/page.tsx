"use client";

import { useParams } from "next/navigation";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import { KabinetDataJSON } from "@/features/kabinet/types";
import {
  DepartemenHeroSection,
  StaffSection,
  ProkerSection,
} from "@/features/kabinet";

/**
 * Page ini melakukan pemfilteran data bertingkat (Nested Filtering) berdasarkan URL:
 * Mencari kabinet via 'kabinetId', lalu mencari departemen spesifik via 'deptId'
 */

const data = kabinetDataRaw as unknown as KabinetDataJSON;

export default function DepartemenPage() {
  const params = useParams();

  const kabinetId = params.kabinetId as string;
  const deptId = params.deptId as string;

  const currentKabinet = data.kabinet_list.find((k) => k.id === kabinetId);
  const dept = currentKabinet?.departemen.find((d) => d.id === deptId);

  if (!currentKabinet || !dept) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-xl font-bold">Departemen Tidak Ditemukan</h1>
      </div>
    );
  }

  return (
    <main>
      <DepartemenHeroSection
        nama={dept.nama}
        deskripsi={dept.deskripsi}
        logo={dept.logo_url}
        image_url={dept.image_url}
      />
      <ProkerSection />
      <StaffSection />
    </main>
  );
}
