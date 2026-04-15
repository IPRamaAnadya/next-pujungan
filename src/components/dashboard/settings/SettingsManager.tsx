"use client";

import { FormEvent, useEffect, useState } from "react";

export default function SettingsManager() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [currentNumber, setCurrentNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.message ?? "Gagal memuat pengaturan");
        setCurrentNumber(payload.whatsappNumber ?? null);
        setWhatsappNumber(payload.whatsappNumber ?? "");
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Gagal memuat pengaturan");
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!whatsappNumber.trim()) {
      setError("Nomor WhatsApp tidak boleh kosong");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message ?? "Gagal menyimpan pengaturan");

      setCurrentNumber(payload.whatsappNumber);
      setWhatsappNumber(payload.whatsappNumber);
      setSuccess("Nomor WhatsApp berhasil disimpan");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Gagal menyimpan pengaturan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {success}
        </p>
      ) : null}

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="mb-1 text-sm font-medium text-zinc-900">Nomor WhatsApp Saat Ini</h2>
        {isLoading ? (
          <p className="text-sm text-zinc-500">Memuat…</p>
        ) : currentNumber ? (
          <p className="text-sm text-zinc-700">
            +{currentNumber} &mdash;{" "}
            <a
              href={`https://wa.me/${currentNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c68e51] hover:underline"
            >
              Buka WhatsApp
            </a>
          </p>
        ) : (
          <p className="text-sm text-zinc-500">Belum diatur (menggunakan default dari environment)</p>
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-medium text-zinc-900">Ubah Nomor WhatsApp</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block space-y-1 text-sm text-zinc-700">
            <span>Nomor WhatsApp</span>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(event) => {
                setWhatsappNumber(event.target.value);
                setError(null);
                setSuccess(null);
              }}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-[#c68e51] focus:outline-none"
              placeholder="Contoh: 08123456789 atau 628123456789"
              required
            />
            <span className="text-xs text-zinc-500">
              Format Indonesia: 08xx-xxxx-xxxx, 628xx-xxxx-xxxx, atau +628xx akan diterima.
              Nomor akan otomatis dinormalisasi ke format 62xxx.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan…" : "Simpan"}
          </button>
        </form>
      </section>
    </div>
  );
}
