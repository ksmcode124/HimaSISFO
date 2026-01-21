'use client';

import { EventDetailResponse } from '@/lib/types/interface';
import { useEffect, useState } from 'react';

export function useKegiatan() {
  const [data, setData] = useState<EventDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: EventDetailResponse[] = [
        {
          id: 1,
          description: "description",
          title: "title",
          type: "beasiswa",
          img: "ini img.png",
          end: '2025-10-10 00:00Z',
          start: '2025-10-10 00:00Z'
        }
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
