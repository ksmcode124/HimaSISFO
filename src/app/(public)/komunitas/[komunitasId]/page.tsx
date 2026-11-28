import HeroSection from "@/features/komunitas/sections/hero";
import { get_komunitas } from "@/features/komunitas/data/komunitas";
import { notFound } from "next/navigation";
import Dokumentasi from "@/features/komunitas/sections/dokumentasi";
import JoinCTA from "@/features/komunitas/sections/joinCTA";

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
  const data = get_komunitas(decodedId);

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
        titleFontSize={data.slug === "arak-arakan" ? "86px" : "96px"}
      />
      <Dokumentasi komunitasId={data.slug} />
    </main>
  );
}
