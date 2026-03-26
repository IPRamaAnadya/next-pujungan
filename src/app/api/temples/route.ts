import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/route-guards";

const templeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  categoryId: z.string().min(1),
  images: z.array(z.object({ path: z.string().min(1), alt: z.string().optional() })).min(1),
});

export async function GET() {
  const temples = await prisma.temple.findMany({
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
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(temples);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = templeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const created = await prisma.temple.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      address: parsed.data.address,
      latitude: parsed.data.latitude,
      longitude: parsed.data.longitude,
      categoryId: parsed.data.categoryId,
      createdById: session.user.id,
      images: {
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

  return NextResponse.json(created, { status: 201 });
}
