"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

type Props = {
  latitude: string;
  longitude: string;
  onChange: (lat: string, lng: string) => void;
};

const markerIcon = divIcon({
  className: "",
  html: `<div style="width:18px;height:18px;background:#c68e51;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function ClickHandler({ onChange }: { onChange: (lat: string, lng: string) => void }) {
  useMapEvents({
    click(e) {
      onChange(String(e.latlng.lat.toFixed(6)), String(e.latlng.lng.toFixed(6)));
    },
  });
  return null;
}

const BALI_CENTER: [number, number] = [-8.4095, 115.1889];

export default function MapPickerField({ latitude, longitude, onChange }: Props) {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const hasPosition = !isNaN(lat) && !isNaN(lng);
  const center: [number, number] = hasPosition ? [lat, lng] : BALI_CENTER;

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-md border border-zinc-300" style={{ height: 320 }}>
        <MapContainer center={center} zoom={hasPosition ? 14 : 9} className="h-full w-full" zoomControl>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onChange={onChange} />
          {hasPosition && (
            <Marker
              position={[lat, lng]}
              icon={markerIcon}
              draggable
              eventHandlers={{
                dragend(e) {
                  const pos = e.target.getLatLng();
                  onChange(String(pos.lat.toFixed(6)), String(pos.lng.toFixed(6)));
                },
              }}
            />
          )}
        </MapContainer>
      </div>
      <p className="text-xs text-zinc-500">
        Klik peta atau seret marker untuk memilih lokasi.{" "}
        {hasPosition ? (
          <span className="font-medium text-zinc-700">
            {lat.toFixed(6)}, {lng.toFixed(6)}
          </span>
        ) : (
          <span className="text-zinc-400">Belum dipilih.</span>
        )}
      </p>
      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-xs text-zinc-500">Latitude</label>
          <input
            value={latitude}
            onChange={(e) => onChange(e.target.value, longitude)}
            placeholder="-8.123456"
            className="w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
          />
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-xs text-zinc-500">Longitude</label>
          <input
            value={longitude}
            onChange={(e) => onChange(latitude, e.target.value)}
            placeholder="115.123456"
            className="w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
