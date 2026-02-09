import { DynamicAsset } from "@/components/ui/dynamic-asset";
import Image from "next/image";

export function Ornament1({gradient}: {gradient: string}) {
  return (
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-1.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Ornament2({gradient}: {gradient: string}) {
  return (
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-2.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Ornament3({gradient}: {gradient: string}) {
  return (
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-3.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Ornament4({gradient}: {gradient: string}) {
  return (
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-4.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Ornament5({gradient}: {gradient: string}) {
  return (
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-5.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Ornament6() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-6.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Ornament7() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-7.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Ornament8() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-8.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Ornament9({gradient}: {gradient: string}) {
  return (
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-2.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Pita({ pitaGradient }: { pitaGradient: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 -rotate-6">
        <DynamicAsset
          imageSrc="/assets/kabinet/pita.webp"
          maskSrc="/assets/kabinet/mask-pita.webp"
          gradientVar={pitaGradient}
          innerHeight="h-full"
          className="w-full h-full"
          imageScale="object-contain"
        />
      </div>
      <div className="absolute inset-0 rotate-6 scale-90 -scale-x-100">
        <DynamicAsset
          imageSrc="/assets/kabinet/pita.webp"
          maskSrc="/assets/kabinet/mask-pita.webp"
          gradientVar={pitaGradient}
          innerHeight="h-full"
          className="w-full h-full"
          imageScale="object-contain"
        />
      </div>
    </div>
  );
}