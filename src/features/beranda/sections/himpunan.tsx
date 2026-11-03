import Image from "next/image";

const dataHimpunan = [
  {
    title: "Mahasiswa",
    description:
      "Memiliki lebih dari 1000 lulusan dan mahasiswa aktif hingga saat ini.",
    icon: "/assets/beranda/himpunan/iconMahasiswa.svg",
  },
  {
    title: "Program Kerja",
    description:
      "Memiliki Total 30+ Program Kerja untuk kebutuhan dan pengembangan mahasiswa.",
    icon: "/assets/beranda/himpunan/iconProgramkerja.svg",
  },
  {
    title: "Komunitas & KSM",
    description: "Memiliki 4 komunitas dan 1 Kelompok Studi Mahasiswa",
    icon: "/assets/beranda/himpunan/iconKomunitas.svg",
  },
];

export default function Himpunan() {
  return (
    <section
      id="himpunan"
      className="relative px-[49px] py-12 sm:px-8 md:py-20 lg:px-16"
    >
      {/* Mobile: padding kiri-kanan 49px, 1 kolom | md+: 3 kolom */}
      <div className="mx-auto grid w-full max-w-md grid-cols-1 md:max-w-5xl md:grid-cols-3">
        {/* Heading */}
        <div className="col-span-full mb-[10px] text-center">
          {/* Garis 280px, jarak 32px ke judul */}
          <div className="mx-auto mb-8 h-0 w-[280px] border-t border-[#6E6B6B] md:w-[400px] lg:w-[500px] ~mx-6" />
          {/* Plus Jakarta Sans, Bold, 28px, tinggi 35px */}
          <h2 className="font-heading text-[28px] font-bold leading-[35px] bg-gradient-to-r from-[#75AEE0] to-[#2675B5] bg-clip-text text-transparent">
            Himpunan Kami
          </h2>
        </div>

        {/* Item */}
        {dataHimpunan.map((item) => (
          <article
            key={item.title}
            className="border-b border-gray-300 last:border-b-0 md:border-b-0 md:border-l md:first:border-l-0"
          >
            {/* Card 292px: padding 12px kiri-kanan -> deskripsi 268px */}
            <div className="grid grid-cols-[73px_1fr] items-center gap-x-4 gap-y-3 px-3 pb-2 pt-3 md:px-6">
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

              {/* Judul (title4) tinggi 30px */}
              <h3 className="title4 h-[30px] leading-[30px] text-black-normal">
                {item.title}
              </h3>

              {/* Deskripsi (body2) 268x72 -> 3 baris x 24px */}
              <p className="body2 col-span-2 min-h-[72px] leading-6 text-[#858585]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}