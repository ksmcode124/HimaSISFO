'use client';

import { useCallback, useEffect, useState } from 'react';
import { Kabinet, KabinetResponse } from '@/lib/types/interface';
import { AdminKabinetDetail, AdminKabinetRow, KabinetResponseAdmin } from '../types';
import { api } from '@/lib/services/api';
import { id } from 'zod/v4/locales';

export function useKabinet() {
  const [data, setData] = useState<AdminKabinetRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<KabinetResponseAdmin[]>('/api/admin/kabinet')
      const kabinetData: AdminKabinetRow[] = response.data.map((res) => {
        return {
          id: res.id_kabinet,
          tahun_kerja: res.tahun_kerja ?? '-',
          nama_kabinet: res.nama_kabinet ?? '-',
          departemen_count: res.departemen.length,
          logo: res.gambar_logo ?? ''
        }
      })

      setData(kabinetData);
    } catch {
      setError('Failed to load kabinet');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // NOTE: payload masih placeholder (form kabinet)
  const saveData = async (payload: Kabinet) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.saveKabinet(payload)
      console.log('SAVE KABINET', payload);
      await load();
    } catch {
      setError('Failed to save kabinet');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.deleteKabinet(id)
      console.log('DELETE KABINET', id);
      await load();
    } catch {
      setError('Failed to delete kabinet');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    saveData,
    deleteData,
    reload: load,
  };
}

export function useKabinetDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminKabinetDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const response = await api.get<KabinetResponseAdmin>(`/api/admin/kabinet/${id}`);
        const detailData: AdminKabinetDetail = {
           id: response.data.id_kabinet,
           nama_kabinet: response.data.nama_kabinet,
           deskripsi: response.data.deskripsi ?? '',
           visi: response.data.visi ?? '',
           misi: response.data.misi ?? '',
           tahun_kerja: response.data.tahun_kerja,
           logo: response.data.gambar_logo ?? '',
           departemen_count: response.data.departemen.length
        }
        console.log(detailData)
        setDetail(detailData);
      } catch (err: unknown) {
        console.error(err);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { detail, isLoadingModal: loading };
}
