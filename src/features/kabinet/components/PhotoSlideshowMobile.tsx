import Image from "next/image";
import { Ornament2, Ornament3 } from "../components/KabinetOrnaments";

interface Props {
  imageSrc?: string;
}

export function HeroMobilePreview({
imageSrc = "/assets/kabinet/gelora-harmoni-1.webp",
}: Props) {
  return (
    <div className="relative z-20 mt-10 w-full max-w-[350px] px-4 md:hidden">
      {/* Ornamen Atas Kiri */}
      <div className="absolute -left-36 -top-6 w-30 h-30 z-30">
        <Ornament3 />
      </div>

      {/* Foto Utama */}
      <div className="relative w-95 -ml-15 aspect-video rounded-2xl overflow-hidden z-20">
        <Image
          src={imageSrc}
          alt="Foto Kabinet"
          fill
          className="object-cover"
        />

        {/* Ornamen Bawah Kanan */}
        <div className="absolute left-44 -bottom-24 w-40 h-40">
          <Ornament2 />
        </div>
      </div>

      {/* Layer Belakang */}
      <div className="absolute w-100 -ml-17 top-1 aspect-video rounded-2xl drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)] overflow-hidden z-10">
        <Image
          src="/assets/kabinet/bg-layer2.webp"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
