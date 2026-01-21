'use client';

import { useEffect, useState } from "react";
import { AdminAnggotaRow, AdminKomunitasRow } from "../types";
import { Anggota } from "@/lib/types/interface";

export function useKomunitas() {
  const [data, setData] = useState<AdminKomunitasRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: AdminKomunitasRow[] = [
        {
          id: 1,
          nama_komunitas: "Futsal",
          foto_komunitas: "IMG_01.jpg",
          foto_pencapaian: "IMG_02.jpg",
          pencapaian: "LOREM IPSUM"
        },
        {
          id: 2,
          nama_komunitas: "Voli",
          foto_komunitas: "IMG_02.jpg",
          foto_pencapaian: "IMG_03.jpg",
          pencapaian: "LOREM IPSUM"
        }
      ]
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: change to komunitas form data types 
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
