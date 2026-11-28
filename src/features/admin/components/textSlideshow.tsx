"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ReactMarkdown from "react-markdown";
import "swiper/css";
import "swiper/css/pagination";

const textSlides = [
  {
    title: 'Integritas',
    paragraph: 'Memudahkan **pengelolaan data** organisasi dan komunitas dengan sistem dashboard yang **terintegrasi** dan **mudah digunakan**.'
  },
  {
    title: 'Efisiensi',
    paragraph: 'Menghemat **waktu** dan **tenaga** anggota dengan proses digitalisasi yang **otomatis** dan **praktis**.'
  },
  {
    title: 'Inovasi',
    paragraph: 'Memanfaatkan **teknologi modern** untuk mendukung kegiatan **himpunan** dan meningkatkan **kolaborasi** antar anggota.'
  },
]

export default function TextSlideshow() {
  return (
    <div className="w-[60%] mx-auto h-60">
      <style>{`
        .swiper-pagination-bullet {
          width: 0.5rem;
          height: 0.5rem;
          background: #d1d5db;
          border-radius: 9999px;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 3rem;
          background: #3385FF;
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {textSlides.map((textSlide, idx) => (
          <SwiperSlide key={idx} className="text-center">
            <div className="flex flex-col gap-5 text-sm">
              <h1 className="font-bold text-5xl md:text-7xl">{textSlide.title}</h1>
              <ReactMarkdown
                components={{
                  strong: ({ ...props }) => (
                    <span className="text-[#3385FF] font-bold" {...props} />
                  )
                }}
              >
                {textSlide.paragraph}
              </ReactMarkdown>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}