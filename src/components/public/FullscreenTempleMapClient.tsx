"use client";

import dynamic from "next/dynamic";

type TemplePin = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  imagePath: string | null;
};

const FullscreenTempleMap = dynamic(() => import("./FullscreenTempleMap"), {
  ssr: false,
});

export default function FullscreenTempleMapClient({ temples }: { temples: TemplePin[] }) {
  return <FullscreenTempleMap temples={temples} />;
}
