export interface KomunitasDetail {
  id: string;
  nama: string;
  deskripsi: string;
  fotoBanner: string;
  icon: string;
  titleFontSize?: string;
}

export const DATA_KOMUNITAS: Record<string, KomunitasDetail> = {
  futsal: {
    id: "futsal",
    nama: "Futsal",
    deskripsi:
      "Komunitas Futsal HIMASISFO merupakan merupakan salah satu komunitas mahasiswa yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini dibentuk sebagai ruang bagi mahasiswa Sistem Informasi yang memiliki minat dan bakat di bidang olahraga bola futsal. Komunitas ini bertujuan menyalurkan hobi secara positif, meningkatkan prestasi dan kebugaran jasmani, serta menyeimbangkan kegiatan akademik dan nonakademik. Selain itu, komunitas ini menanamkan nilai sportivitas, disiplin, kerja sama tim, dan solidaritas, serta terbuka bagi seluruh mahasiswa tanpa memandang tingkat kemampuan.",
    fotoBanner: "/assets/beranda/komunitas/futsal.webp",
    icon: "/assets/beranda/komunitas/fa_futbol-o.svg",
    titleFontSize: "96px",
  },
  basket: {
    id: "basket",
    nama: "Basket",
    deskripsi:
      "Komunitas Bola Basket HIMASISFO merupakan salah satu komunitas mahasiswa yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini dibentuk sebagai ruang bagi mahasiswa Sistem Informasi yang memiliki minat dan bakat di bidang olahraga bola basket. Komunitas Basket bertujuan untuk menyalurkan hobi olahraga mahasiswa secara positif sekaligus mengembangkan kemampuan teknis, fisik, dan mental dalam bermain basket. Selain sebagai sarana berolahraga dan menjaga kebugaran, komunitas ini juga berperan dalam membangun sikap sportivitas, disiplin, kerja sama tim, serta rasa solidaritas antaranggota. Melalui berbagai kegiatan rutin dan partisipasi dalam kompetisi, Komunitas Basket HIMASISFO diharapkan mampu menjadi ruang pengembangan diri bagi mahasiswa sekaligus membawa nama baik Program Studi Sistem Informasi di tingkat fakultas maupun universitas.",
    fotoBanner: "/assets/beranda/komunitas/basket.webp",
    icon: "/assets/beranda/komunitas/fluent_sport-basketball-24-regular.svg",
    titleFontSize: "96px",
  },
  badminton: {
    id: "badminton",
    nama: "Badminton",
    deskripsi:
      "Komunitas Badminton HIMASISFO merupakan salah satu komunitas minat dan bakat yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini menjadi wadah bagi mahasiswa Sistem Informasi yang memiliki ketertarikan dan hobi dalam olahraga badminton. Komunitas Badminton secara rutin mengadakan kegiatan latihan bersama dalam suasana yang santai, sportif, dan menyenangkan. Selain sebagai sarana berolahraga dan menjaga kebugaran, komunitas ini juga bertujuan untuk mempererat hubungan antaranggota serta membangun semangat kebersamaan di lingkungan HIMASISFO. Melalui komunitas ini, mahasiswa dapat mengembangkan kemampuan bermain badminton, baik secara teknik maupun mental, serta menyalurkan energi positif sebagai bentuk refreshing dari aktivitas perkuliahan.",
    fotoBanner: "/assets/beranda/komunitas/badminton.webp",
    icon: "/assets/beranda/komunitas/boxicons_shuttlecock.svg",
    titleFontSize: "96px",
  },
  "arak-arakan": {
    id: "arak-arakan",
    nama: "Arak-Arakan",
    deskripsi:
      "Komunitas Arak-Arakan Sistem Informasi merupakan salah satu komunitas yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO. Komunitas ini dibentuk sebagai wadah bagi mahasiswa Sistem Informasi yang memiliki minat dalam bidang dukungan, kreativitas, dan partisipasi aktif pada berbagai kegiatan internal maupun eksternal HIMASISFO. Komunitas Arak-Arakan berdiri sejajar dengan komunitas lain yang ada di HIMASISFO, seperti komunitas futsal, basket, dan bulutangkis. Peran utama komunitas ini adalah memberikan dukungan moral, semangat, dan apresiasi kepada komunitas maupun tim yang sedang mengikuti kegiatan, pertandingan, atau kompetisi. Selain itu, komunitas ini juga terlibat dalam berbagai kegiatan yang berkaitan dengan pengapresiasian, penyambutan, serta penguatan solidaritas antaranggota HIMASISFO, sehingga tercipta rasa kebersamaan dan kekompakan di lingkungan organisasi.",
    fotoBanner: "/assets/beranda/komunitas/arak_arakan.webp",
    icon: "/assets/beranda/komunitas/lucide_drum.svg",
    titleFontSize: "86px",
  },
};
