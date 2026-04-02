import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/route-guards";
import { uniqueSlug } from "@/lib/slug";

const categoryUpdateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();
  const parsed = categoryUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const slug = await uniqueSlug(parsed.data.name, (s) =>
    prisma.category.findFirst({ where: { slug: s, NOT: { id } } }).then(Boolean),
  );

  const category = await prisma.category.update({
    where: { id },
    data: {
      slug,
      name: parsed.data.name,
      description: parsed.data.description,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const inUse = await prisma.temple.count({ where: { categoryId: id } });

  if (inUse > 0) {
    return NextResponse.json(
      { message: "Kategori masih dipakai oleh data pura" },
      { status: 400 },
    );
  }

  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ message: "Category deleted" });
}
