import Image from "next/image";
import Link from "next/link";
import { PublicLayout } from "@/components/public/PublicLayout";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const temples = await prisma.temple.findMany({
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const showcaseTemples = temples.slice(0, 6);

  return (
    <PublicLayout>
      <main>
        <section className="relative isolate min-h-[80vh] overflow-hidden bg-[#151515]">
          <Image
            src="/images/hero-temple.jpg"
            alt="Desa Pujungan"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#151515]/85 via-[#151515]/65 to-[#151515]/40" />
          <div className="relative mx-auto flex min-h-[80vh] w-full max-w-7xl items-center px-5 py-16 lg:px-8">
            <div className="max-w-3xl">
              <p data-aos="fade-up" className="text-xs font-semibold tracking-[0.25em] text-[#c68e51] uppercase">Welcome to</p>
              <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">Desa Adat Pujungan</h1>
              <p data-aos="fade-up" data-aos-delay="150" className="mt-3 text-lg text-white/75">Pupuan, Tabanan, Bali</p>
              <p data-aos="fade-up" data-aos-delay="200" className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Jelajahi warisan spiritual Desa Adat Pujungan melalui pura-pura suci, kisah sejarah, dan peta lokasi untuk merencanakan perjalanan Anda.
              </p>
              <div data-aos="fade-up" data-aos-delay="300" className="mt-8 flex flex-wrap gap-3">
                <Link href="/map" className="bg-[#c68e51] px-6 py-3 text-sm font-semibold text-[#151515] transition hover:bg-[#b07d45]">
                  Jelajahi Pura
                </Link>
                <Link href="/about" className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                  Tentang Desa
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div data-aos="fade-up">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Jelajahi</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Pura Pujungan</h2>
            </div>
            <Link data-aos="fade-up" href="/map" className="text-sm font-semibold text-[#c68e51] hover:underline">
              Lihat semua di peta
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseTemples.map((temple, index) => {
              const imagePath = temple.images[0]?.path;

              return (
                <Link
                  data-aos="fade-up"
                  data-aos-delay={String(index * 80)}
                  key={temple.id}
                  href={`/temples/${temple.slug}`}
                  className="group overflow-hidden bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 w-full bg-zinc-100">
                    {imagePath ? (
                      <Image
                        src={imagePath}
                        alt={temple.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="space-y-2 p-5">
                    <p className="text-xs font-semibold tracking-wide text-[#c68e51] uppercase">{temple.category.name}</p>
                    <h3 className="text-lg font-semibold text-[#151515]">{temple.name}</h3>
                    <p className="line-clamp-2 text-sm text-[#5a5a5a]">{temple.address}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
