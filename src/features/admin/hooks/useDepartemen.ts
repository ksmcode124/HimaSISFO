'use client';

import { useEffect, useState } from "react";
import { AdminDepartemenDetail, AdminDepartemenRow } from "../types";
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

export function useDepartemenDetail(id: number | null) {
  const [detail, setDetail] = useState<AdminDepartemenDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!id) return;

    // setLoading(true);
    // fetchKabinetById(id)
    //   .then(setDetail)
    //   .finally(() => setLoading(false));
    const res: AdminDepartemenDetail = {
      id: 1,
      deskripsi: "LOREM IPSUM DOLOR SIT AMET",
      anggota_count: 10,
      nama_departemen: "SOSMAS",
      proker_count: 3
    }
    setDetail(res);
  }, [id]);

  return { detail, isLoadingModal: loading };
}
