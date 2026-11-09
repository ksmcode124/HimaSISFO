"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const tahapanAspirasi = [
  {
    nomor: "1",
    judul: "Tulis aspirasimu",
    deskripsi: "Sampaikan ide, kritik, atau keluhan dengan jelas.",
  },
  {
    nomor: "2",
    judul: "Ditinjau pengurus",
    deskripsi: "Bidang terkait membaca dan membahas setiap masukan.",
  },
  {
    nomor: "3",
    judul: "Ditindaklanjuti",
    deskripsi: "Hasilnya kami wujudkan lewat program dan kebijakan.",
  },
];

export default function Aspirasi() {
  const [aspirasi, setAspirasi] = useState("");
  const [nama, setNama] = useState("");
  const [terkirim, setTerkirim] = useState(false);

  return (
    <section
      id="aspirasi"
      className="relative overflow-hidden px-[49px] pb-12 sm:pb-8 md:pb-20 lg:pb-16"
    >
      {/* Container utama */}
      <div className="relative mx-auto w-full max-w-[1006px]">
        {/* Heading */}
        <h2 className="mx-auto mb-9 w-fit whitespace-nowrap bg-gradient-to-r from-[#5B93C6] via-[#145A92] to-[#5B93C6] bg-clip-text font-heading text-[28px] font-bold leading-[35px] text-transparent md:text-[48px] md:leading-[60px]">
          Berikan Aspirasi Kamu!
        </h2>

        {/* Card utama */}
        <div className="mx-auto grid min-h-[1037.5px] w-full grid-cols-1 grid-rows-[auto_auto] gap-2 overflow-hidden rounded-[28px] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] md:h-[572.1875px] md:min-h-0 md:max-w-[982px] md:grid-cols-[42%_1fr] md:grid-rows-1 md:gap-3">
          {/* Panel biru (palette: #0A3981) */}
          <div className="relative flex min-h-[487.6px] w-full shrink-0 flex-col overflow-hidden rounded-[20px] bg-[#0A3981] p-6 text-white md:min-h-0 md:w-full md:rounded-[20px] md:px-7 md:py-7">
            {/* Watermark logo */}
            <div className="pointer-events-none absolute -bottom-4 right-0 rotate-[-12deg] opacity-[0.08]">
              <Image
                src="/assets/shared/logos/logo-himasisfo.webp"
                alt=""
                width={220}
                height={220}
                className="h-[220px] w-[220px] object-contain"
              />
            </div>

            <span className="relative inline-block w-fit rounded-full bg-[#285A9A] px-3 py-1 text-[8px] font-medium tracking-[1px] text-[#BBD9F8]">
              SUARA MAHASISWA
            </span>

            <h3 className="relative mt-3 font-heading text-[26px] font-bold leading-tight md:text-[36px]">
              Suaramu,
              <br />
              <span className="text-[#A9D5FF]">langkah kami.</span>
            </h3>

            <p className="body2 relative mt-2 max-w-[280px] text-[14px] text-[#BBD0E9] md:text-[16px]">
              Aspirasi yang masuk menjadi bahan evaluasi dan bahan pembahasan
              untuk program yang lebih baik.
            </p>

            {/* Tahapan aspirasi */}
            <div className="relative mt-6 flex flex-col gap-4 md:mt-7 md:gap-5">
              {tahapanAspirasi.map((item) => (
                <div key={item.nomor} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9BD0FA] text-xs font-bold text-[#0A3981]">
                    {item.nomor}
                  </div>

                  <div>
                    <h4 className="text-[15px] font-bold text-white md:text-base">
                      {item.judul}
                    </h4>
                    <p className="mt-1 max-w-[230px] text-[13px] leading-relaxed text-[#BBD0E9] md:text-body3 md:leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Form aspirasi */}
          <div className="flex min-w-0 flex-col justify-between px-5 py-6 md:px-7 md:py-7">
            {terkirim ? (
              /* Tampilan sukses */
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#DCEFFA]">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A3981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </div>

                <h3 className="title4 font-heading text-[#0A3981]">
                  Aspirasi terkirim!
                </h3>

                <p className="body2 mt-2 max-w-[360px] text-[#777777]">
                  Terima kasih, {nama.trim() || "Mahasiswa"}.
                  Aspirasimu sudah kami terima dan akan dibahas oleh pengurus
                  HIMASISFO.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setTerkirim(false);
                    setAspirasi("");
                    setNama("");
                  }}
                  className="mt-6 h-[42px] rounded-xl border border-[#0A3981] px-5 text-sm font-medium text-[#0A3981] hover:bg-[#EFF6FF]"
                >
                  Kirim aspirasi lain
                </Button>
              </div>
            ) : (
              /* Form aspirasi */
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (!aspirasi.trim()) {
                    return;
                  }

                  setTerkirim(true);
                }}
                className="flex flex-1 flex-col gap-4 md:gap-5"
              >
                {/* Nama */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nama"
                    className="label1 font-semibold text-[#0A3981]"
                  >
                    Nama{" "}
                    <span className="font-normal text-[#999999]">
                      (opsional)
                    </span>
                  </label>

                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Rizky Pratama"
                    className="body2 h-9 w-full rounded-lg border border-[#D4DFEF] bg-white px-3 text-[#333333] outline-none placeholder:text-[#AAAAAA] focus:border-[#2675B5] md:h-10"
                  />

                  <p className="text-[13px] font-normal text-[#999999]">
                    Kosongkan jika ingin mengirim secara anonim.
                  </p>
                </div>

                {/* Isi aspirasi */}
                <div className="flex flex-1 flex-col gap-2">
                  <label
                    htmlFor="isi-aspirasi"
                    className="label1 font-semibold text-[#0A3981]"
                  >
                    Isi Aspirasi <span className="text-red-500">*</span>
                  </label>

                  <div className="relative flex-1">
                    <textarea
                      id="isi-aspirasi"
                      name="aspirasi"
                      required
                      maxLength={1000}
                      value={aspirasi}
                      onChange={(e) => setAspirasi(e.target.value)}
                      placeholder="Ceritakan aspirasimu. Misalnya usulan kegiatan, kendala perkuliahan, atau masukan untuk pengurus..."
                      className="body2 min-h-[180px] w-full resize-none rounded-lg border border-[#D4DFEF] bg-white px-3 py-3 pb-7 leading-relaxed text-[#333333] outline-none placeholder:text-[#AAAAAA] focus:border-[#2675B5] md:h-full md:min-h-[150px]"
                    />

                    <span className="absolute bottom-2 right-3 text-[9px] text-[#999999]">
                      {aspirasi.length}/1000
                    </span>
                  </div>

                  <p className="body4 text-[#999999]">
                    Tulis dengan sopan dan jelas agar mudah ditindaklanjuti.
                  </p>
                </div>

                {/* Tombol kirim */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!aspirasi.trim()}
                    className="relative z-10 h-[52px] w-full gap-4 rounded-xl bg-[#0A3981] px-[30px] text-white shadow-[0_10px_24px_-6px_rgba(13,71,161,0.45)] hover:bg-[#0A3981]/90 active:bg-[#082F6B] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none md:order-2 md:w-auto"
                  >
                    Kirim Aspirasi
                  </Button>

                  <p className="body4 text-[#999999] md:max-w-[220px]">
                    Identitasmu hanya dapat dilihat oleh pengurus.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Garis bawah */}
        <div className="mt-8 md:mt-10">
          <div className="mx-auto h-0 w-[280px] border-t border-[#6E6B6B] md:w-[400px] lg:w-[500px]" />
        </div>
      </div>
    </section>
  );
}