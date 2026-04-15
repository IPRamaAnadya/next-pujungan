import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import AdminManager from "@/components/dashboard/admins/AdminManager";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardAdminsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell
      title="Kelola Admin"
      subtitle="Fitur ini khusus akun dengan role ADMIN"
      actions={
        <Link href="/dashboard/categories" className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-200">
          Kelola Kategori
        </Link>
      }
    >
        <AdminManager currentUserId={session.user.id} />
    </DashboardShell>
  );
}
