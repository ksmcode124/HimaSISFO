"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

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

export default function Spotify() {
  const [index, setIndex] = useState(0);
  const current = episodes[index];

  const prev = () =>
    setIndex((i) => (i - 1 + episodes.length) % episodes.length);
  const next = () => setIndex((i) => (i + 1) % episodes.length);

  return (
    <section id="spotify" className="py-12 pr-6 sm:pr-8 md:py-20 lg:pr-16">
      <div className="relative w-full">
        {/* Kartu abu-abu di belakang (offset kanan-bawah) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-3 translate-y-3 rounded-l-none rounded-tr-2xl rounded-br-[64px] bg-[#F1F1F1] shadow-md md:translate-x-4 md:translate-y-4 md:rounded-br-[96px]"
        />

        {/* Kartu hijau utama */}
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-l-none rounded-tr-2xl rounded-br-[64px] bg-linear-to-b from-[#1DB954] to-[#0E5E2A] p-5 text-white md:flex-row md:items-center md:gap-10 md:rounded-br-[96px] md:p-8 lg:px-12 lg:py-10">
          {/* Logo Spotify */}
          <Image
            src="/assets/beranda/spotify/spotify_logo.svg" // sesuaikan nama file
            alt="Spotify"
            width={84}
            height={25}
            className="h-6 w-auto md:absolute md:right-8 md:top-6 md:h-7"
          />

          {/* Cover + piringan hitam + tombol prev/next */}
          <div className="flex shrink-0 justify-center md:justify-start">
            <div className="relative mr-[81px] size-[130px] md:mr-[130px] md:size-[210px]">
              {/* Piringan: setengahnya tertutup cover, berputar pelan */}
              <div
                aria-hidden="true"
                className="absolute left-[62%] top-0 size-full animate-[spin_6s_linear_infinite] rounded-full bg-[repeating-radial-gradient(circle_at_center,#0a0a0a_0px,#0a0a0a_2px,#1c1c1c_3px,#0a0a0a_4px)] shadow-lg motion-reduce:animate-none"
              >
                {/* 2 sinar cahaya (ikut berputar bersama piringan) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_18deg,transparent_45deg,transparent_180deg,rgba(255,255,255,0.4)_198deg,transparent_225deg,transparent_360deg)]"
                />

                {/* label tengah piringan */}
                <div className="absolute left-1/2 top-1/2 size-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1DB954]">
                  <div className="absolute left-1/2 top-1/2 size-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                </div>
              </div>

              {/* Cover */}
              <div className="relative z-10 size-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  key={current.id}
                  src={current.cover}
                  alt={`Cover ${current.episode} ${current.title}`}
                  fill
                  sizes="210px"
                  className="object-cover"
                />
              </div>

              {/* Prev */}
              <button
                type="button"
                onClick={prev}
                aria-label="Episode sebelumnya"
                className="absolute left-0 top-1/2 z-20 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-10"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={next}
                aria-label="Episode berikutnya"
                className="absolute right-0 top-1/2 z-20 flex size-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-10"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Teks + aksi */}
          <div className="flex min-w-0 flex-1 flex-col gap-3 md:pr-24 lg:pr-28">
            {/* aria-live supaya pembaca layar tahu isi berganti */}
            <div aria-live="polite" className="flex flex-col gap-2">
              <p className="text-base md:text-lg">SI Dengar</p>

              <h2 className="font-heading text-xl font-bold leading-snug md:text-3xl md:leading-tight">
                {current.episode} {current.title}
              </h2>

              <p className="line-clamp-4 text-justify text-xs leading-4 text-white/90 md:line-clamp-3 md:text-sm md:leading-5">
                {current.description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 md:justify-start">
              <a
                href={current.follow_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/85 md:text-sm"
              >
                Ikuti Kami
              </a>

              {/* Tombol play: tampil di sebelah tombol (mobile),
                  pojok kanan bawah (desktop) */}
              <a
                href={current.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Putar ${current.episode} ${current.title} di Spotify`}
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/35 text-black transition-colors hover:bg-white/50 md:absolute md:bottom-8 md:right-10 md:size-20"
              >
                <Play className="size-6 fill-current md:size-9" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}