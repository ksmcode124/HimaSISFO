"use client";

export default function StaffSectionSkeleton() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center overflow-hidden bg-[#F4E8FF]">
      {/* placeholder ornamen awan */}
      <div className="relative w-[600px] h-[180px] mb-12">
        <div className="w-full h-full bg-pink-300/30 rounded-full absolute" />
      </div>

      {/* INTI DEPARTEMEN */}
      <div className="relative w-full max-w-7xl px-10 flex flex-col items-center mb-40">
        <div className="relative flex flex-row items-center gap-4 mb-20 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            Inti Departemen
          </h2>
        </div>

        {/* CONTAINER */}
        <div className="flex justify-center items-center gap-12">
          {/* wakadep */}
          <div className="w-60 h-80 border-2 flex items-center justify-center">
            Wakadep
          </div>
          {/* kadep */}
          <div className="w-60 h-80 border-2 flex items-center justify-center">
            Kadep
          </div>
          {/* sekbend */}
          <div className="w-60 h-80 border-2 flex items-center justify-center">
            Sekbend
          </div>
        </div>
      </div>

      {/* STAFF DEPARTEMEN */}
      <div className="relative z-10 w-full max-w-7xl px-10 flex flex-col items-center">
        <div className="relative flex flex-row items-center gap-4 mb-20 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            Staff Departemen
          </h2>
        </div>

        {/* GRID POSISI: STAFF (3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-32 gap-x-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* foto & nama staff */}
              <div className="w-52 h-52 border-2 flex items-center justify-center relative">
                Staff {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
