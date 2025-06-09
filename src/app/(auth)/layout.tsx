export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <main className="h-full">{children}</main>
    </div>
  );
}
