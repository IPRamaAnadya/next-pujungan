"use client";

import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { divIcon, latLngBounds } from "leaflet";
import { useEffect, useState } from "react";

type TemplePin = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  imagePath: string | null;
};

type FullscreenTempleMapProps = {
  temples: TemplePin[];
};

const templeIcon = divIcon({
  className: "temple-marker",
  html: '<div class="temple-marker-dot"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FitBounds({ temples }: { temples: TemplePin[] }) {
  const map = useMap();

  useEffect(() => {
    if (!temples.length) return;

    const bounds = latLngBounds(temples.map((temple) => [temple.latitude, temple.longitude] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [map, temples]);

  return null;
}

export default function FullscreenTempleMap({ temples }: FullscreenTempleMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="grid h-screen w-screen place-items-center bg-[#151515] text-white">Memuat peta...</main>;
  }

  return (
    <main className="relative h-screen w-screen bg-[#151515]">
      <MapContainer center={[-8.268, 115.517]} zoom={13} className="h-full w-full" zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds temples={temples} />

        {temples.map((temple) => (
          <Marker key={temple.id} position={[temple.latitude, temple.longitude]} icon={templeIcon}>
            <Popup>
              <div className="min-w-55 space-y-2 py-1">
                <p className="text-xs font-semibold tracking-wide text-[#c68e51] uppercase">{temple.category}</p>
                <h2 className="text-base font-semibold text-zinc-900">{temple.name}</h2>
                <p className="text-xs leading-relaxed text-zinc-600">{temple.address}</p>
                <a
                  href={`/temples/${temple.id}`}
                  className="inline-block bg-[#151515] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Go to Detail
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-4 top-4 z-999">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#151515]/90 px-3 py-2 text-white shadow-lg backdrop-blur">
          <Link href="/" className="text-sm font-medium text-white/85 hover:text-white">
            ← Home
          </Link>
          <span className="text-white/40">|</span>
          <p className="text-xs text-white/70">{temples.length} temples</p>
        </div>
      </div>
    </main>
  );
}
