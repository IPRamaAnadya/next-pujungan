import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/route-guards";
import { uniqueSlug } from "@/lib/slug";

const templeUpdateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  categoryId: z.string().min(1),
  images: z.array(z.object({ path: z.string().min(1), alt: z.string().optional() })).min(1),
});

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
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
      createdBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  if (!temple) {
    return NextResponse.json({ message: "Temple not found" }, { status: 404 });
  }

  return NextResponse.json(temple);
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();
  const parsed = templeUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const slug = await uniqueSlug(parsed.data.name, (s) =>
    prisma.temple.findFirst({ where: { slug: s, NOT: { id } } }).then(Boolean),
  );

  const updated = await prisma.temple.update({
    where: { id },
    data: {
      slug,
      name: parsed.data.name,
      description: parsed.data.description,
      address: parsed.data.address,
      latitude: parsed.data.latitude,
      longitude: parsed.data.longitude,
      categoryId: parsed.data.categoryId,
      images: {
        deleteMany: {},
        create: parsed.data.images.map((image, index) => ({
          path: image.path,
          alt: image.alt,
          sortOrder: index,
        })),
      },
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.temple.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "Temple deleted" });
}
