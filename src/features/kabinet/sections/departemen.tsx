"use client";

export default function KabinetDepartemenSection() {
  return (
    <section className="relative w-full min-h-screen bg-pink-50 flex flex-col items-center py-20 overflow-hidden">
      {/* HEADER */}
      <div className="relative z-10 flex flex-col items-center mb-20">
        {/* Awan */}
        <div className="w-[1000px] h-32 bg-pink-300 rounded-full mb-4 opacity-50" />
        {/* Judul */}
        <h2 className="text-2xl md:text-5xl font-bold text-slate-800 tracking-tight">
          Departemen
        </h2>
      </div>

      {/* GRID CONTAINER DEPARTEMEN */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-10 px-10">
        <div className="flex flex-wrap justify-center gap-14 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-56 h-72 bg-white rounded-2xl border-2 border-pink-200 flex items-center justify-center"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
