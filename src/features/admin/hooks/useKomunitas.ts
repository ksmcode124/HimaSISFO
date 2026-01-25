'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AdminKomunitasRow,
  AdminKomunitasDetail,
} from '../types';
import { Anggota } from '@/lib/types/interface';

export function useKomunitas() {
  const [data, setData] = useState<AdminKomunitasRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: replace with real API
      const res: AdminKomunitasRow[] = [
        {
          id: 1,
          nama_komunitas: 'Futsal',
          foto_komunitas: 'IMG_01.jpg',
          foto_pencapaian: 'IMG_02.jpg',
          pencapaian: 'LOREM IPSUM',
        },
        {
          id: 2,
          nama_komunitas: 'Voli',
          foto_komunitas: 'IMG_02.jpg',
          foto_pencapaian: 'IMG_03.jpg',
          pencapaian: 'LOREM IPSUM',
        },
      ];

      setData(res);
    } catch {
      setError('Failed to load komunitas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // NOTE: payload type masih placeholder
  const saveData = async (payload: Anggota) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.saveKomunitas(payload)
      console.log('SAVE KOMUNITAS', payload);
      await load();
    } catch {
      setError('Failed to save komunitas');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.deleteKomunitas(id)
      console.log('DELETE KOMUNITAS', id);
      await load();
    } catch {
      setError('Failed to delete komunitas');
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

export function useKomunitasDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminKomunitasDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }

    setLoading(true);

    // TODO: replace with real API
    const res: AdminKomunitasDetail = {
      id,
      nama_komunitas: 'Nama Komunitas',
      foto_komunitas: '/IMG_01.jpg',
      pencapaian: 'list pencapaian?',
    };

    setDetail(res);
    setLoading(false);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
