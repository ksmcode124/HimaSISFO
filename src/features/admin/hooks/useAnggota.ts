import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { AdminAnggotaDetail, AdminAnggotaRow, KabinetResponseAdmin } from '../types';
import { createAnggotaDetailSchema, updateAnggotaDetailSchema } from '@/schemas/anggota_detail.schema';
import z from 'zod';
import { createAnggotaSchema } from '@/schemas/anggota.schema';

export function mapToDepartemenRows(
  response: KabinetResponseAdmin,
  id_departemen?: number
): AdminAnggotaRow[] {
  const rows: AdminAnggotaRow[] = [];
  if (!response.detailAnggota) return rows; // guard biar ngga error

  response.detailAnggota.forEach((anggota) => {
    // Filter berdasarkan departemen jika id_departemen diberikan
    if (id_departemen && anggota.id_departemen !== id_departemen) {
      return;
    }
    
    rows.push({
      id_anggota: anggota.id_anggota,
      nama_anggota: anggota.anggota.nama_anggota,
      jabatan: anggota.jabatan.nama_jabatan,
      kabinet: response.nama_kabinet
    })
  });

  return rows;

}

export function mapToAnggotaDetail(
  response: KabinetResponseAdmin,
  id_anggota: number
): AdminAnggotaDetail {
  const anggota = response.detailAnggota.find((a) => a.id_anggota === id_anggota)
  if (!anggota) {
    throw new Error(`Anggota with id ${id_anggota} not found`);
  }

  return {
    id_anggota: anggota.id_anggota,
    foto_anggota: anggota.foto_anggota ?? '',
    nama_anggota: anggota.anggota.nama_anggota,
    jabatan: anggota.jabatan.nama_jabatan,
    kabinet: response.nama_kabinet
  }
}

export function useAnggota(id_kabinet: number, id_departemen?: number) {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery<AdminAnggotaRow[], string>({
    queryKey: ['departemen', id_kabinet, id_departemen],
    queryFn: async () => {
      if (!id_kabinet) return []
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`)
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)
      if (data == null) return []
      return mapToDepartemenRows(data, id_departemen)
    },
    enabled: id_kabinet !== null,
  });

  // Mutation untuk save
  const createMutation = useMutation({
    mutationFn: async (payload: z.infer<typeof createAnggotaSchema>) => {
      const response = await api.post('/api/admin/anggota', payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anggota', id_kabinet, id_departemen] }),
  });

  // Mutation UPDATE
  const updateMutation = useMutation({
    mutationFn: async (payload: { id: number; data: z.infer<typeof updateAnggotaDetailSchema> }) => {
      const { id, data } = payload;
      const response = await api.put(`/api/admin/anggota/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anggota', id_kabinet] })
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/admin/anggota/${id}`)
      return response
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['departemen', id_kabinet, id_departemen] })
  });

  return {
    data,
    isLoading,
    error: error || null,
    reload: refetch,
    createAnggota: createMutation.mutateAsync,
    updateAnggota: updateMutation.mutateAsync,
    deleteAnggota: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}


export function useAnggotaDetail(id_anggota: number | null, id_kabinet: number) {
  const { data: detail = null, isLoading } = useQuery<AdminAnggotaDetail | null, unknown>({
    queryKey: ['anggota', id_anggota],
    queryFn: async () => {
      if (!id_anggota) return null;
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`);
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)
      if (data == null) return null
      return mapToAnggotaDetail(data, id_anggota);
    },
    enabled: !!id_anggota, // hanya fetch kalau id ada
  });

  return { detail, isLoadingModal: isLoading };
}
