import { useQuery } from "@tanstack/react-query";
import { getKabinetDisplay } from "@/features/kabinet/services/kabinet";
import { Kabinet, KabinetListItem, DepartemenListItem } from "../types";
import { KabinetResponse } from "@/lib/types/interface";

const mapToKabinetDisplay = (data: KabinetResponse) => {
  const currentKabinet: Kabinet = {
    ...data.kabinet,
    foto_kabinet: Array.isArray(data.kabinet.foto_kabinet)
      ? data.kabinet.foto_kabinet
      : data.kabinet.foto_kabinet
        ? [data.kabinet.foto_kabinet]
        : [],
  };

  const kabinetList: KabinetListItem[] = data.kabinetList;

  const departemenList: DepartemenListItem[] = data.departemen.map((d) => ({
    id_departemen: d.id_departemen,
    nama_departemen: d.nama_departemen,
    logo_departemen: d.logo_departemen,
  }));

  return { currentKabinet, kabinetList, departemenList, raw: data };
};

export function useKabinetDisplay(kabinetId: string) {
  const query = useQuery<KabinetResponse>({
    queryKey: ["kabinet-display", kabinetId],
    queryFn: () => getKabinetDisplay(kabinetId),
    enabled: !!kabinetId,
  });

  // Transformasi data hanya jika fetch berhasil
  const displayData = query.data ? mapToKabinetDisplay(query.data) : null;

  return {
    ...query,
    displayData,
    isEmpty: !query.isLoading && !query.data,
  };
}