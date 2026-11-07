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
        </section>
    );
}