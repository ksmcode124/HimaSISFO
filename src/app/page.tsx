// app/kegiatan/page.tsx
import { FilterComp } from "@/features/kegiatan/components/FilterComp";

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ bulan?: string }> 
}) {
  // Ambil nilai 'bulan' dari URL GET param
  const { bulan } = await searchParams;
  const currentBulan = bulan || "Januari"; // default

  console.log("Server sedang render bulan:", currentBulan);

  // CONTOH: Fetch data di server berdasarkan bulan
  // const data = await fetch(`https://api.anda.com/data?bulan=${currentBulan}`).then(res => res.json());

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Halaman Kegiatan: {currentBulan}</h1>
      
      {/* Filter ini akan mengubah URL saat diklik */}
      <FilterComp />

      <div className="mt-8">
        {/* Render data hasil filter di sini */}
        <p>Data untuk bulan {currentBulan} akan muncul di sini...</p>
      </div>
    </div>
  );
}