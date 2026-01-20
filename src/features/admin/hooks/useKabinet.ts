'use client';

import { KabinetListItem } from '@/lib/types/interface';
import { useEffect, useState } from 'react';


export function useKabinet() {
  const [data, setData] = useState<KabinetListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: KabinetListItem[] = [
        {
          id_kabinet: 1,
          nama_kabinet: "List 1",
          tahun_kerja: "2025"
        },
        {
          id_kabinet: 2,
          nama_kabinet: "Gwah",
          tahun_kerja: "2025"
        },
      ]
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    reload: load,
  };
}
