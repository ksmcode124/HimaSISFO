import ClientGuard from "@/features/admin/components/ClientGuard";
import { Providers } from "./providers";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientGuard>
        <Providers>
          {children}
        </Providers>
      </ClientGuard>
    </>
  );
}
