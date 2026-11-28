import ClientGuard from "@/features/admin/components/clientGuard";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientGuard>
      {children}
    </ClientGuard>
  );
}
