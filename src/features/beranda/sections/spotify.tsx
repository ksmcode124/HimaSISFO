"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Episode = {
  id: string;
  episode: string; // contoh: "Eps 4 :"
  title: string;
  description: string;
  cover: string;
  spotify_url: string; // link episode (tombol play)
  follow_url: string; // link "Ikuti Kami"
};

// GANTI dengan data episode kamu (nanti bisa dipindah ke berandaData / API)
const episodes: Episode[] = [
  {
    id: "eps_4",
    episode: "Eps 4 :",
    title: "Katanya “Semester Ganjil, Semester Keramat ?!” Mangyea?",
    description:
      "Hai, apa kabar kamu di semester ini? Semoga masih semangat yaa di tengah gempuran projek akhir. Buat kamu yang lagi butuh semangat, episode ini cocok buat jadi teman belajar kamu.",
    cover: "/assets/beranda/spotify/eps-4.webp",
    spotify_url: "https://open.spotify.com/",
    follow_url: "https://open.spotify.com/",
  },
  {
    id: "eps_3",
    episode: "Eps 3 :",
    title: "Judul episode ketiga",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    cover: "/assets/beranda/spotify/eps-3.webp",
    spotify_url: "https://open.spotify.com/",
    follow_url: "https://open.spotify.com/",
  },
  {
    id: "eps_2",
    episode: "Eps 2 :",
    title: "Judul episode kedua",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    cover: "/assets/beranda/spotify/eps-2.webp",
    spotify_url: "https://open.spotify.com/",
    follow_url: "https://open.spotify.com/",
  },
];

// Durasi animasi ganti episode (harus sama dengan duration-300 di bawah)
const TRANSITION_MS = 300;

