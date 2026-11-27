import HeroSection from "@/features/komunitas/sections/hero";
import { get_komunitas } from "@/features/komunitas/data/komunitas";
import { notFound } from "next/navigation";
import Dokumentasi from "@/features/komunitas/sections/dokumentasi";

interface KomunitasDetailPageProps {
  params: Promise<{
    komunitasId: string;
  }>;
}

export default async function KomunitasDetailPage({
  params,
}: KomunitasDetailPageProps) {
  const { komunitasId } = await params;
  const slug = decodeURIComponent(komunitasId).toLowerCase();
  const data = get_komunitas(slug);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <HeroSection
        namaKomunitas={data.name}
        deskripsi={data.desc}
        fotoBanner={data.header}
        iconKomunitas={data.icon}
      />
      <Dokumentasi komunitas={data} />
    </main>
  );
}
