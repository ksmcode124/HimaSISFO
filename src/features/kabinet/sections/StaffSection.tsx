import { Awan, Ornament2, Ornament5 } from "../components/KabinetOrnaments";

export default function StaffSection() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center overflow-hidden bg-[#F4E8FF]">

      <div className="absolute -right-10 bottom-[23%] w-[400vw] z-0">
        <div className="w-full translate-x-[43%]">
          <Ornament5 />
        </div>
      </div>

      <div className="absolute -right-10 top-[27%] w-[400vw] z-0">
        <div className="w-full translate-x-[30%] -scale-x-100 rotate-[-15deg]">
          <Ornament5 />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center -mb-10 w-full">
        <div className="flex flex-row gap-4 md:gap-6">
          <div className="hidden md:block w-40 md:w-64 mt-25">
            <Ornament2 />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 md:w-[600px] mb-4">
              <Awan />
            </div>
          </div>
          <div className="hidden mt-20 md:block w-40 md:w-64 -scale-x-100">
            <Ornament2 />
          </div>
        </div>
      </div>

      {/* INTI DEPARTEMEN */}
      <div className="relative w-full max-w-7xl px-10 flex flex-col items-center mb-40">
        <div className="relative flex flex-row items-center gap-4 mb-20 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
            Inti Departemen
          </h2>
        </div>

        {/* CONTAINER */}
        <div className="flex justify-center items-center gap-12 z-10">
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
