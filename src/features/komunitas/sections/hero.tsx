import Image from "next/image";

interface HeroSectionProps {
  namaKomunitas: string;
  deskripsi: string;
  fotoBanner: string; // path ke gambar banner/foto kegiatan
  iconKomunitas?: string; // path ke icon (opsional)
}

export default function HeroSection({
  namaKomunitas,
  deskripsi,
  fotoBanner,
  iconKomunitas,
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden px-4 pb-12 pt-28 sm:pt-32 md:px-8 md:pt-40 lg:px-16 lg:pt-44"
      style={{
        background: "linear-gradient(180deg, #E6F3FD 0%, #D8EDFD 50%, #CDE7FC 100%)",
      }}
    >
      {/* Background grafis gelombang biru-putih sesuai Figma */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] md:h-[620px]"
        style={{
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      >
        <Image
          src="/assets/komunitas/hero-bg.webp"
          alt=""
          fill
          className="object-cover object-top opacity-35"
          style={{
            mixBlendMode: "soft-light",
          }}
          priority
        />
      </div>

      {/* Konten Hero */}
      <div className="relative mx-auto w-full max-w-3xl">

        {/* Breadcrumb sementara jika belum ada dari bagian breadcrumbs */}
        <div className="mb-4 flex items-center font-title text-base font-medium leading-none tracking-normal sm:text-xl md:mb-6 md:text-[32px]">
          <span className="text-[#1A78C2]">Beranda</span>
          <span className="mx-2 text-[#1A78C2]">/</span>
          <span className="text-[#0F446D]">Komunitas {namaKomunitas}</span>
        </div>

        {/* Gambar Banner */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-md">
          <Image
            src={fotoBanner}
            alt={`Foto ${namaKomunitas}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Judul: "KOMUNITAS [icon] NAMAKOM" */}
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <h1 className="font-heading text-3xl font-extrabold uppercase text-primary-blue-normal md:text-5xl">
            KOMUNITAS
          </h1>

          {/* Icon di tengah judul (kalo ada) */}
          {iconKomunitas && (
            <div className="relative h-8 w-8 md:h-12 md:w-12 shrink-0">
              <Image
                src={iconKomunitas}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )}

          <h1 className="font-heading text-3xl font-extrabold uppercase text-primary-blue-normal md:text-5xl">
            {namaKomunitas}
          </h1>
        </div>

        {/* Deskripsi */}
        <p className="mt-4 text-sm leading-relaxed text-black-normal md:text-base">
          {deskripsi}
        </p>
      </div>
    </section>
  );
}

