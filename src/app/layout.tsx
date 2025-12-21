import type { Metadata } from "next";
import "./globals.css";

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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
