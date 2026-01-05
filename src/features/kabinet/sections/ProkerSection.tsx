"use client";

export default function ProkerSection() {
  return (
    <section className="relative w-full min-h-[1000px] flex flex-col items-center py-24 overflow-hidden bg-[#F4E8FF]">
      
      {/* ornamen kiri */}
      <div className="absolute -left-10 md:-left-100 top-1/2 -translate-y-1/2 w-[500px] h-[400px] md:w-[800px] md:h-[600px] z-0 opacity-40">
        <div className="w-full h-full bg-pink-600 rounded-full blur-[120px] absolute" />
      </div>

      {/* ornamen kanan */}
      <div className="absolute -right-10 md:-right-100 top-1/2 -translate-y-1/2 w-[500px] h-[400px] md:w-[800px] md:h-[600px] z-0 opacity-40">
        <div className="w-full h-full bg-pink-600 rounded-full blur-[120px] absolute" />
      </div>

      {/* Judul Section */}
      <div className="relative flex flex-row items-center gap-4 mb-10 mt-10 z-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
          Program Kerja
        </h2>
      </div>

      {/* Carousel Proker */}
      <div className="relative w-full max-w-7xl h-[550px] border-2 flex items-center justify-center z-10">
        <div className="flex flex-col items-center text-black font-bold">
          CAROUSEL PROKER
        </div>
      </div>
    </section>
  );
}