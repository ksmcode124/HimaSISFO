import HeroSection from "@/features/komunitas/sections/hero";
import { DATA_KOMUNITAS } from "@/features/komunitas/data/komunitasData";
import { notFound } from "next/navigation";

interface KomunitasDetailPageProps {
  params: Promise<{
    komunitasId: string;
  }>;
}

export default async function KomunitasDetailPage({
  params,
}: KomunitasDetailPageProps) {
  const { komunitasId } = await params;
  const decodedId = decodeURIComponent(komunitasId).toLowerCase();
  const data = DATA_KOMUNITAS[decodedId];

  if (!data) {
    notFound();
  }

  return (
    <main>
      <HeroSection
        namaKomunitas={data.nama}
        deskripsi={data.deskripsi}
        fotoBanner={data.fotoBanner}
        iconKomunitas={data.icon}
        titleFontSize={data.titleFontSize || "96px"}
      />
    </main>
  );
}
