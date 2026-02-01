import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/features/admin/services/api';
import { AdminDepartemenDetail, AdminDepartemenRow, Departemen, KabinetResponseAdmin } from '../types';
import { translateToSlug } from '@/lib/utils/translate-slug';

export function mapToDepartemenRows(
  response: KabinetResponseAdmin
): AdminDepartemenRow[] {
  const rows: AdminDepartemenRow[] = [];
  if (!response.departemen) return rows; // guard biar ngga error

  response.departemen.forEach((departemen) => {
    const proker_count = response.proker
      ? response.proker.filter(p => p.id_departemen === departemen.id_departemen).length
      : 0;

    const anggota_count = response.detailAnggota
      ? response.detailAnggota.filter(p => p.id_departemen === departemen.id_departemen).length
      : 0;

    rows.push({
      id: departemen.id_departemen,
      nama_departemen: departemen.nama_departemen,
      logo: departemen.logo_departemen ?? '',
      anggota_count,
      proker_count,
      slug_kabinet: `${response.id_kabinet}-${translateToSlug(response.nama_kabinet)}`
    });
  });

  return rows;

}

export function mapToDepartemenDetail(
  response: KabinetResponseAdmin,
  id_departemen: number
): AdminDepartemenDetail {
  const departemen = response.departemen.find(d => d.id_departemen === id_departemen);
  if (!departemen) {
    throw new Error(`Departemen with id ${id_departemen} not found`);
  }

  const proker_count = response.proker.filter(p => p.id_departemen === id_departemen).length;
  const anggota_count = response.detailAnggota.filter(p => p.id_departemen === id_departemen).length;

  return {
    id: departemen.id_departemen,
    nama_departemen: departemen.nama_departemen,
    deskripsi: departemen.deskripsi_departemen ?? '',
    logo: departemen.logo_departemen ?? '',
    anggota_count,
    proker_count,
  };
}

export function useDepartemen(id_kabinet: number) {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery<AdminDepartemenRow[], string>({
    queryKey: ['departemen', id_kabinet],
    queryFn: async () => {
      if (!id_kabinet) return []
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`)
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)

      if (data == null) return []
      return mapToDepartemenRows(data)
    },
    enabled: id_kabinet !== null,
  });

  // Mutation untuk save
  const saveMutation = useMutation({
    mutationFn: async (payload: Departemen) => {
      // TODO: await api.saveKabinet(payload)
      console.log('SAVE DEPARTEMEN', payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['departemen', id_kabinet] })
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      // TODO: await api.deleteKabinet(id)
      const response = await api.delete(`/api/admin/departemen/${id}`)
      return response
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['departemen', id_kabinet] })
  });

  return {
    data,
    isLoading: isLoading || deleteMutation.isPending || saveMutation.isPending,
    error: error || null,
    reload: refetch,
    saveData: saveMutation.mutateAsync,
    deleteData: deleteMutation.mutateAsync,
    saving: saveMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}


export function useDepartemenDetail(id_departemen: number | null, id_kabinet: number) {
  const { data: detail = null, isLoading } = useQuery<AdminDepartemenDetail | null, unknown>({
    queryKey: ['departemen_detail', id_departemen],
    queryFn: async () => {
      if (!id_departemen) return null;
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`);
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)
      if (data == null) return null
      return mapToDepartemenDetail(data, id_departemen);
    },
    enabled: !!id_departemen, // hanya fetch kalau id ada
  });

  return { detail, isLoadingModal: isLoading };
}
