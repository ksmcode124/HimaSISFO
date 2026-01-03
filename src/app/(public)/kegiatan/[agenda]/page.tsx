import { EventListSection } from "@/features/kegiatan/sections/EventListSection";

interface PageProps {
  params: { agenda: string } | Promise<{ agenda: string }>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // <-- jangan langsung pakai params.agenda
  const agenda = resolvedParams.agenda;
  return (
    <div className="relative my-[150px] mx-10 md:mx-30">
      <h2 className="text-xl w-full h-fit py-5 border-b-2 border-black">Kegiatan / Agenda : {agenda} </h2>
      <div className="relative">
        <h1 className="text-9xl w-full h-fit text-center py-15 border-b-4 border-black ">Agenda</h1>
        <EventListSection/>
      </div>
    </div>
  );
}