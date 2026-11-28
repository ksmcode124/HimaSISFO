export interface komunitas {
    slug: string;
    header: string;
    name: string;
    icon: string;
    desc: string;
    achivement?: {
        photos: string;
        name: string;
        date: string;
    }[];
    jersey?: string[];
    dokumentasi: string[];
    links: {
        judul: string;
        desc: string;
        href: string;
    }
}

export const komunitas_list: komunitas[] = [
    {
        slug: 'futsal',
        header: '/assets/komunitas/futsal/foto/header.webp',
        name: 'Komunitas Futsal',
        icon: '/assets/beranda/komunitas/fa_futbol-o.svg',
        desc: 'Komunitas Futsal HIMASISFO merupakan merupakan salah satu komunitas mahasiswa yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini dibentuk sebagai ruang bagi mahasiswa Sistem Informasi yang memiliki minat dan bakat di bidang olahraga bola futsal. Komunitas ini bertujuan menyalurkan hobi secara positif, meningkatkan prestasi dan kebugaran jasmani, serta menyeimbangkan kegiatan akademik dan nonakademik. Selain itu, komunitas ini menanamkan nilai sportivitas, disiplin, kerja sama tim, dan solidaritas, serta terbuka bagi seluruh mahasiswa tanpa memandang tingkat kemampuan.',
        achivement: [{
            photos: '',
            name: '',
            date: '',
        }],
        jersey: ['/assets/komunitas/badminton/jersey/jerseyFutsal.webp'],
        dokumentasi: [
            '/assets/komunitas/futsal/foto/futsal1.webp',
            '/assets/komunitas/futsal/foto/futsal2.webp',
            '/assets/komunitas/futsal/foto/futsal3.webp',
        ],
        links: {
            judul: 'MARI BERGABUNG BERSAMA KAMI',
            desc: 'Kembangkan potensi diri dan temukan wadah kebersamaan',
            href: 'https://chat.whatsapp.com/Ijlxmm7vhRm6dpRaCflNwV',
        },
    },
    {
        slug: 'basket',
        header: '/assets/komunitas/basket/foto/header.webp',
        name: 'Komunitas Basket',
        icon: '/assets/beranda/komunitas/fluent_sport-basketball-24-regular.svg',
        desc: 'Komunitas Bola Basket HIMASISFO merupakan salah satu komunitas mahasiswa yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini dibentuk sebagai ruang bagi mahasiswa Sistem Informasi yang memiliki minat dan bakat di bidang olahraga bola basket. Komunitas Basket bertujuan untuk menyalurkan hobi olahraga mahasiswa secara positif sekaligus mengembangkan kemampuan teknis, fisik, dan mental dalam bermain basket. Selain sebagai sarana berolahraga dan menjaga kebugaran, komunitas ini juga berperan dalam membangun sikap sportivitas, disiplin, kerja sama tim, serta rasa solidaritas antaranggota. Melalui berbagai kegiatan rutin dan partisipasi dalam kompetisi, Komunitas Basket HIMASISFO diharapkan mampu menjadi ruang pengembangan diri bagi mahasiswa sekaligus membawa nama baik Program Studi Sistem Informasi di tingkat fakultas maupun universitas.',
        achivement: [{
            photos: '',
            name: '',
            date: '',
        }],
        jersey: ['/assets/komunitas/badminton/jersey/jerseyBasket.webp'],
        dokumentasi: [
            '/assets/komunitas/basket/foto/basket1.webp',
            '/assets/komunitas/basket/foto/basket2.webp',
            '/assets/komunitas/basket/foto/basket3.webp',
        ],
        links: {
            judul: 'MARI BERGABUNG BERSAMA KAMI',
            desc: 'Kembangkan potensi diri dan temukan wadah kebersamaan',
            href: 'https://chat.whatsapp.com/KY8CqLnEruGHLoP4weLlqt?s=cl&p=i&mlu=4&ilr=4&iam=2',
        },
    },
    {
        slug: 'badminton',
        header: '/assets/komunitas/badminton/foto/header.webp',
        name: 'Komunitas Badminton',
        icon: '/assets/beranda/komunitas/boxicons_shuttlecock.svg',
        desc: 'Komunitas Badminton HIMASISFO merupakan salah satu komunitas minat dan bakat yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini menjadi wadah bagi mahasiswa Sistem Informasi yang memiliki ketertarikan dan hobi dalam olahraga badminton. Komunitas Badminton secara rutin mengadakan kegiatan latihan bersama dalam suasana yang santai, sportif, dan menyenangkan. Selain sebagai sarana berolahraga dan menjaga kebugaran, komunitas ini juga bertujuan untuk mempererat hubungan antaranggota serta membangun semangat kebersamaan di lingkungan HIMASISFO. Melalui komunitas ini, mahasiswa dapat mengembangkan kemampuan bermain badminton, baik secara teknik maupun mental, serta menyalurkan energi positif sebagai bentuk refreshing dari aktivitas perkuliahan.',
        // belum ada kayaknya
        achivement: [{
            photos: '',
            name: '',
            date: '',
        }],
        // ini juga belum ada
        jersey: [''],
        dokumentasi: [
            '/assets/komunitas/badminton/foto/badminton1.webp',
            '/assets/komunitas/badminton/foto/badminton2.webp',
            '/assets/komunitas/badminton/foto/badminton3.webp'
        ],
        links: {
            judul: 'MARI BERGABUNG BERSAMA KAMI',
            desc: 'Kembangkan potensi diri dan temukan wadah kebersamaan',
            href: 'https://chat.whatsapp.com/BOMgZiDPMEa1gIieRH6Ssb',
        },
    },
    {
        slug: 'arak-arakan',
        header: '/assets/komunitas/arakArakan/foto/header.webp',
        name: 'Komunitas Arak-Arakan',
        icon: '/assets/beranda/komunitas/lucide_drum.svg',
        desc: 'Komunitas Arak-Arakan Sistem Informasi merupakan salah satu komunitas yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini dibentuk sebagai wadah bagi mahasiswa Sistem Informasi yang memiliki minat dalam bidang dukungan, kreativitas, dan partisipasi aktif pada berbagai kegiatan internal maupun eksternal HIMASISFO. Komunitas Arak-Arakan berdiri sejajar dengan komunitas lain yang ada di HIMASISFO, seperti komunitas futsal, basket, dan bulutangkis. Peran utama komunitas ini adalah memberikan dukungan moral, semangat, dan apresiasi kepada komunitas maupun tim yang sedang mengikuti kegiatan, pertandingan, atau kompetisi. Selain itu, komunitas ini juga terlibat dalam berbagai kegiatan yang berkaitan dengan pengapresiasian, penyambutan, serta penguatan solidaritas antaranggota HIMASISFO, sehingga tercipta rasa kebersamaan dan kekompakan di lingkungan organisasi.',
        // kosongin aja
        achivement: [{
            photos: '',
            name: '',
            date: '',
        }],
        jersey: [''],
        dokumentasi: [
            '/assets/komunitas/arakArakan/foto/arak1.webp',
            '/assets/komunitas/arakArakan/foto/arak2.webp',
            '/assets/komunitas/arakArakan/foto/arak3.webp'
        ],
        links: {
            judul: 'MARI BERGABUNG BERSAMA KAMI',
            desc: 'Kembangkan potensi diri dan temukan wadah kebersamaan',
            href: 'https://chat.whatsapp.com/DaIkHTdZKWL7ncSpXcUkDB',
        },
    },
];

export const get_komunitas = (slug: string) =>
    komunitas_list.find((k) => k.slug === slug);