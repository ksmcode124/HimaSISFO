import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  namaKomunitas: string;
  deskripsi: string;
  fotoBanner: string; // path ke gambar banner/foto kegiatan
  iconKomunitas?: string; // path ke icon (opsional)
  /** Ukuran font judul di desktop (default: "96px") */
  titleFontSize?: string;
}

export default function HeroSection({
  namaKomunitas,
  deskripsi,
  fotoBanner,
  iconKomunitas,
  titleFontSize = "96px",
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden px-4 pb-12 pt-[100px] md:px-8 md:pt-[130px] lg:px-16"
      style={{
        background: "linear-gradient(180deg, #E6F3FD 0%, #D8EDFD 50%, #CDE7FC 100%)",
      }}
    >
      {/* Background grafis gelombang biru-putih sesuai Figma */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] md:h-[620px]"
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <Image
          src="/assets/komunitas/hero-bg.svg"
          alt=""
          fill
          className="object-cover object-top opacity-50"
          priority
        />
      </div>

      {/* Konten Hero */}
      <div className="relative mx-auto w-full max-w-[1055px]">

        {/* Breadcrumb sementara jika belum ada dari bagian breadcrumbs */}
        <div className="mb-4 flex items-center font-title text-base font-medium leading-none tracking-normal sm:text-xl md:mb-6 md:text-[32px]">
          <Link href="/" className="text-[#1A78C2] no-underline">
            Beranda
          </Link>
          <span className="mx-2 text-[#1A78C2]">/</span>
          <span className="text-[#0F446D]">Komunitas {namaKomunitas}</span>
        </div>

        {/* Gambar Banner: 1055px x 734px (responsif dengan aspect-[1055/734]) */}
        <div className="relative w-full aspect-[1055/734] max-w-[1055px] max-h-[734px] overflow-hidden rounded-2xl shadow-md">
          <Image
            src={fotoBanner}
            alt={`Foto ${namaKomunitas}`}
            fill
            sizes="(max-width: 1055px) 100vw, 1055px"
            className="object-cover"
            priority
          />
        </div>

        {/* Judul: "KOMUNITAS [icon] NAMAKOM" */}
        <div className="mt-8 flex w-full items-center justify-between gap-4">
          {/* Sisi Kiri: Teks KOMUNITAS rata kiri */}
          <h1
            className="font-normal uppercase tracking-normal text-[#1E87DB] leading-none text-left whitespace-nowrap"
            style={{
              fontFamily: "'Coolvetica', 'Coolvetica Rg', sans-serif",
              fontSize: titleFontSize,
              textShadow: "4px 4px 19px rgba(0, 0, 0, 0.3)",
            }}
          >
            KOMUNITAS
          </h1>

          {/* Tengah: Logo/Icon berada persis di tengah ruang kosong antar dua kata */}
          {iconKomunitas && (
            <div className="flex flex-1 items-center justify-center">
              <div
                className="relative size-[68px] shrink-0 rounded-full"
                style={{ boxShadow: "4px 4px 19px 0px rgba(0, 0, 0, 0.3)" }}
              >
                <Image
                  src={iconKomunitas}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Sisi Kanan: Teks Nama Komunitas rata kanan */}
          <h1
            className="font-normal uppercase tracking-normal text-[#1E87DB] leading-none text-right whitespace-nowrap"
            style={{
              fontFamily: "'Coolvetica', 'Coolvetica Rg', sans-serif",
              fontSize: titleFontSize,
              textShadow: "4px 4px 19px rgba(0, 0, 0, 0.3)",
            }}
          >
            {namaKomunitas}
          </h1>
        </div>

        {/* Deskripsi (Rata Kiri Kanan / Justify) */}
        <p className="mt-6 text-justify text-sm leading-relaxed text-[#2B2B2B] sm:text-base md:text-lg">
          {deskripsi}
        </p>
      </div>
    </section>
  );
}

