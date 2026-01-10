import Image from "next/image";

export function Ornament1() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/cloud.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Ornament2() {
  return (
    <div className="relative w-[300px] md:w-[500px] aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-2.webp"
        alt=""
        fill
        className="object-contain"
        priority    
      />
    </div>
  );
}

export function Ornament3() {
  return (
    <div className="relative w-[300px] md:w-[500px] aspect-4/1">
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

export function Ornament4() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-4.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Ornament5() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-5.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Pita() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/Pita.webp"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}