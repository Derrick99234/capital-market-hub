// app/(admin)/admin/layout.tsx
import AdminSidebar from "@/components/AdminSidebar";
import "../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminSidebar />
        <main className="md:ml-[20%] min-h-screen bg-black">{children}</main>
      </body>
    </html>
  );
}
