import Image from "next/image";

export function Ornament1() {
  return (
    <div className="relative w-[300px] md:w-[500px] aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-1.png"
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
        src="/assets/kabinet/ornament-2.png"
        alt=""
        fill
        className="object-contain"
        priority    
      />
    </div>
  );
}

export function Ornamen4() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/ornament-4.png"
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
        src="/assets/kabinet/Pita.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function Awan() {
  return (
    <div className="relative w-full aspect-4/1">
      <Image
        src="/assets/kabinet/cloud.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}