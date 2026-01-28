import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Kabinet } from '@/lib/types/interface';
import { api } from '@/features/admin/services/api';
import { AdminKabinetDetail, AdminKabinetRow, KabinetResponseAdmin } from '../types';
import z from 'zod';
import { createKabinetSchema, updateKabinetSchema } from '@/schemas/kabinet.schema';

// Mapping list response ke row
export const mapToAdminKabinetRow = (res: KabinetResponseAdmin): AdminKabinetRow => ({
  id: res.id_kabinet,
  tahun_kerja: res.tahun_kerja ?? '-',
  nama_kabinet: res.nama_kabinet ?? '-',
  departemen_count: res.departemen.length,
  logo: res.gambar_logo ?? '',
});

// Mapping single response ke detail
export const mapToAdminKabinetDetail = (res: KabinetResponseAdmin): AdminKabinetDetail => ({
  id: res.id_kabinet,
  nama_kabinet: res.nama_kabinet,
  deskripsi: res.deskripsi ?? '',
  visi: res.visi ?? '',
  misi: res.misi ?? '',
  tahun_kerja: res.tahun_kerja,
  logo: res.gambar_logo ?? '',
  departemen_count: res.departemen.length,
});


export function useKabinet() {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery<AdminKabinetRow[], string>({
    queryKey: ['kabinet'],
    queryFn: async () => {
      const response = await api.get<KabinetResponseAdmin[]>('/api/admin/kabinet');
      return response.data.map(mapToAdminKabinetRow);
    },
    refetchOnWindowFocus: true, // selalu refresh data kalau window fokus
  });

  // Mutation untuk save
  const createMutation = useMutation({
    mutationFn: async (payload: z.infer<typeof createKabinetSchema>) => {
      const response = await api.post('/api/admin/kabinet', payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kabinet'] }),
  });

  // Mutation UPDATE
  const updateMutation = useMutation({
    mutationFn: async (payload: { id: number; data: z.infer<typeof updateKabinetSchema> }) => {
      const { id, data } = payload;
      const response = await api.put(`/api/admin/kabinet/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kabinet'] }),
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/admin/kabinet/${id}`)
      return response
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kabinet'] })
  });

  return {
    data,
    isLoading,
    error: error || null,
    reload: refetch,
    createKabinet: createMutation.mutateAsync,
    updateKabinet: updateMutation.mutateAsync,
    deleteKabinet: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}


export function useKabinetDetail(id: number | null) {
  const { data: detail = null, isLoading } = useQuery<AdminKabinetDetail | null, unknown>({
    queryKey: ['kabinet', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get<KabinetResponseAdmin>(`/api/admin/kabinet/${id}`);
      return mapToAdminKabinetDetail(response.data);
    },
    enabled: !!id, // hanya fetch kalau id ada
  });

  return { detail, isLoadingModal: isLoading };
}
