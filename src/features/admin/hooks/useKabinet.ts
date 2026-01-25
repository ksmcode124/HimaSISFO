'use client';

import { useCallback, useEffect, useState } from 'react';
import { Kabinet } from '@/lib/types/interface';
import { AdminKabinetDetail, AdminKabinetRow } from '../types';

export function useKabinet() {
  const [data, setData] = useState<AdminKabinetRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: replace with real API
      const res: AdminKabinetRow[] = [
        {
          id: 1,
          nama_kabinet: 'Gelora Harmoni',
          tahun_kerja: '2025/2026',
          logo: 'IMG_01.svg',
          departemen_count: 10,
        },
        {
          id: 2,
          nama_kabinet: 'Aksayapatra',
          tahun_kerja: '2024/2025',
          logo: 'IMG_02.svg',
          departemen_count: 9,
        },
      ];

      setData(res);
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

    setLoading(true);

    // TODO: replace with real API
    const res: AdminKabinetDetail = {
      id,
      tahun_kerja: '2025/2026',
      nama_kabinet: 'Aksayapatra',
      departemen_count: 10,
      deskripsi: 'LOREM IPSUM',
      logo: 'IMG.jpg',
      misi: 'Foya',
      visi: 'Foya',
    };

    setDetail(res);
    setLoading(false);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
