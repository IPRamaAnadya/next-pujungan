import FullscreenTempleMap from "@/components/public/FullscreenTempleMap";
import { prisma } from "@/lib/prisma";

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

  return <FullscreenTempleMap temples={templePins} />;
}