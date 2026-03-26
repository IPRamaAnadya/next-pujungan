"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type Mode = "create" | "edit";

export default function CategoryManager() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<Mode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadCategories() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/categories", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message ?? "Gagal memuat kategori");
      setCategories(payload);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Gagal memuat kategori");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function startCreate() {
    setMode("create");
    setEditingId(null);
    setName("");
    setDescription("");
  }

  function startEdit(category: Category) {
    setMode("edit");
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError("Nama dan deskripsi wajib diisi");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(mode === "create" ? "/api/categories" : `/api/categories/${editingId}`, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message ?? "Gagal menyimpan kategori");

      startCreate();
      await loadCategories();
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Gagal menyimpan kategori");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string, label: string) {
    const confirmed = window.confirm(`Hapus kategori \"${label}\"?`);
    if (!confirmed) return;

    setError(null);

    const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.message ?? "Gagal menghapus kategori");
      return;
    }

    await loadCategories();
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <header className="rounded-xl border border-zinc-200 bg-white p-5">
        <h1 className="text-2xl font-semibold text-zinc-900">Kelola Kategori</h1>
        <p className="text-sm text-zinc-600">Tambah, edit, dan hapus kategori pura</p>
      </header>

      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-medium text-zinc-900">
          {mode === "create" ? "Tambah Kategori" : "Edit Kategori"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1 text-sm text-zinc-700 md:col-span-1">
            <span>Nama</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700 md:col-span-2">
            <span>Deskripsi</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-20 w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            />
          </label>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {isSubmitting ? "Menyimpan..." : mode === "create" ? "Tambah" : "Simpan"}
            </button>
            {mode === "edit" ? (
              <button
                type="button"
                onClick={startCreate}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
              >
                Batal Edit
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        {isLoading ? (
          <p className="p-4 text-sm text-zinc-600">Memuat kategori...</p>
        ) : (
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Nama</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Deskripsi</th>
                <th className="px-4 py-3 text-right font-medium text-zinc-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-3 font-medium text-zinc-900">{category.name}</td>
                  <td className="px-4 py-3 text-zinc-700">{category.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(category)}
                        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(category.id, category.name)}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
