import HeroSection from "@/features/komunitas/sections/hero";

export default function KomunitasDetailPage() {
    return (
        <main>
            <HeroSection
                namaKomunitas="Futsal"
                deskripsi="Komunitas Futsal HIMASISFO merupakan salah satu komunitas mahasiswa yang berada di bawah naungan Departemen Minat dan Bakat HIMASISFO."
                fotoBanner="/assets/beranda/komunitas/futsal.webp"
                iconKomunitas="/assets/beranda/komunitas/fa_futbol-o.svg"
            />
        </main>
    );
}