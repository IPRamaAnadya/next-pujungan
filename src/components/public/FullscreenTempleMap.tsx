"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { divIcon, latLngBounds } from "leaflet";
import { useEffect, useState } from "react";

type TemplePin = {
  id: string;
  slug: string;
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
    return <main className="grid h-[calc(100vh-4rem)] w-full place-items-center bg-[#151515] text-white">Memuat peta...</main>;
  }

  return (
    <main className="relative h-[calc(100vh-4rem)] w-full bg-[#151515]">
      <style>{`
        .temple-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 2px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
          overflow: hidden;
          background: transparent;
        }
        .temple-popup .leaflet-popup-content {
          margin: 0;
          line-height: 1;
        }
        .temple-popup .leaflet-popup-tip {
          background: #151515;
        }
        .temple-popup .leaflet-popup-close-button {
          color: rgba(255,255,255,0.5) !important;
          top: 6px !important;
          right: 6px !important;
          font-size: 16px !important;
          z-index: 10;
        }
        .temple-popup .leaflet-popup-close-button:hover {
          color: #fff !important;
        }
      `}</style>
      <MapContainer center={[-8.268, 115.517]} zoom={13} className="h-full w-full" zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds temples={temples} />

        {temples.map((temple) => (
          <Marker key={temple.id} position={[temple.latitude, temple.longitude]} icon={templeIcon}>
            <Popup className="temple-popup" offset={[0, -6]}>
              <div className="w-56">
                {temple.imagePath && (
                  <div className="h-28 w-full overflow-hidden">
                    <img src={temple.imagePath} alt={temple.name} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="bg-[#151515] px-4 py-3 space-y-1.5">
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-[#c68e51] uppercase">{temple.category}</p>
                  <h2 className="text-sm font-bold text-white leading-snug">{temple.name}</h2>
                  <p className="text-[11px] leading-relaxed text-white/50">{temple.address}</p>
                  <a
                    href={`/temples/${temple.slug}`}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#c68e51] hover:text-[#d9a067] transition-colors"
                  >
                    Lihat Detail <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-4 bottom-6 z-999">
        <div className="pointer-events-none flex items-center gap-2 bg-[#151515]/80 px-3 py-1.5 text-white backdrop-blur">
          <p className="text-xs text-white/60">{temples.length} pura</p>
        </div>
      </div>
    </main>
  );
}
