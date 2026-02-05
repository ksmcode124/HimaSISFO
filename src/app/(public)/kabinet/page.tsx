/**
 * Page ini secara otomatis mengarahkan user ke kabinet dengan tahun kepengurusan terbaru.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import { KabinetResponse } from "@/features/kabinet/types";

const data = kabinetDataRaw as unknown as KabinetResponse;

export default function KabinetPage() {
  const router = useRouter();

  useEffect(() => {
    const list = data.kabinetList || [];
    const terbaru = [...list].sort((a, b) => {
      const tahunA = parseInt(a.tahun_kerja.split("/")[0]);
      const tahunB = parseInt(b.tahun_kerja.split("/")[0]);
      return tahunB - tahunA;
    })[0];

    if (terbaru) {
      router.replace(`/kabinet/${terbaru.id_kabinet}`);
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-12" />
    </div>
  );
}
