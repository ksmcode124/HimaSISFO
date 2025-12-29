"use client";

import kabinetDataRaw from "../data/kabinet.json";
import KabinetYearButton from "../components/button";
import { KabinetDataJSON } from "../types";
import { useRouter } from "next/navigation";

const data = kabinetDataRaw as unknown as KabinetDataJSON;

export default function KabinetHeroSection() {
  const router = useRouter();
  const currentKabinet = data.kabinet_list[1];

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-white bg-slate-900">
      {/* BACKGROUND PICTURE */}
      <div className="absolute inset-0 z-0 bg-slate-800" />

      {/* TAHUN & LOGO */}
      <div className="absolute top-20 z-10 w-full flex justify-between items-center px-60">
        {/* Tahun Kiri */}
        <KabinetYearButton
          label={data.kabinet_list[0].tahun_akademik}
          onClick={() => router.push("/kabinet/aksayapatra")}
        />

        {/* Logo Tengah */}
        <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center border-4 border-pink-500"></div>

        {/* Tahun Kanan */}
        <KabinetYearButton
          label="2026/2027"
          onClick={() => router.push("/kabinet/coming-soon")}
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[400px]">
        <div className="text-4xl md:text-7xl font-bold leading-relaxed">
          <h1>SELAMAT DATANG DI</h1>
          <h2>HIMASISFO {currentKabinet.tahun_akademik}</h2>
        </div>

        {/* Teks Nama Kabinet */}
        <h3 className="text-3xl md:text-5xl font-bold mt-4 text-pink-500">
          Kabinet {currentKabinet.nama_kabinet}
        </h3>
      </div>
    </section>
  );
}
