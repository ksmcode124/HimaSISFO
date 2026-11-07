import { cn } from '@/lib/utils';
import Image from 'next/image';

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
        desc: 'Mewujudkan Himpunan Sistem Informasi yang responsif dan mampu memperjuangkan aspirasi mahasiswa/i serta menjadi wadah pengembangan potensi, baik secara akademik maupun non-akademik, melalui penguatan fondasi internal organisasi.',
    },
    {
        id: 'misi',
        title: 'Misi',
        desc: [
            'Membangun sistem kerja internal yang profesional dan kolaboratif melalui penyelarasan tugas dan fungsi, penguatan koordinasi antar-departemen, serta penerapan manajemen organisasi yang efektif dan transparan.',
            'Meningkatkan kedekatan dan keterhubungan himpunan dengan mahasiswa/i Sistem Informasi melalui penguatan peran advokasi serta kajian isu kampus guna memperjuangkan kebutuhan dan aspirasi mahasiswa.',
            'Menyediakan wadah pengembangan diri bagi mahasiswa/i melalui penyelenggaraan kegiatan akademik serta menjalin kerja sama dengan Program Studi Sistem Informasi dalam rangka mendukung peningkatan kualitas akademik mahasiswa.',
            'Mendorong pengembangan potensi non-akademik mahasiswa/i Program Studi Sistem Informasi melalui fasilitasi minat dan bakat serta kegiatan kreatif yang berorientasi pada peningkatan daya inovatif.',
        ],
    },
];

/* data carousel (sampingnya misi) */ 
const carousel_rows: {
    id: string;
    direction: 'left' | 'right';
    duration: string;
    photos: { src: string; alt: string }[];
}[] = [
    {
        id: 'row_1',
        direction: 'left',
        duration: '20s',
        photos: [
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 1' },
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 2' },
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 3' },
        ],
    },
    {
        id: 'row_2',
        direction: 'right',
        duration: '20s',
        photos: [
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 4' },
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 5' },
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 6' },
        ],
    },
    {
        id: 'row_3',
        direction: 'left',
        duration: '13s',
        photos: [
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 7' },
            { src: `${base_visi_misi}/cobafoto.webp`, alt: 'Kegiatan himpunan 8' },
        ],
    },
];

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

            {/* batas antara profil dan vismis */}
             <hr className="mt-14 border-t border-primary-blue-dark/20 md:mt-[92px]" />

            {/* bagian visi misi mulai dari sini */}
            <div className="mt-10 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#C8D8F0] via-[#D8D8F4] to-[#E8E0F8] md:mt-14">

                {visi_misi.map((item) => (
                    <div key={item.id}>

                        {item.id === 'visi' && (
                            <div className="grid grid-cols-1 md:grid-cols-2">

                                {/* teks visi */}
                                <div className="flex flex-col gap-[3px] px-[60px] pt-9 pb-8 text-center md:gap-6 md:px-14 md:py-14 md:text-left">
                                    <h2 className="bg-linear-to-r from-[#5B93C6] via-[#145A92] to-[#5B93C6] bg-clip-text text-[32px] font-bold text-transparent md:text-[40px]">
                                        {item.title}
                                    </h2>
                                    <p className="body3 text-justify leading-relaxed text-primary-blue-dark md:body2">
                                        {item.desc as string}
                                    </p>
                                </div>

                                {/* foto visi di desktop */}
                                <div className="relative hidden min-h-[548px] w-full overflow-hidden rounded-tr-3xl md:block">
                                    <Image
                                        src={`${base_visi_misi}/cobafoto.webp`}
                                        alt="Foto kegiatan himpunan — Visi"
                                        fill
                                        className="object-cover"
                                        sizes="50vw"
                                    />
                                </div>
                            </div>
                        )}

                        
                        {item.id === 'misi' && (
                            <>
                                {/* batas antara visi dan misi */}
                                <hr className="border-t border-primary-blue-dark/10" />

                                <div className="grid grid-cols-1 md:grid-cols-2">

                                    {/* teks misi */}
                                    <div className="order-first flex flex-col gap-2 px-[60px] pt-9 pb-8 text-center md:order-last md:gap-6 md:px-14 md:py-14 md:text-left">
                                        <h2 className="bg-linear-to-r from-[#5B93C6] via-[#145A92] to-[#5B93C6] bg-clip-text text-[32px] font-bold text-transparent md:text-[40px]">
                                            {item.title}
                                        </h2>

                                        {/* setting list misi agar selalu rata kiri */}
                                        <ol className="flex flex-col gap-2 text-left md:gap-4">
                                            {(item.desc as string[]).map((poin, idx) => (
                                                <li key={idx} className="flex gap-3 text-primary-blue-dark">
                                                    <span className="body3 shrink-0 font-semibold md:body2">
                                                        {idx + 1}.
                                                    </span>
                                                    <p className="body3 text-justify leading-relaxed md:body2">
                                                        {poin}
                                                    </p>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    {/* setting carousel */}
                                     <div className="order-last overflow-hidden p-5 md:order-first">
                                        <div className="flex flex-col gap-2">
                                            {carousel_rows.map((row) => (
                                                <div key={row.id} className="overflow-hidden">
                                                    <div
                                                        className="flex gap-2"
                                                        style={{
                                                            animation: `marquee_${row.direction} ${row.duration} linear infinite`,
                                                        }}
                                                    >
                                                        {/* untuk duplikasi array foto */}
                                                        {[...row.photos, ...row.photos].map((foto, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="relative h-[128px] w-[170px] shrink-0 overflow-hidden rounded-xl"
                                                            >
                                                                <Image
                                                                    src={foto.src}
                                                                    alt={foto.alt}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="170px"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </>
                        )}

                    </div>
                ))}

            </div>

        </section>
    );
}