import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import { AdminEventRow, AdminEventDetail, EventResponseAdmin, Event } from '../types';

// Mapping list response ke row
export const mapToEventDetail = (res: EventResponseAdmin): AdminEventDetail => ({
  id: res.id_event,
  judul: res.judul,
  deskripsi: res.deskripsi,
  tanggal_mulai: res.tanggal_mulai,
  tanggal_berakhir: res.tanggal_berakhir,
  gambar_event: res.gambar_event
});

// Mapping single response ke detail
export const mapToEventRow = (res: EventResponseAdmin): AdminEventRow => ({
  id: res.id_event,
  title: res.judul,
  description: res.deskripsi,
  start: res.tanggal_mulai,
  end: res.tanggal_berakhir
});


export function useEvent() {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery<AdminEventRow[], string>({
    queryKey: ['kabinet'],
    queryFn: async () => {
      const response = await api.get<EventResponseAdmin[]>('/api/admin/event');
      return response.data.map(mapToEventRow);
    },
    refetchOnWindowFocus: true, // selalu refresh data kalau window fokus
  });

  // Mutation untuk save
  const saveMutation = useMutation({
    mutationFn: async (payload: Event) => {
      // TODO: await api.saveKabinet(payload)
      console.log('SAVE KABINET', payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kabinet'] })
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      // TODO: await api.deleteKabinet(id)
      console.log('DELETE KABINET', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kabinet'] })
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


export function useEventDetail(id: number | null) {
  const { data: detail = null, isLoading } = useQuery<AdminEventDetail | null, unknown>({
    queryKey: ['kabinet', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get<EventResponseAdmin>(`/api/admin/event/${id}`);
      return mapToEventDetail(response.data);
    },
    enabled: !!id, // hanya fetch kalau id ada
  });

  return { detail, isLoadingModal: isLoading };
}
