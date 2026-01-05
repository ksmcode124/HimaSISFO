import { Awan, Ornament2 } from "../components/KabinetOrnaments";

export default function KabinetDepartemenSection() {
  return (
    <section className="relative w-full min-h-screen bg-pink-50 flex flex-col items-center py-20 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center mb-20 w-full">
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

      <h2 className="text-3xl -mt-30 mb-30 md:text-5xl font-bold">
        Departemen
      </h2>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-10 px-10">
        <div className="flex flex-wrap justify-center gap-14 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-56 h-72 bg-white rounded-2xl border-2 flex items-center justify-center"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
