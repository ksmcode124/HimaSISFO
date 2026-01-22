'use client';

import { useEffect, useState } from "react";
import { AdminAnggotaDetail, AdminAnggotaRow } from "../types";
import { Anggota } from "@/lib/types/interface";

export function useAnggota() {
  const [data, setData] = useState<AdminAnggotaRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: AdminAnggotaRow[] = [
        {
          id: 1,
          nama_anggota: "Nobel",
          jabatan: "Staff",
          kabinet: "Gelora Harmoni"
        }
      ]
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: change to form data types
  const saveData = async(data: Anggota) => {
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

export function useAnggotaDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminAnggotaDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!id) return;

    // setLoading(true);
    // fetchKabinetById(id)
    //   .then(setDetail)
    //   .finally(() => setLoading(false));
    const res: AdminAnggotaDetail = {
      id: 1,
      nama_anggota: "Nobel",
      kabinet: "Gelora Harmoni",
      jabatan: "Staff",
      foto_anggota: "/IMG_01.jpg"      
    }
    setDetail(res);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
