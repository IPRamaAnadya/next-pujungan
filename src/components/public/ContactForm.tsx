"use client";

import { FormEvent, useState } from "react";

const initialForm = {
  name: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm({ waNumber }: { waNumber: string }) {
  const [formData, setFormData] = useState(initialForm);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
  );
}
