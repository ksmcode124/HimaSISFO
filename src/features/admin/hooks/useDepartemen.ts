'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminDepartemenRow, AdminDepartemenDetail } from '../types';
import { Departemen } from '@/lib/types/interface';

export function useDepartemen() {
  const [data, setData] = useState<AdminDepartemenRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: replace with real API
      const res: AdminDepartemenRow[] = [
        {
          id: 1,
          nama_departemen: 'Inti',
          logo: 'IMG_03.jpg',
          anggota_count: 50,
          proker_count: 10,
        },
        {
          id: 2,
          nama_departemen: 'Akademik dan Keprofesian',
          logo: 'IMG_03.jpg',
          anggota_count: 50,
          proker_count: 10,
        },
        {
          id: 3,
          nama_departemen: 'Sosial Masyarakat',
          logo: 'IMG_03.jpg',
          anggota_count: 50,
          proker_count: 10,
        },
      ];

      setData(res);
    } catch {
      setError('Failed to load departemen');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveData = async (payload: Departemen) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.saveDepartemen(payload)
      console.log('SAVE DEPARTEMEN', payload);
      await load();
    } catch {
      setError('Failed to save departemen');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.deleteDepartemen(id)
      console.log('DELETE DEPARTEMEN', id);
      await load();
    } catch {
      setError('Failed to delete departemen');
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

export function useDepartemenDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminDepartemenDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }

    setLoading(true);

    // TODO: replace with real API
    const res: AdminDepartemenDetail = {
      id,
      nama_departemen: 'SOSMAS',
      deskripsi: 'LOREM IPSUM DOLOR SIT AMET',
      anggota_count: 10,
      proker_count: 3,
    };

    setDetail(res);
    setLoading(false);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
