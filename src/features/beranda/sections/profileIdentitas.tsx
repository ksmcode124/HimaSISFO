import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const base = '/assets/beranda/profileIdentitas';

const items = [
    {
        id: 'persegi',
        icon: `${base}/kotak_merah.svg`,
        title: 'Persegi Berwarna Merah',
        desc: 'Melambangkan entitas yang kokoh, berani, dan terstruktur.',
        desktop: 'md:col-start-1 md:row-start-1',
        align: '',
    },
    {
        id: 'warna',
        icon: `${base}/warna_logo.svg`,
        title: 'Warna Biru Tua dan Biru Muda',
        desc: 'Melambangkan keseimbangan esensial antara hardskill dan teknologi (biru navy) dengan soft skill (biru muda).',
        desktop: 'md:col-start-1 md:row-start-3 md:pl-[30px]',
        align: '',
    },
    {
        id: 'si',
        icon: `${base}/tulisan_SI.svg`,
        title: 'Huruf Inisial SI',
        desc: 'Lambang Sistem Informasi UPN "Veteran" Yogyakarta',
        desktop: 'md:col-start-3 md:row-start-1',
        align: 'md:justify-self-end',
    },
    {
        id: 'usb',
        icon: `${base}/clarity_usb-solid.svg`,
        title: 'USB Mengelilingi Persegi',
        desc: 'Simbol konektor universal yang menghadap keluar ini merepresentasikan bahwa Sistem Informasi membangun relasi yang bersifat universal dan terbuka.',
        desktop: 'md:col-start-3 md:row-start-3 md:pr-10',
        align: 'md:justify-self-end',
    },
];

const line = 'absolute border-primary-blue-dark';
const dot =
    "before:absolute before:size-3 before:rounded-full before:bg-primary-blue-dark before:content-['']";

/* asset visi misi */
const base_visi_misi = '/assets/beranda/visiMisi';

const visi_misi: { id: string; title: string; desc: string | string[] }[] = [
    {
        id: 'visi',
        title: 'Visi',
        desc: 'Mewujudkan himpunan yang harmonis dan berdaya saing dengan menjunjung tinggi nilai kekeluargaan serta keseimbangan antara kerja dan istirahat.',
    },
    {
        id: 'misi',
        title: 'Misi',
        desc: [
            'Mengimprovisasi pelaksanaan program agar lebih relevan dan optimal.',
            'Menyediakan pelayanan yang responsif terhadap kebutuhan akademik, non-akademik, dan aspirasi mahasiswa.',
            'Membuka ruang partisipasi aktif bagi seluruh mahasiswa.',
            'Membangun kolaborasi aktif dengan program studi.',
            'Mengembangkan soft skill dan hard skill mahasiswa Sistem Informasi.'
        ],
    },
];

const carousel_rows = [
    // ke kiri: A (margin kiri 10) -> B (foto 2 mulai di -7, kanan kosong)
    { id: 'row_1', sources: ['1-atas.webp', '2-atas.webp', '3-atas.webp'], from: '10px', to: '-240px', duration: '9s', widths: [227, 226, 214] },
    // ke kanan: A (foto 2 mulai di 10) -> B (foto 1 mulai di 34, kiri kosong)
    { id: 'row_2', sources: ['1-tengah.webp', '2-tengah.webp', '3-tengah.webp'], from: '-195px', to: '34px', duration: '9s', widths: [199, 233, 226] },
    // ke kiri, hanya 2 foto: A (menjorok 77) -> B (kanan kosong)
    { id: 'row_3', sources: ['arak2an.webp', '2-bawah.webp'], from: '77px', to: '-7px', duration: '9s', widths: [226, 226] },
].map((row) => ({
    ...row,
    photos: row.widths.map((width, i) => ({
        src: `${base_visi_misi}/${row.sources[i]}`,
        alt: `Kegiatan himpunan ${row.id}-${i + 1}`,
        width,
    })),
}));

/* class judul visi misi */
const judul = 'text-center text-[32px] font-bold leading-tight text-[#3B7BB8] md:text-[40px]';

const garis =
    "mx-auto h-0 w-[calc(100%-1.5rem)] border-t border-[#6E6B6B] md:w-[calc(100%-1.5rem)] xl:w-[894px]";

