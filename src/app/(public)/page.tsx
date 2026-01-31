import HeroBeranda from "@/features/beranda/sections/hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScaleCarousel } from "@/components/ui/scale-carousel";
import { cn } from "@/lib/utils";
import { ArrowRight, Bookmark, Calendar } from "lucide-react";
import Vision from "@/features/beranda/sections/vision";
import History from "@/features/beranda/sections/history";
import Information from "@/features/beranda/sections/information";
import Kabinet from "@/features/beranda/sections/kabinet";
import Spotify from "@/features/beranda/sections/spotify";
import Awan from "@/features/beranda/components/awan";
import Pita from "@/components/beranda/pita";

const data = {
  "hero": {
    "title": "Selamat Datang di HIMASISFO",
    "description": "Organisasi kemahasiswaan yang bergerak di bidang eksekutif yang ada pada Program Studi Sistem Informasi Universitas Pembangunan Nasional \"Veteran\" Yogyakarta",
    "images_carousel": [
      "image_hero_1.jpg",
      "image_hero_2.jpg",
      "image_hero_3.jpg"
    ]
  },

  "visi_misi": {
    "visi": "Mewujudkan himpunan yang harmonis dan berdaya saing dengan menjunjung tinggi nilai kekeluargaan dan keseimbangan antara kerja dan istirahat",
    "misi": [
      "Mengimprovisasi pelaksanaan beberapa program agar lebih relevan dan optimal",
      "Menyediakan pelayanan yang responsif terhadap kebutuhan akademik, non-akademik, dan aspirasi mahasiswa",
      "Membuka ruang partisipasi aktif yang lebih luas bagi seluruh mahasiswa untuk terlibat aktif dalam kegiatan himpunan",
      "Membangun kolaborasi aktif dengan program studi untuk menyelaraskan kegiatan himpunan dengan visi akademik yang mendukung pengembangan mahasiswa",
      "Mengembangkan soft skill dan hard skill mahasiswa sistem informasi untuk mendukung kinerja organisasi dan pengembangan diri yang berkelanjutan"
    ],
    "tujuan": "HIMASISFO menampung seluruh elemen mahasiswa Program Studi Sistem Informasi Jurusan Informatika Fakultas Teknik Industri Universitas Pembangunan Nasional \"Veteran\" Yogyakarta menuju kehidupan kampus kritis yang bertanggung jawab, dinamis, demokratis, dan harmonis.",
  },


  "sejarah": {
    "title": "Sejarah HIMASISFO",
    "image_url": "image_sejarah.jpg",
    "content": "Sejarah Himpunan Mahasiswa Sistem Informasi (HIMASISFO) tidak dapat dipisahkan dari riwayat berdirinya Program Sistem Informasi di Universitas Pembangunan Nasional \"Veteran\" Yogyakarta. Prodi S1 Sistem Informasi secara resmi didirikan berdasarkan Surat Keputusan Pendirian Program Studi nomor 82/KPT/I/2016. UPN \"Veteran\" Yogyakarta mulai menerima mahasiswa baru pada tahun 2017. Proses perumusan organisasi dimotori oleh tujuh mahasiswa angkatan 2017: Azyumardi Azra, Lintang Hakimi, Fagil Arya Baskoro, Daffa Aulia Zakharia, Fairuz Akmal Lanang, Brilliant Hanif Almubarak, dan Naufal Fakhri. Setelah melalui proses diskusi dan perumusan intensif, HIMASISFO resmi diresmikan pada Jumat, 16 November 2018.",
  },

  "statistics": [
    {
      "label": "Est. 2017",
      "description": "Program studi yang berdiri sejak 2017 di UPN \"Veteran\" Yogyakarta"
    },
    {
      "label": "1000+",
      "description": "Memiliki lebih dari 1000 lulusan dan mahasiswa aktif hingga saat ini"
    }
  ],

  "informasi_terbaru": {
    "title": "Informasi Terbaru",
    "items": [
      {
        "title": "Judul Pengumuman",
        "date": "2025-05-11",
        "category": "Beasiswa",
        "image_url": "image_pengumuman.jpg",
        "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        "title": "Judul Pengumuman",
        "date": "2025-05-11",
        "category": "Beasiswa",
        "image_url": "image_pengumuman.jpg",
        "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        "title": "Judul Pengumuman",
        "date": "2025-05-11",
        "category": "Beasiswa",
        "image_url": "image_pengumuman.jpg",
        "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }
    ]
  },

  "kabinet": [
    {
      "name": "Kabinet Gelora Harmoni",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image_url": "image_kabinet_1.jpg"
    },
    {
      "name": "Kabinet 2",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image_url": "image_kabinet_2.jpg"
    },
    {
      "name": "Kabinet 3",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image_url": "image_kabinet_3.jpg"
    },
  ],

  "behind_the_web": {
    "section_title": "Behind The Web",
    "author": "CODE124",
    "image_url": "image_behind_the_web.jpg"
  },
  "spotify": [
    {
      "title": "S2 Eps. 2: Maba 25 problematik??",
      "date": "2025-06-30",
      "images_carousel": [
        "image_media_1.jpg",
        "image_media_2.jpg"
      ]
    }
  ]
}


export default function Page() {
  return <div className="max-w-screen">
    <HeroBeranda />
    {/* <Pita /> */}
    <Vision />
    {/* <Pita /> */}
    <History />
    <Information />
    <Awan className="py-50" variant={'head'} />
    <Kabinet />
    <Graphics />
    <BehindTheWeb />
    <Spotify />
  </div>
}

function Graphics() {
  return <div className="min-h-screen -mt-10">
    <div className="flex items-center justify-center w-full h-full">
      <img src="/assets/beranda/web-prodi.png" className="w-full" alt="" />
    </div>
    <Awan variant={'tail'} className="-mt-20 -z-1" />
  </div>
}

function BehindTheWeb() {
  return <div className="min-h-screen relative grid w-screen aspect-16/10 text-white bg-center items-end mb-30 bg-[url(/assets/beranda/code124-bg.png)] bg-cover mt-30">
    <div className="flex flex-col h-full justify-end items-start py-40 px-16">
      <p>Behind The Web</p>
      <div className="flex justify-between w-full items-center">
        <span className="text-[128px]">CODE124</span>
        <Button>Selengkapnya <ArrowRight /></Button>
      </div>
    </div>
    <Pita className="top-0 -mt-30 block" />
    <Pita className="-bottom-30 absolute z-3" />
    <img src="/assets/beranda/spotify-wave.svg" className="absolute w-full top-120 md:top-100 lg:top-0 z-1" alt="" />
  </div>
}

function Footer() {
  return <img src={'/assets/beranda/footer.png'} className="w-screen" />
}