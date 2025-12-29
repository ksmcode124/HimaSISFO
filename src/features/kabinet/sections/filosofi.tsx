"use client";

export default function KabinetFilosofiSection() {
  return (
    <section className="relative w-full min-h-screen bg-pink-100 flex items-center justify-center py-20 px-10 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 items-center">
        {/* TENTANG (Kiri) */}
        <div className="flex flex-col gap-4">
          <div className="bg-white p-10 rounded-[40px] h-72 flex flex-col gap-6"></div>
        </div>

        {/* LOGO (Tengah) */}
        <div className="flex justify-center items-center">
          <div className="w-80 h-80 bg-pink-500 rounded-full flex items-center justify-center"></div>
        </div>

        {/* VISI & MISI (Kanan) */}
        <div className="flex flex-col gap-10">
          {/* Visi */}
          <div className="flex items-center w-full h-16 bg-pink-400 rounded-3xl px-6"></div>

          {/* Misi */}
          <div className="flex items-center w-full h-16 bg-pink-400 rounded-3xl px-6"></div>
        </div>
      </div>
    </section>
  );
}
