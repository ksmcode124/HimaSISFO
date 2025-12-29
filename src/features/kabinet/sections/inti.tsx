"use client";

export default function KabinetIntiSection() {
  return (
    <section className="relative w-full min-h-[120vh] bg-pink-50 flex flex-col items-center py-24 overflow-hidden">
      {/* HEADER SECTION */}
      <div className="relative z-10 flex flex-row items-center gap-4 mb-20">
        {/* Logo Kecil */}
        <div className="w-12 h-12 bg-pink-400 rounded-lg shadow-sm" />

        {/* Judul */}
        <h2 className="text-2xl md:text-5xl font-bold text-slate-800 tracking-tight">
          Inti Himpunan
        </h2>
      </div>

      {/* Awan */}
      <div className="absolute top-40 -right-20 w-80 h-64 bg-pink-200 rounded-full opacity-60" />
      <div className="absolute bottom-40 -left-20 w-96 h-56 bg-pink-200 rounded-full opacity-60" />

      {/* SLIDER AREA */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between px-10">
        {/* Carousel Inti */}
        <div className="flex-1 flex justify-center items-center mx-10">
          <div className="w-full max-w-[1000px] h-[500px] bg-white/30 backdrop-blur-sm rounded-[60px] border-2 border-dashed border-pink-300 flex items-center justify-center shadow-inner">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 bg-pink-200 rounded-full animate-pulse" />
              <span className="text-4xl font-black text-pink-400 uppercase tracking-[1em]">
                Carousel Inti
              </span>
              <p className="text-pink-300 font-medium italic">
                berisi foto dan nama pengurus inti
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGINATION DOTS */}
      <div className="mt-16 flex items-center gap-3">
        <div className="w-5 h-5 bg-pink-200 rounded-full" />
        <div className="w-12 h-5 bg-pink-500 rounded-full" />
        <div className="w-5 h-5 bg-pink-200 rounded-full" />
      </div>

      {/* AKSEN GARIS BAWAH */}
      <div className="absolute bottom-12 w-[70%] h-[5px] bg-linear-to-r from-transparent via-pink-400 to-transparent opacity-50" />
    </section>
  );
}
