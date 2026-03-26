"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AdminUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: "ADMIN" | "EDITOR";
  createdAt: string;
  updatedAt: string;
};

type Mode = "create" | "edit";

export default function AdminManager({ currentUserId }: { currentUserId: string }) {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<Mode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR">("EDITOR");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadUsers() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admins", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message ?? "Gagal memuat admin");
      setUsers(payload);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Gagal memuat admin");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function startCreate() {
    setMode("create");
    setEditingId(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("EDITOR");
  }

  function startEdit(user: AdminUser) {
    setMode("edit");
    setEditingId(user.id);
    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setPassword("");
    setRole(user.role);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Nama dan email wajib diisi");
      return;
    }

    if (mode === "create" && password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (mode === "edit" && password && password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const endpoint = mode === "create" ? "/api/admins" : `/api/admins/${editingId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          ...(password ? { password } : {}),
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message ?? "Gagal menyimpan admin");

      startCreate();
      await loadUsers();
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Gagal menyimpan admin");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(user: AdminUser) {
    const confirmed = window.confirm(`Hapus admin \"${user.name ?? user.email}\"?`);
    if (!confirmed) return;

    const response = await fetch(`/api/admins/${user.id}`, { method: "DELETE" });
    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.message ?? "Gagal menghapus admin");
      return;
    }

    await loadUsers();
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <header className="rounded-xl border border-zinc-200 bg-white p-5">
        <h1 className="text-2xl font-semibold text-zinc-900">Kelola Admin</h1>
        <p className="text-sm text-zinc-600">Fitur ini khusus akun role ADMIN</p>
      </header>

      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-medium text-zinc-900">
          {mode === "create" ? "Tambah Admin" : "Edit Admin"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1 text-sm text-zinc-700">
            <span>Nama</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700">
            <span>{mode === "create" ? "Password" : "Password Baru (opsional)"}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
              placeholder={mode === "create" ? "Minimal 6 karakter" : "Kosongkan jika tidak ganti"}
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700">
            <span>Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as "ADMIN" | "EDITOR")}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
            >
              <option value="EDITOR">EDITOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
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
          <p className="p-4 text-sm text-zinc-600">Memuat admin...</p>
        ) : (
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Nama</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Role</th>
                <th className="px-4 py-3 text-right font-medium text-zinc-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {user.name ?? "-"} {user.id === currentUserId ? "(Anda)" : ""}
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{user.email ?? "-"}</td>
                  <td className="px-4 py-3 text-zinc-700">{user.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(user)}
                        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={user.id === currentUserId}
                        onClick={() => handleDelete(user)}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-40"
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
