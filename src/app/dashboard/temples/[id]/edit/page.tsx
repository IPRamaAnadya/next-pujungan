import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import TempleEditor from "@/components/dashboard/temples/TempleEditor";
import { authOptions } from "@/lib/auth-options";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTemplePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  return (
    <DashboardShell
      title="Edit Pura"
      subtitle="Perbarui informasi pura, koordinat, dan urutan gambar"
      actions={
        <Link href="/dashboard/temples" className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
          Kembali ke Daftar
        </Link>
      }
    >
      <div className="mx-auto max-w-4xl">
        <TempleEditor mode="edit" templeId={id} showHeader={false} />
      </div>
    </DashboardShell>
  );
}
