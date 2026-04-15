import { PublicLayout } from "@/components/public/PublicLayout";
import ContactForm from "@/components/public/ContactForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getWhatsappNumber(): Promise<string> {
  try {
    const site = await prisma.site.findUnique({ where: { id: "singleton" } });
    return site?.whatsappNumber ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  } catch {
    return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  }
}

export default async function ContactPage() {
  const waNumber = await getWhatsappNumber();

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
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[#c68e51] hover:underline"
                >
                  +{waNumber}
                </a>
              </div>
            </div>
          </section>

          <ContactForm waNumber={waNumber} />
        </div>
      </main>
    </PublicLayout>
  );
}
