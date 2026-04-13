import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import CategoryManager from "@/components/dashboard/categories/CategoryManager";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardCategoriesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      title="Kelola Kategori"
      subtitle="Tambah, edit, dan hapus kategori pura"
      actions={
        <Link href="/dashboard/temples" className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-200">
          Lihat Data Pura
        </Link>
      }
    >
        <CategoryManager />
    </DashboardShell>
  );
}
