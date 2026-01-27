'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminDepartemenRow, AdminDepartemenDetail, DepartemenResponseAdmin } from '../types';
import { Departemen } from '@/lib/types/interface';
import { api } from '@/lib/services/api';

export function useDepartemen() {
  const [data, setData] = useState<AdminDepartemenRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<DepartemenResponseAdmin[]>('/api/admin/departemen')
      const departemenData: AdminDepartemenRow[] = response.data.map((res) => {
        return {
          id: res.id_departemen,
          nama_departemen: res.nama_departemen,
          logo: res.logo_departemen ?? '',
          anggota_count: 0, // TODO: gatau ngambil dari mana harusnya
          proker_count: 0, // TODO: sama seperti sebelumnya
          nama_kabinet: res.kabinet.nama_kabinet //TODO: harusnya ada slug untuk link href
        }
      })
      setData(departemenData)
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
