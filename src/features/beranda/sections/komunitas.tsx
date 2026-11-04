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
    icon: "/assets/beranda/komunitas/fluent_sport-basketball.svg", // sesuaikan nama file
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

      <div className="relative mx-auto w-full max-w-md md:max-w-3xl lg:max-w-4xl">
        {/* Heading */}
        <h2 className="mb-6 text-center font-heading text-[28px] font-bold leading-[35px] bg-gradient-to-r from-[#75AEE0] to-[#2675B5] bg-clip-text text-transparent md:mb-8">
          Komunitas Kami
        </h2>

        {/* Grid kartu: mobile 1 kolom, tablet/desktop 2 kolom */}
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-3">
          {dataKomunitas.map((item, index) => {
            // Genap: foto di kiri | Ganjil: foto di kanan (zig-zag di mobile,
            // dan otomatis kiri/kanan seperti desain di 2 kolom)
            const photoKanan = index % 2 === 1;

            return (
              <article
                key={item.title}
                className={`flex rounded-xl bg-white-light shadow-sm ${
                  photoKanan ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Foto: sisi dalam melengkung + garis biru. Mobile: menonjol 33px keluar kartu */}
                <div
                  className={`relative w-[165px] shrink-0 self-stretch overflow-hidden border-secondary-blue-normal md:w-[130px] ${
                    photoKanan
                      ? "-mr-[33px] rounded-l-[50%] rounded-r-xl border-l-[3px] md:mr-0"
                      : "-ml-[33px] rounded-l-xl rounded-r-[50%] border-r-[3px] md:ml-0"
                  }`}
                >
                  <Image
                    src={item.photo}
                    alt={item.title}
                    fill
                    sizes="165px"
                    className="object-cover"
                  />
                </div>

                {/* Konten */}
                <div className="flex min-w-0 flex-1 flex-col items-start gap-2 p-3">
                  {/* Icon (SVG sudah punya lingkaran sendiri, tampil penuh) */}
                  <Image
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-12 w-12 object-contain"
                  />

                  <h3 className="font-heading text-xl font-bold leading-[30px] text-primary-blue-normal">
                    {item.title}
                  </h3>

                  <p className="body4 leading-4 text-black-normal">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="label2 mt-1 inline-flex items-center gap-1.5 rounded-full bg-blue-normal px-3 py-1.5 text-xs text-white-light transition-colors hover:bg-blue-normal-hover"
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
          <div className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white-normal bg-primary-blue-light-active md:flex">
            <Image
              src="/assets/beranda/komunitas/mdi_account-group.svg" // sesuaikan nama file
              alt=""
              width={22}
              height={22}
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