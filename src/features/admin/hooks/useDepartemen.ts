'use client';

import { useEffect, useState } from "react";
import { AdminDepartemenRow } from "../types";
import { Departemen } from "@/lib/types/interface";

export function useDepartemen() {
  const [data, setData] = useState<AdminDepartemenRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res: AdminDepartemenRow[] = [
        {
          anggota_count: 50,
          id: 1,
          logo: "IMG_03.jpg",
          nama_departemen: "Inti",
          proker_count: 10
        },
        {
          anggota_count: 50,
          id: 1,
          logo: "IMG_03.jpg",
          nama_departemen: "Akademik dan Keprofesian",
          proker_count: 10
        },
        {
          anggota_count: 50,
          id: 1,
          logo: "IMG_03.jpg",
          nama_departemen: "Sosial Masyarakat",
          proker_count: 10
        }
      ]
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: change to form data types
  const saveData = async(data: Departemen) => {
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
