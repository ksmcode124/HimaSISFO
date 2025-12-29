import HeroBeranda from "@/components/beranda/hero";
import { Bookmark, Calendar } from "lucide-react";

export default function Page() {
  return <>
    <HeroBeranda />
    <Pita />
    <div className="h-screen bg-blue-200"></div>
    <Pita />
    <Sejarah />
    <Informasi />
  </>
}

function Pita() {
  return <div className="relative">
    <img src="/assets/beranda/pita.png" className="-mt-10 sm:-mt-15 md:-mt-20 w-full absolute" alt="" />
  </div>
}

function Sejarah() {
  return <div className="grid lg:grid-cols-2 my-60 mx-16 gap-8 relative">
    <img className="w-full" src="/assets/beranda/sejarah.png" alt="" />
    <div className="flex flex-col gap-10">
      <h2 className="text-4xl font-bold">SEJARAH <br /> HIMASISFO</h2>
      <p className="text-sm text-justify"> Sejarah Himpunan Mahasiswa Sistem Informasi (HIMASISFO) tidak dapat dipisahkan dari riwayat berdirinya Program  Sistem Informasi itu sendiri di Universitas Pembangunan Nasional "Veteran" Yogyakarta. Prodi S1 Sistem Informasi  secara resmi didirikan berdasarkan Surat Keputusan Pendirian Program Studi nomor 82/KPT/I/2016. Berbekal  hal tersebut, UPN "Veteran" Yogyakarta membuka penerimaan mahasiswa baru untuk pertama kalin pada tahun 2017. Proses perumusan organisasi ini dimotori oleh tujuh mahasiswa dari angkatan 2017 yaitu: Azyumardi Azra, Lintang Hakimi, Fagil Arya Baskoro, Daffa Aulia Zakharia, Fairuz Akmal Lanang, Brilliant Hanif Almubarak, dan Naufal Fakhri. Setelah melalui serangkaian diskusi dan proses perumusan yang intensif, Himpunan Mahasiswa Program Studi Sistem Informasi, yang kemudian disingkat menjadi HIMASISFO, secara resmi diresmikan pada hari Jumat, tanggal 16 November 2018. Tanggal ini menjadi tonggak sejarah yang menandai lahirnya sebuah institusi kemahasiswaan yang dibangun dari nol oleh para perintisnya.</p>
    </div>
    <div className="absolute -bottom-20 flex gap-8 justify-end w-full right-20">
      <div className="rounded-4xl w-sm border-gray-400 p-10 border bg-white">
        <span className="text-xl font-semibold">Est.2017</span>
        <p className="text-sm">Program studi yang berdiri sejak 2017 di UPN “Veteran” Yogyakarta</p>
      </div>
      <div className="rounded-4xl w-sm border-gray-400 p-10 border bg-white">
        <span className="text-xl font-semibold">1000+</span>
        <p className="text-sm">Memiliki lebih dari 1000 lulusan dan mahasiswa aktif hingga saat ini.</p>
      </div>
    </div>
  </div>
}

function Informasi() {
  return <div className="flex items-center flex-col justify-center">
    <h2 className="text-4xl font-bold">Informasi Terbaru</h2>
    <div className="flex">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-80 h-80 bg-white m-8 rounded-2xl shadow-lg p-4">
          <img src="/assets/beranda/informasi.png" alt="" className="w-full aspect-video bg-accent rounded-xl" />
          <div className="mt-4">
            <div className="flex">
              <span className="text-sm text-gray-500"><Calendar />12 Maret 2024</span>
              <span className="text-sm text-gray-500 ml-auto"><Bookmark /> Lomba</span>
            </div>
            <h3 className="font-semibold text-lg">Judul Informasi {i + 1}</h3>
            <p className="text-sm mt-2">Ringkasan singkat tentang informasi terbaru yang disajikan di sini.</p>
          </div>
        </div>
      ))}
    </div>
  </div>
}