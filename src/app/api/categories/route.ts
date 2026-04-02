import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/route-guards";
import { uniqueSlug } from "@/lib/slug";

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const slug = await uniqueSlug(parsed.data.name, (s) =>
    prisma.category.findUnique({ where: { slug: s } }).then(Boolean),
  );

  const category = await prisma.category.create({
    data: {
      slug,
      name: parsed.data.name,
      description: parsed.data.description,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
