// app/(dashboard)/dashboard/layout.tsx
import AdminSidebar from "@/components/AdminSidebar";
import "../../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminSidebar />
        {children}
      </body>
    </html>
  );
}
