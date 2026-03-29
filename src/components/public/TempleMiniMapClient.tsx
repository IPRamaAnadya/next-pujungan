"use client";

import dynamic from "next/dynamic";

const TempleMiniMap = dynamic(() => import("./TempleMiniMap"), {
  ssr: false,
});

type TempleMiniMapClientProps = {
  latitude: number;
  longitude: number;
  templeName: string;
};

export default function TempleMiniMapClient({ latitude, longitude, templeName }: TempleMiniMapClientProps) {
  return <TempleMiniMap latitude={latitude} longitude={longitude} templeName={templeName} />;
}