import { useQuery } from '@tanstack/react-query';
import { getDepartemenDetail } from '../services/departemen';
import { DepartemenResponse } from '@/lib/types/interface';

export const mapToDepartemenDetail = (data: DepartemenResponse) => {
  return {
    info: data.departemen,
    proker: data.proker || [],
    anggota: data.anggota || [],
  };
};

export function useDepartemenDetail(deptId: string) {
  const query = useQuery<DepartemenResponse>({
    queryKey: ["departemen-detail", deptId],
    queryFn: () => getDepartemenDetail(deptId),
    enabled: !!deptId,
  });

  // Transformasi data hanya jika fetch berhasil
  const detailData = query.data ? mapToDepartemenDetail(query.data) : null;

  return {
    ...query,
    detailData,
    isEmpty: !query.isLoading && !query.data,
  };
}