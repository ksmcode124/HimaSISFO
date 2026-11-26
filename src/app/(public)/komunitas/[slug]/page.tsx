import { notFound } from "next/navigation";
import { get_komunitas, komunitas_list } from "@/features/komunitas/data/komunitas";

export const dynamicParams = false;

export function generateStaticParams() {
    return komunitas_list.map((k) => ({ slug: k.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const k = get_komunitas(slug);
    if (!k) notFound();

    return (
        <>
            <KomunitasHero data={k} />
            {k.pencapaian && <PencapaianSection items={k.achivement} />}
            {k.jersey && <JerseySection items={k.jersey} />}
            <DokumentasiSection items={k.dokumentasi} />
            {k.gabung && <GabungCta data={k.links} />}
        </>
    )
}