import { isAdmin } from "@/lib/admin-auth";
import AdminOrdersClient from "@/components/admin/AdminOrdersClient";

export const metadata = { title: "Admin · Orders · GLASSSKIN" };

export default async function AdminOrdersPage() {
  const admin = await isAdmin();
  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center text-brand-text">
        <p className="text-sm uppercase tracking-widest">Admin access required</p>
      </main>
    );
  }
  return <AdminOrdersClient />;
}
