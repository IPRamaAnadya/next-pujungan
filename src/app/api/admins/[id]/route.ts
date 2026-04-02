import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSuperAdminSession } from "@/lib/route-guards";

const updateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["ADMIN"]),
  password: z.string().min(6).optional(),
});

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireSuperAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const existingByEmail = await prisma.user.findFirst({
    where: {
      email: parsed.data.email,
      NOT: { id },
    },
    select: { id: true },
  });

  if (existingByEmail) {
    return NextResponse.json({ message: "Email sudah digunakan" }, { status: 400 });
  }

  const updateData: {
    name: string;
    email: string;
    role: UserRole;
    password?: string;
  } = {
    name: parsed.data.name,
    email: parsed.data.email,
    role: parsed.data.role as UserRole,
  };

  if (parsed.data.password) {
    updateData.password = await bcrypt.hash(parsed.data.password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSuperAdminSession();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (session.user.id === id) {
    return NextResponse.json({ message: "Tidak bisa menghapus akun sendiri" }, { status: 400 });
  }

  const templeCount = await prisma.temple.count({
    where: {
      createdById: id,
    },
  });

  if (templeCount > 0) {
    return NextResponse.json(
      { message: "Admin ini masih memiliki data pura" },
      { status: 400 },
    );
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "Admin deleted" });
}
