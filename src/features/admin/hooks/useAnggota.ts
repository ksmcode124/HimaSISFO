'use client';

import { useEffect, useState } from "react";
import { AdminAnggotaRow } from "../types";
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
