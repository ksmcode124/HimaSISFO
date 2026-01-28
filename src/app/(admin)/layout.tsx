import ClientGuard from "@/features/admin/components/ClientGuard";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientGuard>{children}</ClientGuard>
    </>
  );
}
