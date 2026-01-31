import { redirect } from "next/navigation";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";
import { KabinetDataJSON } from "@/features/kabinet/types";

const data = kabinetDataRaw as unknown as KabinetDataJSON;

export default function KabinetPage() {
  /**
   * Page ini secara otomatis mengarahkan user ke kabinet dengan kepengurusan terbaru.
   * ASUMSI: Kabinet terbaru selalu berada pada indeks pertama ([0]) di kabinet_list.
   */

  const terbaru = data.kabinet_list[0];

  if (terbaru) {
    redirect(`/kabinet/${terbaru.id}`);
  }

  return (
    <div className="p-20 text-center">
      <h1 className="text-xl font-bold">Kabinet Tidak Ditemukan</h1>
    </div>
  );
}
