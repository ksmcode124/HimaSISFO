import Image from "next/image";
import Link from "next/link";

const dataKomunitas = [
  {
    title: "Futsal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    icon: "/assets/beranda/komunitas/fa_futbol-o.svg",
    photo: "/assets/beranda/komunitas/futsal.jpg", // GANTI dengan foto kamu
    href: "/komunitas/futsal",
  },
  {
    title: "Basket",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    icon: "/assets/beranda/komunitas/fluent_sport-basketball-24-regular.svg", // sesuaikan nama file
    photo: "/assets/beranda/komunitas/basket.jpg", // GANTI dengan foto kamu
    href: "/komunitas/basket",
  },
  {
    title: "Badminton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    icon: "/assets/beranda/komunitas/boxicons_shuttlecock.svg", // sesuaikan nama file
    photo: "/assets/beranda/komunitas/badminton.jpg", // GANTI dengan foto kamu
    href: "/komunitas/badminton",
  },
  {
    title: "Arak-Arakan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    icon: "/assets/beranda/komunitas/lucide_drum.svg",
    photo: "/assets/beranda/komunitas/arak-arakan.jpg", // GANTI dengan foto kamu
    href: "/komunitas/arak-arakan",
  },
];

export default function Komunitas() {
  return (
    <section
      id="komunitas"
      className="relative overflow-hidden px-[49px] py-12 sm:px-8 md:py-20 lg:px-16"
    >
      {/* Glow biru di atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,#C5CDF5_0%,transparent_70%)] opacity-70" />

      {/* Container: desktop dikunci 782px = 385 + 12 (gap) + 385 */}
      <div className="relative mx-auto w-full max-w-md md:max-w-3xl lg:max-w-[782px]">
        {/* Heading */}
        <h2 className="mx-auto mb-9 w-fit whitespace-nowrap bg-gradient-to-r from-[#5B93C6] via-[#145A92] to-[#5B93C6] bg-clip-text font-heading text-[28px] font-bold leading-[35px] text-transparent md:text-[48px] md:leading-[60px]">
          Komunitas Kami
        </h2>

        {/* Grid kartu: mobile 1 kolom, tablet/desktop 2 kolom.
            auto-rows-[243px] = tinggi semua kartu sama (sesuai Figma) */}
        <div className="relative grid grid-cols-1 auto-rows-[243px] gap-4 md:grid-cols-2 md:gap-3">
          {dataKomunitas.map((item, index) => {
            // Genap: foto di kiri | Ganjil: foto di kanan
            const photoKanan = index % 2 === 1;

            return (
              <article
                key={item.title}
                className={`flex h-full w-full overflow-hidden rounded-xl bg-white-light shadow-sm ${
                  photoKanan ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Foto: lingkaran 300px yang dipotong oleh kartu
                    (overflow-hidden di <article>), sama seperti Figma.
                    Lebar area: Mobile 165px | Tablet 170px | Desktop 190px */}
                <div className="relative h-full w-[165px] shrink-0 md:w-[170px] lg:w-[190px]">
                  <div
                    className={`absolute top-1/2 h-[300px] w-[300px] -translate-y-1/2 overflow-hidden rounded-full border-[4px] border-secondary-blue-normal ${
                      photoKanan ? "left-0" : "right-0"
                    }`}
                  >
                    <Image
                      src={item.photo}
                      alt={item.title}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Konten
                    Mobile: p-3
                    Tablet+: atas-bawah 16px, sisi luar 24px, sisi dekat foto 16px (Figma) */}
                <div
                  className={`flex min-w-0 flex-1 flex-col items-start justify-center gap-2 p-3 md:py-4 ${
                    photoKanan ? "md:pl-6 md:pr-4" : "md:pl-4 md:pr-6"
                  }`}
                >
                  {/* Icon (SVG sudah punya lingkaran sendiri) */}
                  <Image
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 object-contain"
                  />

                  <h3 className="font-heading text-xl font-bold leading-[30px] text-primary-blue-normal">
                    {item.title}
                  </h3>

                  <p className="body4 line-clamp-6 leading-4 text-black-normal">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="label2 mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-normal px-3 py-1.5 text-xs text-white-light transition-colors hover:bg-blue-normal-hover"
                  >
                    Selengkapnya
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}

          {/* Icon di tengah antar kartu (hanya tablet/desktop) */}
            <div className="absolute left-1/2 top-1/2 hidden h-[53.25px] w-[53.25px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-blue-light-active md:flex">
            <Image
                src="/assets/beranda/komunitas/mdi_account-group.svg" // sesuaikan nama file
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
            />
            </div>
        </div>

        {/* Garis bawah */}
        <div className="mt-8 md:mt-10">
          <div className="mx-auto h-0 w-[280px] border-t border-[#6E6B6B] md:w-[400px] lg:w-[500px]" />
        </div>
      </div>
    </section>
  );
}