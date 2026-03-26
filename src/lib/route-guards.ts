import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  const role = session.user.role as UserRole | string;
  if (role !== "ADMIN" && role !== "EDITOR") {
    return null;
  }

  return session;
}

export async function requireSuperAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  const role = session.user.role as UserRole | string;
  if (role !== "ADMIN") {
    return null;
  }

  return session;
}
