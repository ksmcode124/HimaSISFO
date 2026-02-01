/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ZodType } from 'zod';
import { api } from '@/lib/services/api';

type EntityRow = { id: number | string };
type EntityDetail = { id: number | string };

interface UseAdminEntityOptions<
  TCreate,
  TUpdate,
  TRow extends EntityRow,
  TApiRow,
> {
  entity: string; // 'kabinet', 'departemen', dll
  mapToRow: (data: TApiRow[]) => TRow[];
  createSchema?: ZodType<TCreate>;
  updateSchema?: ZodType<TUpdate>;
  queryParams?: Record<string, any>; 
}

export function useAdminEntity<
  TCreate,
  TUpdate,
  TRow extends EntityRow,
  TApiRow,
>({
  entity,
  mapToRow,
  createSchema,
  updateSchema,
  queryParams = {},
}: UseAdminEntityOptions<TCreate, TUpdate, TRow, TApiRow>) {
  const queryClient = useQueryClient();

  // LIST
  const { data = [], isLoading, error, refetch } = useQuery<TRow[], unknown>({
    queryKey: [entity, queryParams],
    queryFn: async () => {
      const response = await api.get<TApiRow[]>(`/api/admin/${entity}`);
      let items = response.data ?? [];

      // filter di FE sesuai queryParams, misal id_kabinet
      Object.entries(queryParams).forEach(([key, value]) => {
        items = items.filter((item: any) => item[key] === value);
      });

      return mapToRow(items);
    },
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: async (payload: TCreate) => {
      if (createSchema) createSchema.parse(payload);
      const response = await api.post<TApiRow>(`/api/admin/${entity}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [entity, queryParams] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: async (payload: { id: string | number; data: TUpdate }) => {
      if (updateSchema) updateSchema.parse(payload.data);
      const response = await api.patch<TApiRow>(`/api/admin/${entity}/${payload.id}`, payload.data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [entity, queryParams] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => api.delete<void>(`/api/admin/${entity}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [entity, queryParams] }),
  });

  return {
    data,
    isLoading,
    error: error || null,
    reload: refetch,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}

// GET DETAIL
export function useAdminEntityDetail<TDetail extends EntityDetail, TApiDetail>(
  entity: string,
  id: string | number | null,
  mapToDetail: (data: TApiDetail) => TDetail
) {
  return useQuery<TDetail | null>({
    queryKey: [entity, id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get<TApiDetail>(`/api/admin/${entity}/${id}`);
      return mapToDetail(response.data);
    },
    enabled: !!id,
  });
}
