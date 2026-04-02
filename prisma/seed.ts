import bcrypt from "bcryptjs";
import sourceData from "./data/temples.json";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client/edge";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type SourceData = {
  admin: Array<{
    uuid: string;
    nama: string;
    email: string;
    role: string;
  }>;
  kategori_pura: Array<{
    uuid: string;
    nama_kategori: string;
    deskripsi: string;
  }>;
  pura: Array<{
    uuid: string;
    nama_pura: string;
    deskripsi: string;
    alamat: string;
    latitude: number;
    longitude: number;
    foto_url: string;
    kategori_uuid: string;
    created_by: string;
  }>;
};

const data = sourceData as SourceData;

async function main() {
  await prisma.templeImage.deleteMany();
  await prisma.temple.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("admin123", 10);

  const usersByUuid = new Map<string, string>();
  for (const admin of data.admin) {
    const user = await prisma.user.create({
      data: {
        name: admin.nama,
        email: admin.email,
        password: passwordHash,
        role: UserRole.ADMIN,
      },
    });
    usersByUuid.set(admin.uuid, user.id);
  }

  const categoriesByUuid = new Map<string, string>();
  for (const category of data.kategori_pura) {
    const created = await prisma.category.create({
      data: {
        slug: toSlug(category.nama_kategori),
        name: category.nama_kategori,
        description: category.deskripsi,
      },
    });
    categoriesByUuid.set(category.uuid, created.id);
  }

  for (const temple of data.pura) {
    const createdById = usersByUuid.get(temple.created_by);
    const categoryId = categoriesByUuid.get(temple.kategori_uuid);

    if (!createdById || !categoryId) {
      continue;
    }

    await prisma.temple.create({
      data: {
        slug: toSlug(temple.nama_pura),
        name: temple.nama_pura,
        description: temple.deskripsi,
        address: temple.alamat,
        latitude: temple.latitude,
        longitude: temple.longitude,
        categoryId,
        createdById,
        images: {
          create: [
            {
              path: temple.foto_url,
              sortOrder: 0,
              alt: temple.nama_pura,
            },
          ],
        },
      },
    });
  }

  console.log("Seed complete. Demo login: admin@desapujungan.bali / admin123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
