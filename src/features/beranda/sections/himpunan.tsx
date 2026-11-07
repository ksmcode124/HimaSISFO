import Image from "next/image";

const dataHimpunan = [
  {
    title: "Mahasiswa",
    description:
      "Memiliki lebih dari 1000 lulusan dan mahasiswa aktif hingga saat ini.",
    icon: "/assets/beranda/himpunan/iconMahasiswa.svg",
    // Tablet: melebar 2 kolom (baris atas), garis pemisah di bawah
    className:
      "border-b border-gray-300 md:col-span-2 xl:col-span-1 xl:border-b-0 xl:border-r",
    // Tablet: flex-wrap. Icon + judul satu baris di tengah, deskripsi 100% lebar (basis-full) jadi turun ke baris baru di bawahnya.
    // Desktop (xl): kembali ke grid rata kiri.
    innerClassName: "md:flex md:flex-wrap md:justify-center xl:grid xl:justify-normal",
    descClassName:
      "md:basis-full md:px-16 md:text-center xl:basis-auto xl:px-0 xl:text-left",
  },
  {
    title: "Program Kerja",
    description:
      "Memiliki Total 30+ Program Kerja untuk kebutuhan dan pengembangan mahasiswa.",
    icon: "/assets/beranda/himpunan/iconProgramkerja.svg",
    className: "border-b border-gray-300 md:border-b-0",
    innerClassName: "",
    descClassName: "",
  },
  {
    title: "Komunitas & KSM",
    description: "Memiliki 4 komunitas dan 1 Kelompok Studi Mahasiswa",
    icon: "/assets/beranda/himpunan/iconKomunitas.svg",
    // Tablet & desktop: garis vertikal di kiri
    className: "border-gray-300 md:border-l",
    innerClassName: "",
    descClassName: "",
  },
];

// Satu definisi garis dipakai di atas dan bawah -> ukuran & warna selalu sama
// mobile 280px | tablet selebar grid dikurangi padding kartu (12px kiri-kanan),
// jadi ujung kiri sejajar dengan icon kartu bawah kiri & ujung kanan sejajar isi kartu bawah kanan
// | desktop 894px
const garis =
  "mx-auto hidden h-0 border-t border-[#6E6B6B] md:block md:w-[calc(100%-1.5rem)] xl:w-[894px]";

export default function Himpunan() {
  return (
    <section
      id="himpunan"
      className="relative px-[49px] pb-0 pt-12 md:px-8 md:pb-0 md:pt-20 lg:px-16"
    >
      {/*
        Mobile  (< md)     : 1 kolom
        Tablet  (md - xl)  : 1 kolom di atas (di tengah), 2 kolom di bawah
        (xl: lebar grid 956px = padding kiri-kanan 162px di frame 1280px)
        Desktop (xl+)      : 3 kolom
      */}
      <div className="mx-auto grid w-full max-w-md grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-[956px] xl:grid-cols-3">
        {/* Heading */}
        <div className="col-span-full mb-[10px] text-center md:mb-8 xl:mb-10">
          {/* Garis atas: mobile 280px | tablet mengikuti grid | desktop 894px. Jarak ke judul: 32 / 48 / 96px */}
          <div className={`${garis} mb-8 md:mb-12 xl:mb-24`} />
          {/* w-fit: kotak h2 selebar teks, supaya gradasi (5B93C6 -> 145A92 -> 5B93C6, ujung disamakan dengan tampilan di Figma) membentang di teks, bukan di seluruh lebar kolom.
              Plus Jakarta Sans Bold. Mobile 28px (Figma mobile) | md ke atas 48px = ukuran H1 */}
          <h1 className="mx-auto w-fit whitespace-nowrap bg-gradient-to-r from-[#5B93C6] via-[#145A92] to-[#5B93C6] bg-clip-text font-heading text-[28px] font-bold leading-[35px] text-transparent md:text-[48px] md:leading-[60px]">
            Himpunan Kami
          </h1>
        </div>

        {/* Item */}
        {dataHimpunan.map((item) => (
          <article key={item.title} className={item.className}>
            {/* Grid 2 kolom: icon 73px | judul. Deskripsi melebar di bawahnya.
                Padding kiri-kanan 12px (px-3) di semua ukuran layar -> deskripsi mobile 268px */}
            <div
              className={`grid grid-cols-[73px_1fr] items-center gap-x-4 gap-y-3 px-3 pb-2 pt-3 md:py-5 ${item.innerClassName}`}
            >
              {/* Icon 73x70 */}
              <div className="flex h-[70px] w-[73px] items-center justify-center rounded-xl bg-secondary-blue-normal">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={73}
                  height={70}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Judul (title4) tinggi 30px, satu baris */}
              <h3 className="title4 h-[30px] whitespace-nowrap leading-[30px] text-black-normal">
                {item.title}
              </h3>

              {/* Deskripsi (body2): mobile 268x72, tablet menyesuaikan tinggi */}
              <p
                className={`body2 col-span-2 min-h-[72px] leading-6 text-[#858585] md:min-h-0 xl:min-h-[72px] ${item.descClassName}`}
              >
                {item.description}
              </p>
            </div>
          </article>
        ))}

        {/* Garis bawah: lebar sama dengan garis atas. Jarak dari kartu: 32 / 48 / 72px */}
        <div className="col-span-full mt-8 md:mt-12 xl:mt-[72px]">
          <div className={garis} />
        </div>
      </div>
    </section>
  );
}