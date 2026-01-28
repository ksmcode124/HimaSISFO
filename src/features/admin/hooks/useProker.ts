import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { AdminProkerDetail, AdminProkerRow, KabinetResponseAdmin } from '../types';
import { updateAnggotaDetailSchema } from '@/schemas/anggota_detail.schema';
import z from 'zod';
import { createAnggotaSchema } from '@/schemas/anggota.schema';
import { createProkerSchema, updateProkerSchema } from '@/schemas/proker.schema';

export function mapToProkerRows(
  response: KabinetResponseAdmin
): AdminProkerRow[] {
  const rows: AdminProkerRow[] = [];
  if (!response.proker) return rows; // guard biar ngga error

  response.proker.forEach((proker) => {
    rows.push({
      id_proker: proker.id_proker,
      nama_proker: proker.nama_proker,
      deskripsi: proker.deskripsi,
      foto_proker: proker.foto_proker ?? ''
    })
  });

  return rows;

}

export function mapToProkerDetail(
  response: KabinetResponseAdmin,
  id_proker: number
): AdminProkerDetail {
  const proker = response.proker.find((a) => a.id_proker === id_proker)
  if (!proker) {
    throw new Error(`Proker with id ${id_proker} not found`);
  }

  return {
    id_proker: proker.id_proker,
    id_departmeen: proker.id_departemen,
    id_kabinet: proker.id_kabinet,
    nama_proker: proker.nama_proker,
    deskripsi: proker.deskripsi,
    foto_proker: proker.foto_proker ?? ''
  }
}

export function useProker(id_kabinet: number) {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery<AdminProkerRow[], string>({
    queryKey: ['departemen', id_kabinet],
    queryFn: async () => {
      if (!id_kabinet) return []
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`)
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)
      if (data == null) return []
      return mapToProkerRows(data)
    },
    enabled: id_kabinet !== null,
  });

  // Mutation untuk save
  const createMutation = useMutation({
    mutationFn: async (payload: z.infer<typeof createProkerSchema>) => {
      const response = await api.post('/api/admin/proker', payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proker', id_kabinet] }),
  });

  // Mutation UPDATE
  const updateMutation = useMutation({
    mutationFn: async (payload: { id: number; data: z.infer<typeof updateProkerSchema> }) => {
      const { id, data } = payload;
      const response = await api.put(`/api/admin/proker/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proker', id_kabinet] })
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/admin/proker/${id}`)
      return response
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proker', id_kabinet] })
  });

  return {
    data,
    isLoading,
    error: error || null,
    reload: refetch,
    createProker: createMutation.mutateAsync,
    updateProker: updateMutation.mutateAsync,
    deleteProker: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}

export function useProkerDetail(id_departemen: number | null, id_kabinet: number) {
  const { data: detail = null, isLoading } = useQuery<AdminProkerDetail | null, unknown>({
    queryKey: ['proker', id_departemen],
    queryFn: async () => {
      if (!id_departemen) return null;
      const response = await api.get<KabinetResponseAdmin[]>(`/api/admin/kabinet/`);
      const data = response.data.find((d) => d.id_kabinet == id_kabinet)
      if (data == null) return null
      return mapToProkerDetail(data, id_departemen);
    },
    enabled: !!id_departemen, // hanya fetch kalau id ada
  });

  return { detail, isLoadingModal: isLoading };
}
