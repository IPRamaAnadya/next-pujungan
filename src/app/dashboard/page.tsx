import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const [templesCount, categoriesCount, usersCount] = await Promise.all([
    prisma.temple.count(),
    prisma.category.count(),
    prisma.user.count(),
  ]);

  return (
    <DashboardShell
      title="Ringkasan Dashboard"
      subtitle={`Login sebagai ${session.user.email} (${session.user.role})`}
      actions={
        <Link href="/dashboard/temples/new" className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white">
          Tambah Pura
        </Link>
      }
    >
      <div className="space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm text-zinc-500">Total Pura</p>
            <p className="text-2xl font-semibold text-zinc-900 mt-1">{templesCount}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm text-zinc-500">Total Kategori</p>
            <p className="text-2xl font-semibold text-zinc-900 mt-1">{categoriesCount}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm text-zinc-500">Total Admin</p>
            <p className="text-2xl font-semibold text-zinc-900 mt-1">{usersCount}</p>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm font-medium text-zinc-900 mb-3">Aksi Cepat</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/temples" className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-50">
              Kelola Pura
            </Link>
            <Link href="/dashboard/categories" className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-50">
              Kelola Kategori
            </Link>
            <Link href="/dashboard/admins" className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-50">
              Kelola Admin
            </Link>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
