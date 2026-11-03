import Image from "next/image";

const dataHimpunan = [
  {
    title: "Mahasiswa",
    description:
      "Memiliki lebih dari 1000 lulusan dan mahasiswa aktif hingga saat ini.",
    icon: "/assets/beranda/himpunan/iconMahasiswa.svg",
    // Tablet: melebar 2 kolom (baris atas), garis pemisah di bawah
    className:
      "border-b border-gray-300 md:col-span-2 xl:col-span-1 xl:border-b-0",
    // Tablet: isi kartu di tengah. Desktop: kembali rata kiri
    innerClassName: "md:items-center md:text-center xl:items-stretch xl:text-left",
  },
  {
    title: "Program Kerja",
    description:
      "Memiliki Total 30+ Program Kerja untuk kebutuhan dan pengembangan mahasiswa.",
    icon: "/assets/beranda/himpunan/iconProgramkerja.svg",
    className: "border-b border-gray-300 md:border-b-0 xl:border-l",
    innerClassName: "",
  },
  {
    title: "Komunitas & KSM",
    description: "Memiliki 4 komunitas dan 1 Kelompok Studi Mahasiswa",
    icon: "/assets/beranda/himpunan/iconKomunitas.svg",
    // Tablet & desktop: garis vertikal di kiri
    className: "border-gray-300 md:border-l",
    innerClassName: "",
  },
];

export default function Himpunan() {
  return (
    <section
      id="himpunan"
      className="relative px-[49px] py-12 sm:px-8 md:py-20 lg:px-16"
    >
      {/*
        Mobile  (< md)     : 1 kolom
        Tablet  (md - xl)  : 1 kolom di atas (di tengah), 2 kolom di bawah
        Desktop (xl+)      : 3 kolom
      */}
      <div className="mx-auto grid w-full max-w-md grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-5xl xl:grid-cols-3">
        {/* Heading */}
        <div className="col-span-full mb-[10px] text-center md:mb-6">
          {/* Garis 280px, jarak 32px ke judul */}
          <div className="mx-auto mb-8 h-0 w-[280px] border-t border-[#6E6B6B] md:w-[400px] lg:w-[500px]" />
          {/* Plus Jakarta Sans, Bold, 28px, tinggi 35px */}
          <h2 className="font-heading text-[28px] font-bold leading-[35px] bg-gradient-to-r from-[#75AEE0] to-[#2675B5] bg-clip-text text-transparent">
            Himpunan Kami
          </h2>
        </div>

        {/* Item */}
        {dataHimpunan.map((item) => (
          <article key={item.title} className={item.className}>
            <div
              className={`flex flex-col gap-3 px-3 pb-2 pt-3 md:px-6 md:py-5 ${item.innerClassName}`}
            >
              {/* Icon 73x70 + Judul */}
              <div className="flex items-center gap-4">
                <div className="flex h-[70px] w-[73px] shrink-0 items-center justify-center rounded-xl bg-secondary-blue-normal">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={73}
                    height={70}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Judul (title4) tinggi 30px */}
                <h3 className="title4 h-[30px] whitespace-nowrap leading-[30px] text-black-normal">
                  {item.title}
                </h3>
              </div>

              {/* Deskripsi (body2): mobile 268x72, tablet menyesuaikan tinggi */}
              <p className="body2 min-h-[72px] leading-6 text-[#858585] md:min-h-0 xl:min-h-[72px]">
                {item.description}
              </p>
            </div>
          </article>
        ))}

        {/* Garis bawah: sama dengan garis atas (mobile 280px, tablet 400px, desktop 500px) */}
        <div className="col-span-full mt-8 md:mt-10">
          <div className="mx-auto h-0 w-[280px] border-t border-[#6E6B6B] md:w-[400px] lg:w-[500px]" />
        </div>
      </div>
    </section>
  );
}