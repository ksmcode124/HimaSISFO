import { redirect } from "next/navigation";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import { KabinetResponse } from "@/features/kabinet/types";

const data = kabinetDataRaw as unknown as KabinetResponse;

export default function KabinetPage() {
  /**
   * Page ini secara otomatis mengarahkan user ke kabinet dengan tahun kepengurusan terbaru.
   */

  const list = data.kabinetList || [];

  const terbaru = [...list].sort((a, b) => {
    const tahunA = parseInt(a.tahun_kerja.split("/")[0]);
    const tahunB = parseInt(b.tahun_kerja.split("/")[0]);
    return tahunB - tahunA;
  })[0];

  if (terbaru) {
    redirect(`/kabinet/${terbaru.id_kabinet}`);
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <h1>Kabinet Tidak Ditemukan.</h1>
    </div>
  );
}
