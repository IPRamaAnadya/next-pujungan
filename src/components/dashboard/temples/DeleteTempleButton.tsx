"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  templeId: string;
  templeName: string;
};

export default function DeleteTempleButton({ templeId, templeName }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Hapus pura \"${templeName}\"?`);
    if (!confirmed) return;

    setIsLoading(true);
    const response = await fetch(`/api/temples/${templeId}`, {
      method: "DELETE",
    });

    setIsLoading(false);

    if (!response.ok) {
      alert("Gagal menghapus pura.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isLoading}
      className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      {isLoading ? "Menghapus..." : "Hapus"}
    </button>
  );
}
