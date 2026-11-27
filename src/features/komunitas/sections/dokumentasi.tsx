import Image from "next/image";
import { komunitas_list } from "../data/komunitas.ts";

type DokumentasiProps = {
  komunitasId: string;
};

export default function Dokumentasi({ komunitasId }: DokumentasiProps) {
  const komunitas = DATA_KOMUNITAS[komunitasId];

  if (!komunitas) return null;

  const { fotoBanner, nama } = komunitas;
  const alt = `Dokumentasi komunitas ${nama}`;

  return (
    <section className="flex min-h-[316px] w-full flex-col items-center bg-[#90CAF9] lg:min-h-[613px] lg:gap-6">
      <div className="mb-[11px] mt-[5px] flex h-[53px] w-full max-w-[332px] items-center lg:mb-[14px] lg:mt-[27px] lg:h-[96px] lg:max-w-[1055px]">
        <h1 style={{ fontFamily: "'Coolvetica', 'Coolvetica Rg', sans-serif" }}
          className="tracking-[0.02em] flex w-full items-center justify-between whitespace-nowrap text-[31px] leading-none text-[#EEF7FE] drop-shadow-[2px_2px_7px_rgba(0,0,0,0.3)] lg:text-[95px]">
          <span>DOKUMENTASI</span>
          <span>KEGIATAN</span>
        </h1>
      </div>

      <div className="grid h-[221px] w-full max-w-[340px] grid-cols-1 gap-[14px] md:h-[300px] md:max-w-[1055px] md:grid-cols-2 lg:h-[370px] lg:max-w-[1092px]">
        {/* Kiri: hanya tampil di desktop (foto yang sama, 2 kali) */}
        <div className="hidden grid-rows-2 gap-3 md:grid">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={fotoBanner}
              alt={alt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={fotoBanner}
              alt={alt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Kanan: selalu tampil (satu-satunya foto di HP) */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={fotoBanner}
            alt={alt}
            fill
            sizes="(max-width: 768px) 340px, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}