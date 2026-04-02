import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DeleteTempleButton from "@/components/dashboard/temples/DeleteTempleButton";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export default async function DashboardTemplesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  const temples = await prisma.temple.findMany({
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      createdBy: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <DashboardShell
      title="Kelola Pura"
      subtitle={`${temples.length} data pura`}
      actions={
        <Link href="/dashboard/temples/new" className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white">
          Tambah Pura
        </Link>
      }
    >
      <section className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Pura</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Kategori</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Gambar</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600">Koordinat</th>
              <th className="px-4 py-3 text-right font-medium text-zinc-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {temples.map((temple) => (
              <tr key={temple.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {temple.images[0]?.path ? (
                      <img src={temple.images[0].path} alt={temple.name} className="h-11 w-11 rounded-md object-cover" />
                    ) : (
                      <div className="h-11 w-11 rounded-md bg-zinc-100" />
                    )}
                    <div>
                      <p className="font-medium text-zinc-900">{temple.name}</p>
                      <p className="text-xs text-zinc-500">{temple.createdBy.name ?? temple.createdBy.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-700">{temple.category.name}</td>
                <td className="px-4 py-3 text-zinc-700">{temple.images.length}</td>
                <td className="px-4 py-3 text-zinc-700">
                  {temple.latitude}, {temple.longitude}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link href={`/temples/${temple.slug}`} className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
                      Lihat
                    </Link>
                    <Link href={`/dashboard/temples/${temple.id}/edit`} className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
                      Edit
                    </Link>
                    <DeleteTempleButton templeId={temple.id} templeName={temple.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardShell>
  );
}
