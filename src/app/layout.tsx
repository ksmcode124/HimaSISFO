import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-primary'
});

export const metadata: Metadata = {
  title: {
    default: "Himpunan Mahasiswa Sistem Informasi UPNVYK",
    template: "%s | HIMASISFO UPNVYK",
  },
  description:
    "Website resmi Himpunan Mahasiswa Sistem Informasi UPN Veteran Yogyakarta (HIMASISFO UPNVYK). Informasi kepengurusan, program kerja, kegiatan, dan perkembangan mahasiswa Sistem Informasi UPNVYK.",

  keywords: [
    "UPNVYK",
    "UPN Veteran Yogyakarta",
    "UPN Yogyakarta",
    "Sistem Informasi UPNVYK",
    "Mahasiswa Sistem Informasi UPNVYK",
    "Himpunan Mahasiswa Sistem Informasi",
    "HIMASISFO UPNVYK",
    "SI UPNVYK",
    "Organisasi Mahasiswa UPN Yogyakarta",
    "Himpunan SI UPNVYK",
  ],

  authors: [
    { name: "Himpunan Mahasiswa Sistem Informasi UPNVYK" },
  ],

  creator: "HIMASISFO UPNVYK",
  publisher: "Himpunan Mahasiswa Sistem Informasi UPN Veteran Yogyakarta",

  metadataBase: new URL("https://himasisfoupnvyk.com"),

  openGraph: {
    title: "Himpunan Mahasiswa Sistem Informasi UPNVYK",
    description:
      "Website resmi HIMASISFO UPN Veteran Yogyakarta. Informasi organisasi, program kerja, dan kegiatan mahasiswa Sistem Informasi UPNVYK.",
    url: "https://himasisfoupnvyk.com",
    siteName: "HIMASISFO UPNVYK",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HIMASISFO UPNVYK",
    description:
      "Website resmi Himpunan Mahasiswa Sistem Informasi UPN Veteran Yogyakarta.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} min-h-screen antialiased text-[#323257] scrollbar scrollbar-lg scrollbar-thumb-[#AFAFAF] scrollbar-track-scrollbar-track`}
      >
        {children}
      </body>
    </html>
  );
}
