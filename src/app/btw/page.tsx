'use client';

import { useEffect, useState } from 'react';
import BtwKepengurusan from './components/BtwKepengurusan';
import BtwAnggota from './components/BtwAnggota';

interface Anggota {
  id_anggota: number;
  nama_anggota: string;
  jabatan: string;
  foto_anggota: string | null;
}

interface Divisi {
  id_divisi: number;
  nama_divisi: string;
  btw_anggota: Anggota[];
}

interface BtwData {
  id_btw: number;
  tahun_kerja: string;
  btw_divisi: Divisi[];
}

export default function BtwPage() {
  const [data, setData] = useState<BtwData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBtwData();
  }, []);

  const fetchBtwData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/display/btw');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error fetching BTW:', err);
      setError('Gagal memuat data BTW');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error || 'Data tidak ditemukan'}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <BtwKepengurusan tahunKerja={data.tahun_kerja} />

      {/* Divisi & Anggota */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {data.btw_divisi.map((divisi) => (
            <div key={divisi.id_divisi} className="mb-12">
              <h2  className="text-2xl font-bold text-center mb-8">
                {divisi.nama_divisi}
              </h2>
              <BtwAnggota anggota={divisi.btw_anggota} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}