'use client';

import { useEffect, useState } from "react";
import { AdminEventDetail, AdminEventRow } from "../types";
import { EventDetailResponse } from "@/lib/types/interface";

export function useEvent() {
  const [data, setData] = useState<AdminEventRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: AdminEventRow[] = [
        {
          id: 1,
          description: "description",
          title: "title",
          type: "beasiswa",
          end: new Date(2025, 12, 11, 1, 1, 1, 10),
          start: new Date(2025, 12, 10, 0, 0, 0, 0),
        },
        {
          id: 2,
          description: "description",
          title: "title",
          type: "dore",
          end: new Date(2025, 12, 11, 1, 1, 1, 10),
          start: new Date(2025, 12, 10, 0, 0, 0, 0),
        },
      ]
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: change to form data types
  const saveData = async(data: EventDetailResponse) => {
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

export function useEventDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminEventDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!id) return;

    // setLoading(true);
    // fetchKabinetById(id)
    //   .then(setDetail)
    //   .finally(() => setLoading(false));
    const res: AdminEventDetail = {
      id: 1,
      title: "JUDUL",
      type: "BEASISWA",
      description: "LOREM IPSUM DOLOR SIT AMET",
      date: "12/11/2020 - 13/11/2020",
      foto_event: "/IMG_01.jpg"  
    }
    setDetail(res);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
