'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminEventRow, AdminEventDetail } from '../types';
import { EventDetailResponse } from '@/lib/types/interface';

export function useEvent() {
  const [data, setData] = useState<AdminEventRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: replace with real API
      const res: AdminEventRow[] = [
        {
          id: 1,
          description: 'description',
          title: 'title',
          type: 'beasiswa',
          end: new Date(2025, 12, 11, 1, 1, 1),
          start: new Date(2025, 12, 10, 0, 0, 0),
        },
        {
          id: 2,
          description: 'description',
          title: 'title',
          type: 'dore',
          end: new Date(2025, 12, 11, 1, 1, 1),
          start: new Date(2025, 12, 10, 0, 0, 0),
        },
      ];

      setData(res);
    } catch (e) {
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveData = async (payload: EventDetailResponse) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.saveEvent(payload)
      console.log('SAVE', payload);
      await load();
    } catch {
      setError('Failed to save event');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: await api.deleteEvent(id)
      console.log('DELETE', id);
      await load();
    } catch {
      setError('Failed to delete event');
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

export function useEventDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminEventDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }

    setLoading(true);

    // TODO: replace with real API
    const res: AdminEventDetail = {
      id,
      title: 'JUDUL',
      type: 'BEASISWA',
      description: 'LOREM IPSUM DOLOR SIT AMET',
      date: '12/11/2020 - 13/11/2020',
      foto_event: '/IMG_01.jpg',
    };

    setDetail(res);
    setLoading(false);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
