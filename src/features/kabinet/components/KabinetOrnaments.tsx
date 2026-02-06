import { DynamicAsset } from "@/components/ui/dynamic-asset";
import Image from "next/image";

export function Ornament1({gradient}: {gradient: string}) {
  return (
    // <div className="relative w-full aspect-4/1">
    //   <Image
    //     src="/assets/kabinet/ornament-1.webp"
    //     alt=""
    //     fill
    //     className="object-contain"
    //     priority
    //   />
    // </div>
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
    // <div className="relative w-full aspect-4/1">
    //   <Image
    //     src="/assets/kabinet/ornament-2.webp"
    //     alt=""
    //     fill
    //     className="object-contain"
    //     priority
    //   />
    // </div>
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-2.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Ornament3() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-3.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Ornament4({gradient}: {gradient: string}) {
  return (
    // <div className="relative w-full aspect-4/1">
    //   <Image
    //     src="/assets/kabinet/ornament-4.webp"
    //     alt=""
    //     fill
    //     className="object-contain"
    //     priority
    //   />
    // </div>
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
    // <div className="relative w-full aspect-4/1">
    //   <Image
    //     src="/assets/kabinet/ornament-5.webp"
    //     alt=""
    //     fill
    //     className="object-contain"
    //     priority
    //   />
    // </div>
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
    // <div className="relative w-full aspect-4/1">
    //   <div 
    //     className="absolute inset-0 bg-linear-to-r from-[#FFFFFF] via-[#A43DA5] to-[#E63258]"
    //     style={{
    //       WebkitMaskImage: 'url("/assets/kabinet/ornament-2.webp")',
    //       maskImage: 'url("/assets/kabinet/ornament-2.webp")',
    //       WebkitMaskRepeat: 'no-repeat',
    //       maskRepeat: 'no-repeat',
    //       WebkitMaskSize: 'contain',
    //       maskSize: 'contain',
    //       WebkitMaskPosition: 'center',
    //       maskPosition: 'center',
    //     }}
    //   />
    // </div>
    <DynamicAsset
      maskSrc="/assets/kabinet/ornament-2.webp"
      gradientVar={gradient}
      innerHeight="h-full"
      className="w-full aspect-4/1"
    />
  );
}

export function Pita({pitaGradient}:{pitaGradient: string}) {
  return (
    <>
      <DynamicAsset
        imageSrc="/assets/kabinet/pita.png"
        maskSrc="/assets/kabinet/mask-pita.png"
        gradientVar={pitaGradient}
        innerHeight="h-40"
        imageScale="scale-y-110 -translate-x-5 rotate-z-180 rotate-y-180"
        className="w-screen aspect-4/3 absolute scale-105 h-40 -rotate-5"
      />
      <DynamicAsset
        imageSrc="/assets/kabinet/pita.png"
        maskSrc="/assets/kabinet/mask-pita.png"
        gradientVar={pitaGradient}
        innerHeight="h-40"
        imageScale="scale-y-110 -translate-x-7 rotate-z-180 rotate-y-180"
        className="w-screen aspect-4/3 absolute scale-105 h-40 rotate-7 rotate-y-180"
      />
    </>
  );
}
