import IntiHimpunanCard, { Anggota } from "./IntiHimpunanCard";

interface CarouselProps {
  anggota: Anggota[];
}

export default function CarouselIntiHimpunan({ anggota }: CarouselProps) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10 w-full min-h-[550px] items-center">
      {anggota.map((item, index) => (
        <div key={index} className="relative w-[320px] h-[500px]">
          <IntiHimpunanCard data={item} index={index} />
        </div>
      ))}
    </div>
  );
}
