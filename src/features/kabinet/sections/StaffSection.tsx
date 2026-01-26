import {
  Ornament1,
  Ornament2,
  Ornament4,
  Ornament5,
} from "../components/KabinetOrnaments";
import StaffCard from "../components/StaffCard";

interface StaffSectionProps {
  data: {
    staff: {
      inti: { nama: string; jabatan: string; image_url: string }[];
      anggota: { nama: string; image_url: string }[];
    };
  };
}

export default function StaffSection({ data }: StaffSectionProps) {
  const intiDepartemen = data.staff.inti;
  const staffDepartemen = data.staff.anggota;

  return (
    <section className="relative w-full py-32 flex flex-col items-center overflow-hidden bg-[#F4E8FF]">
      <div className="absolute right-30 md:right-20 bottom-[10%] md:top-[12%] lg:top-[0%] w-[700vw] md:w-[400vw] z-0">
        <div className="w-full translate-x-[43%] -rotate-235 md:rotate-0">
          <Ornament5 />
        </div>
      </div>

      <div className="absolute -right-60 md:-right-10 top-[30%] lg:top-[22%] w-[700vw] md:w-[400vw] z-0">
        <div className="w-full translate-x-[40%] md:translate-x-[30%] -scale-x-100 -rotate-250 md:rotate-[-15deg]">
          <Ornament5 />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center md:mb-20 w-full">
        <div className="flex flex-row -mt-20 md:mt-0 gap-4 md:gap-6 items-center">
          <div className="w-16 md:w-64 mt-1 md:mt-20 mr-6 md:mr-0 scale-60 md:scale-95 origin-right">
            <Ornament2 />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-60 md:w-[600px] mb-18 md:mb-24">
              <Ornament1 />
            </div>
          </div>
          <div className="mt-1 md:mt-20 ml-6 md:ml-0 w-16 md:w-64">
            <div className="scale-60 md:scale-95 origin-left">
              <div className="scale-x-[-1]">
                <Ornament2 />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTI DEPARTEMEN */}
      <div className="relative w-full max-w-7xl px-10 flex flex-col items-center mb-40">
        <div className="relative flex flex-row items-center mb-20 -mt-10 md:-mt-28">
          <h2 className="text-lg md:text-3xl font-bold tracking-tight text-black">
            Inti Departemen
          </h2>
        </div>
      </div>

      <div className="absolute w-120 top-64 right-22 z-0 rotate-45 md:hidden">
        <Ornament4 />
      </div>
      <div className="absolute w-120 top-64 left-22 z-0 rotate-135 -scale-y-100 md:hidden">
        <Ornament4 />
      </div>

      {/* CONTAINER */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center -mt-44 mb-16 gap-8 lg:gap-22 z-10 w-full max-w-4xl">
        {/* Kadep */}
        <div className="col-span-2 flex justify-center md:contents">
          <div className="w-40 h-52 md:w-50 md:h-62 lg:w-60 lg:h-80 md:order-2 border-2 flex items-center justify-center">
            Kadep
          </div>
        </div>

        {/* Wakadep */}
        <div className="col-span-1 flex justify-center md:contents">
          <div className="w-36 h-46 md:w-50 md:h-62 lg:w-60 lg:h-80 md:order-1 ml-12 md:ml-0 border-2 flex items-center justify-center">
            Wakadep
          </div>
        </div>

        {/* Sekbend */}
        <div className="col-span-1 flex justify-center md:contents">
          <div className="w-36 h-46 md:w-50 md:h-62 lg:w-60 lg:h-80 md:order-3 mr-12 md:mr-0 border-2 flex items-center justify-center">
            Sekben
          </div>
        </div>
      </div>

      {/* STAFF DEPARTEMEN */}
      <div className="relative z-10 w-full max-w-7xl px-10 flex flex-col items-center">
        <div className="relative flex flex-row items-center mb-20 md:mt-20">
          <h2 className="text-lg md:text-3xl font-bold tracking-tight text-black">
            Staff Departemen
          </h2>
        </div>

        {/* GRID POSISI: STAFF (3 Kolom Desktop, 2 Kolom Mobile) */}
        <div className="grid grid-cols-2 lg::grid-cols-3 gap-y-16 md:gap-y-36 gap-x-8 md:gap-x-32">
          {staffDepartemen.map((staff, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-36 md:w-52 flex items-center justify-center relative">
                <StaffCard data={staff} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
