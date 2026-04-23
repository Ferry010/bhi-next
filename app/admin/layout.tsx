import { AuthProvider } from "@/components/auth/AuthProvider";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "Admin | Brand Humanizing Institute",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AuthProvider>
  );
}
