import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";
import sourceData from "./data/temples.json";

const prisma = new PrismaClient();

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
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("admin123", 10);

  const usersByLegacyId = new Map<string, string>();
  for (const admin of data.admin) {
    const user = await prisma.user.create({
      data: {
        legacyId: admin.uuid,
        name: admin.nama,
        email: admin.email,
        password: passwordHash,
        role: admin.role.toLowerCase() === "admin" ? UserRole.ADMIN : UserRole.EDITOR,
      },
    });
    usersByLegacyId.set(admin.uuid, user.id);
  }

  const categoriesByLegacyId = new Map<string, string>();
  for (const category of data.kategori_pura) {
    const created = await prisma.category.create({
      data: {
        legacyId: category.uuid,
        name: category.nama_kategori,
        description: category.deskripsi,
      },
    });
    categoriesByLegacyId.set(category.uuid, created.id);
  }

  for (const temple of data.pura) {
    const createdById = usersByLegacyId.get(temple.created_by);
    const categoryId = categoriesByLegacyId.get(temple.kategori_uuid);

    if (!createdById || !categoryId) {
      continue;
    }

    await prisma.temple.create({
      data: {
        legacyId: temple.uuid,
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
