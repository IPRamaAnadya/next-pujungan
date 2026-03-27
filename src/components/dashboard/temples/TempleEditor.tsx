"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MapPickerField = dynamic(() => import("./MapPickerField"), { ssr: false });
const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

type Category = {
  id: string;
  name: string;
};

type TempleImageInput = {
  path: string;
  alt?: string;
};

type TemplePayload = {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  images: Array<{
    id: string;
    path: string;
    alt: string | null;
  }>;
};

type Props = {
  mode: "create" | "edit";
  templeId?: string;
  showHeader?: boolean;
};

export default function TempleEditor({ mode, templeId, showHeader = true }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<TempleImageInput[]>([]);

  const title = mode === "create" ? "Tambah Pura" : "Edit Pura";

  const canSubmit = useMemo(() => {
    return (
      name.trim() &&
      description.trim() &&
      address.trim() &&
      categoryId &&
      latitude.trim() &&
      longitude.trim() &&
      images.length > 0
    );
  }, [address, categoryId, description, images.length, latitude, longitude, name]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const categoriesResponse = await fetch("/api/categories", { cache: "no-store" });
        if (!categoriesResponse.ok) {
          throw new Error("Gagal memuat kategori.");
        }

        const categoryJson = (await categoriesResponse.json()) as Category[];
        setCategories(categoryJson);

        if (mode === "edit" && templeId) {
          const templeResponse = await fetch(`/api/temples/${templeId}`, { cache: "no-store" });
          if (!templeResponse.ok) {
            throw new Error("Gagal memuat data pura.");
          }

          const temple = (await templeResponse.json()) as TemplePayload;
          setName(temple.name);
          setDescription(temple.description);
          setAddress(temple.address);
          setLatitude(String(temple.latitude));
          setLongitude(String(temple.longitude));
          setCategoryId(temple.categoryId);
          setImages(
            temple.images.map((image) => ({
              path: image.path,
              alt: image.alt ?? "",
            })),
          );
        }
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Terjadi kesalahan.");
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [mode, templeId]);

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;

    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    const oversized = Array.from(files).filter((file) => file.size > MAX_SIZE);
    if (oversized.length > 0) {
      setError(
        `File berikut melebihi batas ukuran 1MB: ${oversized.map((f) => f.name).join(", ")}`,
      );
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message ?? "Upload gambar gagal.");
      }

      setImages((prev) => [
        ...prev,
        ...payload.files.map((file: { path: string }) => ({
          path: file.path,
          alt: "",
        })),
      ]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload gambar gagal.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, imageIndex) => imageIndex !== index));
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const next = [...prev];
      const current = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = current;
      return next;
    });
  }

  function updateImageAlt(index: number, alt: string) {
    setImages((prev) => prev.map((image, imageIndex) => (imageIndex === index ? { ...image, alt } : image)));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsedLatitude = Number(latitude);
    const parsedLongitude = Number(longitude);

    if (!canSubmit) {
      setError("Lengkapi semua field wajib, termasuk minimal 1 gambar.");
      return;
    }

    if (Number.isNaN(parsedLatitude) || Number.isNaN(parsedLongitude)) {
      setError("Latitude dan longitude harus berupa angka.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name,
        description,
        address,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        categoryId,
        images,
      };

      const response = await fetch(mode === "create" ? "/api/temples" : `/api/temples/${templeId}`, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson?.message ?? "Gagal menyimpan pura.");
      }

      router.push("/dashboard/temples");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Gagal menyimpan pura.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className="text-sm text-zinc-600">Memuat data...</p>;
  }

  return (
    <div className="space-y-5">
      {showHeader ? (
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
          <p className="text-sm text-zinc-600">Upload multi-gambar dan atur urutan tampil.</p>
        </header>
      ) : null}

      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-zinc-700 md:col-span-2">
            <span>Nama Pura</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700 md:col-span-2">
            <span>Lokasi Pura</span>
            <MapPickerField
              latitude={latitude}
              longitude={longitude}
              onChange={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700 md:col-span-2">
            <span>Alamat</span>
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="min-h-20 w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            />
          </label>

          <label className="space-y-1 text-sm text-zinc-700 md:col-span-2">
            <span>Kategori</span>
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2"
              required
            >
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-1 text-sm text-zinc-700 md:col-span-2">
            <span>Deskripsi</span>
            <QuillEditor value={description} onChange={setDescription} />
          </div>
        </div>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-zinc-900">Gambar Pura (multi-image)</h2>
            <label className="cursor-pointer rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
              {isUploading ? "Uploading..." : "Upload Gambar"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          {!images.length ? (
            <p className="rounded-md border border-dashed border-zinc-300 p-3 text-sm text-zinc-600">
              Belum ada gambar. Upload minimal satu gambar.
            </p>
          ) : (
            <div className="space-y-3">
              {images.map((image, index) => (
                <div key={`${image.path}-${index}`} className="grid grid-cols-1 gap-3 rounded-md border border-zinc-200 p-3 md:grid-cols-[96px_1fr_auto]">
                  <img src={image.path} alt={image.alt || "Temple image"} className="h-24 w-24 rounded-md object-cover" />
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500">{image.path}</p>
                    <input
                      value={image.alt ?? ""}
                      onChange={(event) => updateImageAlt(index, event.target.value)}
                      placeholder="Alt text (opsional)"
                      className="w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <button type="button" onClick={() => moveImage(index, -1)} className="rounded border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-50">
                      ↑
                    </button>
                    <button type="button" onClick={() => moveImage(index, 1)} className="rounded border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-50">
                      ↓
                    </button>
                    <button type="button" onClick={() => removeImage(index)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 hover:bg-red-50">
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isSubmitting || isUploading || !canSubmit}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/temples")}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
