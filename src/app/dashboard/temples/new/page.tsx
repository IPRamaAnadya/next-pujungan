import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import TempleEditor from "@/components/dashboard/temples/TempleEditor";
import { authOptions } from "@/lib/auth-options";

export default async function NewTemplePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      title="Tambah Pura"
      subtitle="Input data pura baru beserta galeri gambar"
      actions={
        <Link href="/dashboard/temples" className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
          Kembali ke Daftar
        </Link>
      }
    >
      <div className="mx-auto max-w-4xl">
        <TempleEditor mode="create" showHeader={false} />
      </div>
    </DashboardShell>
  );
}
