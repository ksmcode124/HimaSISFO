import Image from "next/image";

interface Props {
  imageSrc?: string;
}

export function HeroMobilePreview({ imageSrc = "/assets/kabinet/gelora-harmoni-1.png" }: Props) {
  return (
    <div className="relative z-20 mt-10 w-full max-w-[350px] px-4 md:hidden">
      {/* Ornamen Atas Kiri */}
      <div className="absolute -left-4 -top-12 w-30 h-30 z-30">
        <Image src="/assets/kabinet/hero-ornament-mobile1.png" alt="" fill className="object-contain" />
      </div>

      {/* Foto Utama */}
      <div className="relative w-95 -ml-15 aspect-video rounded-2xl overflow-hidden z-20">
        <Image src={imageSrc} alt="Foto Kabinet" fill className="object-cover" />
      </div>

      {/* Layer */}
      <div className="absolute w-100 -ml-17 top-1 aspect-video rounded-2xl drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] overflow-hidden z-10">
        <Image src="/assets/kabinet/bg-layer2.png" alt="" fill className="object-cover" />
      </div>

      {/* Ornamen Bawah Kanan */}
      <div className="absolute -right-15 -bottom-22 w-60 h-60 z-30">
        <Image src="/assets/kabinet/hero-ornament-right.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
}