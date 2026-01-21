"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import {
  Kabinet,
  KabinetListItem,
  DepartemenListItem,
} from "@/features/kabinet/types";
import {
  KabinetHeroSection,
  FilosofiSection,
  IntiHimpunanSection,
  DepartemenListSection,
} from "@/features/kabinet";

interface KabinetExtended extends Kabinet {
  departemen_list: DepartemenListItem[];
}

interface KabinetDataSchema {
  kabinet: KabinetExtended[];
  kabinetList: KabinetListItem[];
}

export default function Page() {
  const params = useParams();
  const kabinetId = Number(params.kabinetId);

  const { currentKabinet, kabinetList } = useMemo(() => {
    const data = kabinetDataRaw as unknown as KabinetDataSchema;
    return {
      currentKabinet: data.kabinet.find((k) => k.id === kabinetId),
      kabinetList: data.kabinetList,
    };
  }, [kabinetId]);

  if (!currentKabinet) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1>Kabinet Tidak Ditemukan.</h1>
      </div>
    );
  }

  return (
    <main className="bg-white antialiased">
      <KabinetHeroSection
        currentKabinet={currentKabinet}
        kabinetList={kabinetList}
      />
      <FilosofiSection data={currentKabinet} />
      <IntiHimpunanSection data={currentKabinet.departemenInti} />
      <DepartemenListSection data={currentKabinet.departemen_list} />
    </main>
  );
}
