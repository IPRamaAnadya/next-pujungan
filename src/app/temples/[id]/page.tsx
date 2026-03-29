import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/public/PublicLayout";
import TempleMiniMapClient from "@/components/public/TempleMiniMapClient";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function TempleDetailPage({ params }: Params) {
  const { id } = await params;

  const temple = await prisma.temple.findUnique({
    where: { id },
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!temple) {
    notFound();
  }

  const sameCategoryTemples = await prisma.temple.findMany({
    where: {
      id: {
        not: temple.id,
      },
      categoryId: temple.categoryId,
    },
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
    take: 3,
  });

  const fallbackTemples =
    sameCategoryTemples.length < 3
      ? await prisma.temple.findMany({
          where: {
            id: {
              notIn: [temple.id, ...sameCategoryTemples.map((item) => item.id)],
            },
          },
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
          take: 3 - sameCategoryTemples.length,
        })
      : [];

  const otherTemples = [...sameCategoryTemples, ...fallbackTemples];

  const firstImage = temple.images[0]?.path;

  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f8f3ec] py-10">
        <div className="mx-auto max-w-6xl space-y-6 px-5 lg:px-8">
          <header data-aos="fade-up">
            <p className="text-xs font-semibold tracking-wide text-[#c68e51] uppercase">{temple.category.name}</p>
            <h1 className="mt-2 text-3xl font-bold text-[#151515] md:text-4xl">{temple.name}</h1>
            <p className="mt-2 text-sm text-[#5f5f5f]">{temple.address}</p>
          </header>

          {firstImage ? (
            <div data-aos="fade-up" className="relative aspect-16/8 overflow-hidden bg-white shadow-md">
              <Image src={firstImage} alt={temple.name} fill sizes="100vw" className="object-cover" priority />
            </div>
          ) : null}

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {temple.images.map((image) => (
              <div key={image.id} className="relative aspect-video overflow-hidden bg-white shadow-sm">
                <Image src={image.path} alt={image.alt ?? temple.name} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
              </div>
            ))}
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start">
            <article
              data-aos="fade-up"
              className="prose max-w-none bg-white p-6"
              dangerouslySetInnerHTML={{ __html: temple.description.replace(/&nbsp;/g, " ") }}
            />
            <div data-aos="fade-up" data-aos-delay="70" className="lg:sticky lg:top-24">
              <TempleMiniMapClient latitude={temple.latitude} longitude={temple.longitude} templeName={temple.name} />
            </div>
          </section>

          {otherTemples.length ? (
            <section className="space-y-4">
              <h2 data-aos="fade-up" className="text-2xl font-semibold text-[#151515]">Pura Lainnya</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherTemples.map((otherTemple, index) => {
                  const imagePath = otherTemple.images[0]?.path;

                  return (
                    <Link
                      data-aos="fade-up"
                      data-aos-delay={String(index * 80)}
                      key={otherTemple.id}
                      href={`/temples/${otherTemple.id}`}
                      className="overflow-hidden bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative h-44 bg-zinc-100">
                        {imagePath ? <Image src={imagePath} alt={otherTemple.name} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" /> : null}
                      </div>
                      <div className="space-y-1 p-4">
                        <p className="text-xs font-semibold tracking-wide text-[#c68e51] uppercase">{otherTemple.category.name}</p>
                        <h3 className="line-clamp-1 text-lg font-semibold text-[#151515]">{otherTemple.name}</h3>
                        <p className="line-clamp-2 text-sm text-[#666]">{otherTemple.address}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </PublicLayout>
  );
}