export default function ProfileIdentitas() {
    return (
        <section className='mx-auto w-full max-w-[1055px] px-4 py-0 md:pt-[68px]'>
            <h1 className="mx-auto mb-8 w-fit bg-linear-to-r from-[#5B93C6] via-[#145A92] to-[#5B93C6] bg-clip-text pb-1 text-[28px] text-transparent md:mb-14 md:text-[44px]">
                Profile & Identitas
            </h1>

            <div className='grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-[1fr_auto_1fr] md:gap-x-0 md:gap-y-0'>
                {/* ini buat logo mobile */}
                <div className="col-span-2 flex justify-center md:col-span-1 md:col-start-2 md:row-start-2 md:px-10">
                    <Image
                        src="/assets/shared/logos/logo-himasisfo.webp"
                        alt='Logo Sistem Informasi'
                        width={300}
                        height={300}
                        className='size-40 md:size-[300px]'
                        priority
                    />
                </div>

                {items.map((item) => (
                    <article
                        key={item.id}
                        className={cn('flex flex-col gap-3 md:max-w-[316px]', item.desktop, item.align)}
                    >
                        <div className="flex items-center gap-3 md:gap-8">
                            <Image src={item.icon} alt="" width={75} height={60} className="h-12 w-auto md:h-[60px]" />
                            <h3 className="text-sm font-bold text-primary-blue-dark md:text-lg">{item.title}</h3>
                        </div>
                        <p className="body4 text-justify text-primary-blue-dark md:body3">{item.desc}</p>
                    </article>
                ))}

                {/* line kiri */}
                <div aria-hidden className="relative hidden md:col-start-1 md:row-start-2 md:block">
                    {/* kiri atas */}
                    <span className={cn(line, dot,
                        'left-[149px] right-0 top-[7%] bottom-[62%] border-b-[3px] border-l-[3px] before:-left-[7.5px] before:-top-1.5')} />
                    {/* kiri bawah */}
                    <span className={cn(line, dot,
                        'left-[208px] right-0 top-[66%] bottom-[3%] border-l-[3px] border-t-[3px] before:-bottom-1.5 before:-left-[7.5px]')} />
                </div>

                {/* line kanan */}
                <div aria-hidden className="relative hidden md:col-start-3 md:row-start-2 md:block">
                    {/* kanan atas */}
                    <span className={cn(line, dot,
                        'left-0 right-[173px] top-[14%] bottom-[55%] border-b-[3px] border-r-[3px] before:-right-[7.5px] before:-top-1.5')} />
                    {/* kanan bawah */}
                    <span className={cn(line, dot,
                        'left-0 right-[196px] top-[70%] bottom-0 border-r-[3px] border-t-[3px] before:-bottom-1.5 before:-right-[7.5px]')} />
                </div>
            </div>

            {/* bagian visi misi mulai dari sini */}
            <div className="relative mt-10 w-full md:mt-[74px]">
                {/* warna ungu di tengah */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#C9D6FA] via-[#CDB9F8] to-[#C9D6FA] opacity-70 md:block md:h-[620px] md:w-[85%] md:blur-[90px]"
                />

                {/* jarak visi dan misi*/}
                <div className="relative z-10 flex flex-col gap-9 md:gap-[92px]">
                    {visi_misi.map((item) => (
                        <div key={item.id}>
                            {/* visi */}
                            {item.id === 'visi' && (
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* teks visi */}
                                    <div className="mx-auto flex w-full max-w-[269px] flex-col gap-[3px] pt-9 md:mx-0 md:max-w-[350px] md:gap-0 md:pt-0">
                                        <h1 className={judul}>{item.title}</h1>
                                        <div className="md:flex md:flex-1 md:items-center">
                                            <p className="body3 font-medium text-justify leading-relaxed md:title3 md:font-medium md:text-[24px] md:text-left">
                                                {item.desc as string}
                                            </p>
                                        </div>
                                    </div>

                                    {/* foto visi untuk desktop */}
                                    <div className="relative hidden h-[548px] w-full max-w-[501px] justify-self-end overflow-hidden rounded-[52px] md:block">
                                        <Image
                                            src={`${base_visi_misi}/arak2an.webp`}
                                            alt="Foto kegiatan himpunan — Visi"
                                            fill
                                            className="object-cover object-[100%_center]"
                                            sizes="(min-width: 768px) 501px, 100vw"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* misi */}
                            {item.id === 'misi' && (
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
                                    {/* teks misi */}
                                    <div className="order-first mx-auto flex w-full max-w-[269px] flex-col gap-[3px] md:order-last md:mx-0 md:min-h-[444px] md:max-w-[400px] md:justify-self-end md:gap-[39px]">
                                        <h2 className={judul}>{item.title}</h2>
                                        <div className="md:flex md:flex-1 md:items-center">
                                            <ol className="flex flex-col gap-2 text-left">
                                                {(item.desc as string[]).map((poin, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="body3 shrink-0 font-medium md:title4">
                                                            {idx + 1}.
                                                        </span>
                                                        <p className="body3 font-medium text-justify leading-relaxed md:title4 md:font-medium md:text-left">
                                                            {poin}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                    {/* setting carousel  */}
                                    <div className="order-last -mx-4 flex justify-center overflow-hidden md:order-first md:mx-0 md:ml-5 md:block md:self-center md:w-full md:max-w-[482px]">
                                        {/* frame carousel, isinya kepotong di sini */}
                                        <div className="flex h-[444px] w-[482px] shrink-0 flex-col gap-1.5 overflow-hidden md:w-full">
                                            {carousel_rows.map((row) => (
                                                /* container-type biar animasi tahu lebar frame */
                                                <div
                                                    key={row.id}
                                                    className='overflow-hidden'
                                                >
                                                    <div
                                                        className="slide_track flex w-max gap-1.5 hover:[animation-play-state:paused]"
                                                        style={{
                                                            '--from': row.from,
                                                            '--to': row.to,
                                                            '--dur': row.duration,
                                                        } as React.CSSProperties
                                                        }
                                                    >
                                                        {row.photos.map((foto, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="relative h-[144px] shrink-0 overflow-hidden rounded-[26px]"
                                                                style={{ width: foto.width }}
                                                            >
                                                                <Image
                                                                    src={foto.src}
                                                                    alt={foto.alt}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes={`${foto.width}px`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* batas setelah visi misi */}
            <div className="col-span-full mt-8 md:mt-12 xl:mt-[72px]">
                <div className={garis} />
            </div>
        </section >
    );
}