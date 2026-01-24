"use client";

import { useParams } from "next/navigation";
import {
  KabinetHeroSection,
  FilosofiSection,
  IntiHimpunanSection,
  DepartemenListSection,
} from "@/features/kabinet";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import { KabinetDataJSON } from "@/features/kabinet/types";

/**
 * Page ini menerapkan Dynamic Routing untuk menampilkan detail kabinet secara spesifik
 * berdasarkan 'kabinetId' dari URL.
 */

const data = kabinetDataRaw as unknown as KabinetDataJSON;

export default function Page() {
  const params = useParams();
  const kabinetId = params.kabinetId;

  const currentData = data.kabinet_list.find((k) => k.id === kabinetId);

  if (!currentData)
    return (
      <div className="p-20 text-center">
        <h1 className="text-xl font-bold">Kabinet Tidak Ditemukan</h1>
      </div>
    );

  return (
    <main>
      <KabinetHeroSection currentKabinet={currentData} />
      <FilosofiSection
        data={currentData.filosofi}
        logo_url={currentData.logo_url}
      />
      <IntiHimpunanSection data={currentData.inti_himpunan} />
      <DepartemenListSection />
    </main>
  );
}
