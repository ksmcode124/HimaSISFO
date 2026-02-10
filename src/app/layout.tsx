import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-primary'
});

export const metadata: Metadata = {
  title: "Himpunan Mahasiswa Sistem Informasi UPNVYK",
  description: "Website Portfolio Himpunan Mahasiswa Sistem Informasi UPN Veteran Yogyakarta",
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
