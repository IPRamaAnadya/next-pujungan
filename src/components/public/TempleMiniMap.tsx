"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

type TempleMiniMapProps = {
  latitude: number;
  longitude: number;
  templeName: string;
};

const templeIcon = divIcon({
  className: "temple-mini-marker",
  html: '<div class="temple-mini-marker-dot"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function TempleMiniMap({ latitude, longitude, templeName }: TempleMiniMapProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <aside className="overflow-hidden bg-white shadow-sm">
      <style>{`
        .temple-mini-marker-dot {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #c68e51;
          border: 2px solid #fff;
          box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        }
      `}</style>
      <div className="border-b border-zinc-200 px-4 py-3">
        <h3 className="text-sm font-semibold tracking-wide text-[#151515] uppercase">Lokasi</h3>
        <p className="mt-1 text-xs text-[#666]">{templeName}</p>
      </div>
      <div className="h-56">
        <MapContainer center={[latitude, longitude]} zoom={15} className="h-full w-full" scrollWheelZoom={false} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={templeIcon} />
        </MapContainer>
      </div>
      <div className="p-4">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-sm bg-[#c68e51] px-4 py-2.5 text-sm font-semibold text-[#151515] transition hover:bg-[#b68045]"
        >
          Buka di Google Maps
        </a>
      </div>
    </aside>
  );
}