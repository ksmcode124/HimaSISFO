'use client';

import { Kabinet } from '@/lib/types/interface';
import { AdminKabinetRow } from '../types';
import { useEffect, useState } from 'react';


export function useKabinet() {
  const [data, setData] = useState<AdminKabinetRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: AdminKabinetRow[] = [
        {
          id: 1,
          nama_kabinet: "Gelora Harmoni",
          tahun_kerja: "2025/2026",
          logo: "IMG_01.svg",
          departemen_count: 10
        },
        {
          id: 1,
          nama_kabinet: "Aksayapatra",
          tahun_kerja: "2024/2025",
          logo: "IMG_02.svg",
          departemen_count: 9
        },
      ]
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: change to form data types
  const saveData = async(data: Kabinet) => {
    setIsLoading(true)

    try {
      alert(data)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteData = async(id: number) => {
    setIsLoading(true)
    try {
      alert(data)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    saveData,
    deleteData,
    reload: load,
  };
}
