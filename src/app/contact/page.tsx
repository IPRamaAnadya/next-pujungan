"use client";

import { FormEvent, useState } from "react";
import { PublicLayout } from "@/components/public/PublicLayout";

const initialForm = {
  name: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
    const text = [
      `*Nama:* ${formData.name}`,
      `*No. HP:* ${formData.phone}`,
      `*Subjek:* ${formData.subject}`,
      `*Pesan:* ${formData.message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setFormData(initialForm);
  };

  return (
    <PublicLayout>
      <main className="bg-[#f8f3ec] py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <section data-aos="fade-right">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Hubungi Kami</p>
            <h1 className="mt-3 text-4xl font-bold text-[#151515] md:text-5xl">Mari Terhubung</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#3c3c3c] md:text-base">
              Punya pertanyaan tentang Desa Pujungan atau ingin merencanakan kunjungan ke pura? Tim kami siap membantu.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#3c3c3c]">
              <div className="bg-white p-5 shadow-sm">
                <p className="font-semibold text-[#151515]">Alamat</p>
                <p className="mt-1">Jl. Raya Pujungan No. 1, Pupuan, Tabanan, Bali 80853</p>
              </div>
              <div className="bg-white p-5 shadow-sm">
                <p className="font-semibold text-[#151515]">Telepon / WhatsApp</p>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[#c68e51] hover:underline"
                >
                  +{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                </a>
              </div>
            </div>
          </section>

          <section data-aos="fade-left" className="bg-white p-6 shadow-lg md:p-8">
            <h2 className="text-2xl font-semibold text-[#151515]">Kirim Pesan</h2>
            <p className="mt-2 text-sm text-[#666]">Pesan akan diteruskan langsung ke WhatsApp kami.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <input
                required
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:border-[#c68e51] focus:outline-none"
              />
              <input
                required
                type="tel"
                placeholder="No. HP"
                value={formData.phone}
                onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:border-[#c68e51] focus:outline-none"
              />
              <input
                required
                placeholder="Subjek"
                value={formData.subject}
                onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:border-[#c68e51] focus:outline-none"
              />
              <textarea
                required
                placeholder="Pesan"
                rows={6}
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:border-[#c68e51] focus:outline-none"
              />

              <button
                type="submit"
                className="bg-[#c68e51] px-5 py-2.5 text-sm font-semibold text-[#151515] transition hover:bg-[#b07d45]"
              >
                Kirim Pesan via WhatsApp
              </button>
            </form>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
}
