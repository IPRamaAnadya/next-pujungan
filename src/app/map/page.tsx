import dynamic from "next/dynamic";
import { PublicLayout } from "@/components/public/PublicLayout";
import { prisma } from "@/lib/prisma";

const FullscreenTempleMap = dynamic(
  () => import("@/components/public/FullscreenTempleMap"),
  { ssr: false },
);

export default async function MapPage() {

  const temples = await prisma.temple.findMany({
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const templePins = temples.map((temple) => ({
    id: temple.id,
    name: temple.name,
    address: temple.address,
    latitude: temple.latitude,
    longitude: temple.longitude,
    category: temple.category.name,
    imagePath: temple.images[0]?.path ?? null,
  }));

  return (
    <PublicLayout hideFooter>
      <FullscreenTempleMap temples={templePins} />
    </PublicLayout>
  );
}