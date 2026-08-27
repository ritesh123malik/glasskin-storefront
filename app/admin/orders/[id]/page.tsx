import { isAdmin } from "@/lib/admin-auth";
import AdminOrderDetail from "@/components/admin/AdminOrderDetail";

export const metadata = { title: "Admin · Order · GLASSSKIN" };

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const admin = await isAdmin();
  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center text-brand-text">
        <p className="text-sm uppercase tracking-widest">Admin access required</p>
      </main>
    );
  }
  return <AdminOrderDetail orderId={params.id} />;
}
