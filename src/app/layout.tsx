import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';
import { League_Spartan } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-primary'
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading", 
  display: "swap",
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
        className={`${poppins.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