export default function Spotify() {
  const [index, setIndex] = useState(0);
  const current = episodes[index];

  // phase "out": cover transparan + piringan geser ke kiri.
  // Setelah durasi selesai, episode diganti lalu kembali "idle"
  // (cover baru muncul + piringan kembali ke posisi semula).
  const [phase, setPhase] = useState<"idle" | "out">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const change = (step: 1 | -1) => {
    if (phase === "out") return; // abaikan klik saat animasi berjalan
    setPhase("out");
    timer.current = setTimeout(() => {
      setIndex((i) => (i + step + episodes.length) % episodes.length);
      setPhase("idle");
    }, TRANSITION_MS);
  };

  const prev = () => change(-1);
  const next = () => change(1);

  // Mobile (Figma): jarak frame (termasuk kartu putih) ke tepi section =
  // kanan 31px, bawah 64px. Kartu putih menonjol 13px (kanan) dan 30px
  // (bawah), jadi padding = 31-13 = 18px dan 64-30 = 34px.
  // Desktop (Figma): jarak frame (termasuk kartu putih) ke tepi section =
  // kanan 100px, bawah 133px. Kartu putih sudah menonjol 26px (kanan) dan
  // 24px (bawah), jadi padding = 100-26 = 74px dan 133-24 = 109px.
  return (
    <section
      id="spotify"
      className="pb-[34px] pr-[18px] pt-12 sm:pr-8 md:py-20 lg:pb-[109px] lg:pr-[74px]"
    >
      <div className="relative w-full max-w-[1516px]">
        {/* Kartu putih/abu-abu di belakang (offset kanan-bawah).
            Desktop (Figma): 1351x407 = mulai 79px dari atas & 191px dari kiri kartu hijau,
            menonjol 26px ke kanan dan 24px ke bawah */}
        <div
          aria-hidden="true"
          className="absolute -bottom-[30px] -right-[13px] left-0 top-[100px] rounded-l-none rounded-tr-2xl rounded-br-[96px] bg-[#F1F1F1] shadow-md md:bottom-0 md:right-0 md:top-0 md:translate-x-4 md:translate-y-4 lg:-bottom-[24px] lg:left-[191px] lg:-right-[26px] lg:top-[79px] lg:translate-x-0 lg:translate-y-0"
        />

        {/* Kartu hijau utama */}
        <div className="relative flex flex-col gap-0 overflow-hidden rounded-l-none rounded-tr-2xl [--cover:min(calc((100vw_-_18px)*0.5),240px)] md:[--cover:220px] lg:[--cover:309px] rounded-br-[96px] bg-linear-to-b from-[#1DB954] to-[#0E5E2A] pb-[9%] pl-[7%] pr-[12.4%] pt-[6.2%] text-white md:flex-row md:items-center md:gap-10 md:rounded-br-[96px] md:p-8 lg:h-[462px] lg:px-12 lg:py-10">
          {/* Logo Spotify */}
          <Image
            src="/assets/beranda/spotify/spotify_logo.svg"
            alt="Spotify"
            width={89}
            height={27}
            className="h-[27px] w-[89px] object-contain object-left md:absolute md:right-8 md:top-6 md:h-7 md:w-auto"
          />

          {/* Cover + piringan hitam + tombol prev/next */}
          <div className="mb-[10px] mt-[17px] flex shrink-0 justify-center md:my-0 md:justify-start md:py-[13.5px]">
            <div className="relative mr-[calc(var(--cover)*0.346)] size-[var(--cover)] md:mr-[calc(var(--cover)*0.485)]">
              {/* Piringan: pakai gambar asset, 300px (97% dari cover 309px).
                  Pusatnya tepat di tepi kanan cover, jadi separuh tertutup
                  cover dan separuh terlihat. Berputar pelan. */}
              {/* Piringan: wrapper luar = geser ke kiri saat ganti episode,
                  div dalam = berputar terus. Dipisah supaya dua transform
                  tidak saling menimpa. */}
              <div
                aria-hidden="true"
                className={`absolute left-[46%] top-[6%] size-[89%] md:left-[51.5%] md:top-[1.5%] md:size-[97%] transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                  phase === "out" ? "-translate-x-[14%]" : "translate-x-0"
                }`}
              >
                <div className="size-full animate-[spin_6s_linear_infinite] overflow-hidden rounded-full motion-reduce:animate-none">
                  <Image
                    src="/assets/beranda/spotify/piringan_1.webp"
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Cover */}
              <div
                className={`relative z-10 size-full overflow-hidden rounded-xl shadow-lg transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
                  phase === "out" ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  key={current.id}
                  src={current.cover}
                  alt={`Cover ${current.episode} ${current.title}`}
                  fill
                  sizes="309px"
                  className="object-cover"
                />
              </div>

              {/* Prev */}
              <button
                type="button"
                onClick={prev}
                aria-label="Episode sebelumnya"
                className="absolute left-0 top-1/2 z-20 flex size-[calc(var(--cover)*0.285)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2b2b2b] text-white transition-colors hover:bg-[#1f1f1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-10"
              >
                <ChevronLeft className="size-6 md:size-5" />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={next}
                aria-label="Episode berikutnya"
                className="absolute right-0 top-1/2 z-20 flex size-[calc(var(--cover)*0.285)] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#2b2b2b] text-white transition-colors hover:bg-[#1f1f1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-10"
              >
                <ChevronRight className="size-6 md:size-5" />
              </button>
            </div>
          </div>

          {/* Teks + aksi */}
          <div className="flex min-w-0 flex-1 flex-col gap-[10px] md:gap-3 md:pr-24 lg:pr-[160px]">
            {/* aria-live supaya pembaca layar tahu isi berganti */}
            <div aria-live="polite" className="flex flex-col gap-2">
              <p className="body2 md:text-lg">SI Dengar</p>

              <h2 className="font-heading text-xl font-bold leading-[30px] md:text-3xl md:leading-tight">
                {current.episode} {current.title}
              </h2>

              <p className="line-clamp-5 text-justify text-[13px] leading-[17px] text-white/90 md:line-clamp-3 md:text-sm md:leading-5">
                {current.description}
              </p>
            </div>

            <div className="flex items-center gap-[21px] md:gap-3">
              <a
                href={current.follow_url}
                target="_blank"
                rel="noopener noreferrer"
                className="h4 flex items-center justify-center rounded-xl bg-white px-10 py-3 text-black transition-colors hover:bg-white/85 md:rounded-lg md:px-5 md:py-2 md:text-sm md:font-semibold"
              >
                Ikuti Kami
              </a>

              {/* Tombol play: tampil di sebelah tombol (mobile),
                  pojok kanan bawah (desktop).
                  Figma desktop: bulatan 120.75px, ikon 53.67px,
                  jarak bawah 48.12px, jarak kanan 69.88px (95.88 - 26px
                  tonjolan kartu putih) dari tepi kartu hijau. */}
              <a
                href={current.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Putar ${current.episode} ${current.title} di Spotify`}
                className="flex size-[calc(var(--cover)*0.39)] shrink-0 items-center justify-center rounded-full bg-white/35 text-black transition-colors hover:bg-white/50 md:absolute md:bottom-8 md:right-10 md:size-20 lg:bottom-[48.12px] lg:right-[69.88px] lg:size-[120.75px]"
              >
                {/* Segitiga solid bersudut tajam (tanpa stroke, jadi tidak ada lengkungan) */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-[calc(var(--cover)*0.17)] md:size-9 lg:size-[53.67px]"
                >
                  <polygon points="5,2 22,12 5,22" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}