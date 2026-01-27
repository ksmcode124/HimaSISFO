import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/features/admin/services/api';
import { AdminAnggotaDetail, AdminAnggotaRow, Anggota, KabinetResponseAdmin } from '../types';

export function mapToDepartemenRows(
  response: KabinetResponseAdmin
): AdminAnggotaRow[] {
  const rows: AdminAnggotaRow[] = [];
  if (!response.detailAnggota) return rows; // guard biar ngga error

  response.detailAnggota.forEach((anggota) => {
    rows.push({
      id: anggota.id_anggota,
      nama_anggota: anggota.anggota.nama_anggota,
      jabatan: anggota.jabatan.nama_jabatan,
      kabinet: response.nama_kabinet
    })
  });

  return rows;

}

export function mapToDepartemenDetail(
  response: KabinetResponseAdmin,
  id_anggota: number
): AdminAnggotaDetail {
  const anggota = response.detailAnggota.find((a) => a.id_anggota === id_anggota)
  if (!anggota) {
    throw new Error(`Anggota with id ${id_anggota} not found`);
  }

  return {
    id: anggota.id_anggota,
    foto_anggota: anggota.foto_anggota ?? '',
    nama_anggota: anggota.anggota.nama_anggota,
    jabatan: anggota.jabatan.nama_jabatan,
    kabinet: response.nama_kabinet
  }
}

export function useAnggota(id_kabinet: number) {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery<AdminAnggotaRow[], string>({
    queryKey: ['departemen', id_kabinet],
    queryFn: async () => {
      if (!id_kabinet) return []
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`)
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)
      console.log(data?.detailAnggota)
      if (data == null) return []
      return mapToDepartemenRows(data)
    },
    enabled: id_kabinet !== null,
  });

  // Mutation untuk save
  const saveMutation = useMutation({
    mutationFn: async (payload: Anggota) => {
      // TODO: await api.saveKabinet(payload)
      console.log('SAVE DEPARTEMEN', payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['departemen', id_kabinet] })
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      // TODO: await api.deleteKabinet(id)
      console.log('DELETE DEPARTEMEN', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['departemen', id_kabinet] })
  });

  return {
    data,
    isLoading,
    error: error || null,
    reload: refetch,
    saveData: saveMutation.mutateAsync,
    deleteData: deleteMutation.mutateAsync,
    saving: saveMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}


export function useAnggotaDetail(id_departemen: number | null, id_kabinet: number) {
  const { data: detail = null, isLoading } = useQuery<AdminAnggotaDetail | null, unknown>({
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
