// app/(dashboard)/dashboard/layout.tsx
import "../../globals.css";
import { UserProvider } from "@/context/user-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="dashboard-wrapper">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
