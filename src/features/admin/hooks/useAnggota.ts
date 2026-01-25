'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminAnggotaRow } from '../types';
import { Anggota } from '@/lib/types/interface';
import { AdminAnggotaDetail } from '../types';

export function useAnggota() {
  const [data, setData] = useState<AdminAnggotaRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: replace with real API
      const res: AdminAnggotaRow[] = [
        {
          id: 1,
          nama_anggota: 'Nobel',
          jabatan: 'Staff',
          kabinet: 'Gelora Harmoni',
        },
      ];

      setData(res);
    } catch {
      setError('Failed to load anggota');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveData = async (payload: Anggota) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.saveAnggota(payload)
      console.log('SAVE ANGGOTA', payload);
      await load();
    } catch {
      setError('Failed to save anggota');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.deleteAnggota(id)
      console.log('DELETE ANGGOTA', id);
      await load();
    } catch {
      setError('Failed to delete anggota');
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

export function useAnggotaDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminAnggotaDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }

    setLoading(true);

    // TODO: replace with real API
    const res: AdminAnggotaDetail = {
      id,
      nama_anggota: 'Nobel',
      kabinet: 'Gelora Harmoni',
      jabatan: 'Staff',
      foto_anggota: '/IMG_01.jpg',
    };

    setDetail(res);
    setLoading(false);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
