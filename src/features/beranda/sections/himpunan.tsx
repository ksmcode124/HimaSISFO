import Image from "next/image";
export default function Himpunan() {
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
"Memiliki total 30+ program kerja untuk kebutuhan dan pengembangan mahasiswa.",
icon: "/assets/beranda/himpunan/iconProgramkerja.svg",
},
{
title: "Komunitas & KSM",
description:
"Memiliki 4 komunitas dan 1 Kelompok Studi Mahasiswa.",
icon: "/assets/beranda/himpunan/iconKomunitas.svg",
},
];
return (
    <section
        id="himpunan"
        className="relative px-4 py-12 sm:px-8 md:py-20 lg:px-16"
    >
        <div className="mx-auto max-w-md">

            {/* Heading */}
        <div className="mb-5 pt-8 text-center">
            <div className="mx-auto mb-7 h-0 w-[280px] border-t border-[#6E6B6B] md:w-[400px] lg:w-[500px]" />
            <h2 className="title4 bg-gradient-to-r from-[#75AEE0] to-[#2675B5] bg-clip-text text-transparent">
                Himpunan Kami
            </h2>
        </div>

            {/* Informasi Himpunan */}
            <div>
                {dataHimpunan.map((item, index) => (
                    <div key={item.title}>

                        <div className="px-3 py-5">

                            {/* Icon dan Judul */}
                            <div className="flex items-center gap-4">

                                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#91C9F5]">

                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />

                                </div>

                                <h3 className="title4 text-xl text-[#303030]">
                                    {item.title}
                                </h3>

                            </div>

                            {/* Deskripsi */}
                            <p className="body2 mt-3 text-[#858585]">
                                {item.description}
                            </p>

                        </div>

                        {/* Divider */}
                        {index !== dataHimpunan.length - 1 && (
                            <div className="border-b border-gray-300" />
                        )}

                    </div>
                ))}
            </div>

        </div>
    </section>
);
}