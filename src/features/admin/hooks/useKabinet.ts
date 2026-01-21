'use client';

import { Kabinet } from '@/lib/types/interface';
import { AdminKabinetDetail, AdminKabinetRow } from '../types';
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

export function useKabinetDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminKabinetDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!id) return;

    // setLoading(true);
    // fetchKabinetById(id)
    //   .then(setDetail)
    //   .finally(() => setLoading(false));
    const res: AdminKabinetDetail = {
      id: 1,
      tahun_kerja: "2025/2026",
      nama_kabinet:"gelora harmoni",
      departemen_count: 10,
      deskripsi: "LOREM IPSUM",
      logo: "IMG.jpg",
      misi: "Foya",
      visi: "Foya",
    }
    setDetail(res);
  }, [id]);

  return { detail, isLoading: loading };
}
