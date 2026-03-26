import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import L from 'leaflet';
import templesData from '../data/temples.json';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom temple icon
const templeIcon = L.divIcon({
  className: 'custom-temple-marker',
  html: `
    <div class="w-10 h-10 bg-[#c68e51] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#151515" stroke-width="2">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
        <path d="M12 7L7 9.5v5l5 2.5 5-2.5v-5L12 7z"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Map bounds component
const MapBounds = ({ temples }: { temples: typeof templesData.pura }) => {
  const map = useMap();
  
  useEffect(() => {
    if (temples.length > 0) {
      const bounds = L.latLngBounds(temples.map(t => [t.latitude, t.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, temples]);
  
  return null;
};

const Map = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredTemples, setFilteredTemples] = useState(templesData.pura);
  const mapRef = useRef<L.Map | null>(null);

  // Get unique categories
  const categories = [
    { uuid: 'all', nama_kategori: 'Semua Kategori' },
    ...templesData.kategori_pura
  ];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredTemples(templesData.pura);
    } else {
      setFilteredTemples(templesData.pura.filter(t => t.kategori_uuid === selectedCategory));
    }
  }, [selectedCategory]);

  // Center of Desa Pujungan
  const defaultCenter: [number, number] = [-8.268, 115.517];

  return (
    <main className="min-h-screen bg-[#f8f3ec]">
      {/* Header */}
      <section className="relative pt-32 pb-12 bg-[#151515]">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/hero-temple.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#151515]/80 to-[#151515]" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
                Lokasi
              </span>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Peta Pura
              </h1>
              <p className="text-white/70 mt-4 max-w-xl">
                Jelajahi lokasi-lokasi suci di Desa Pujungan. Klik marker untuk melihat 
                detail setiap pura.
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.uuid}
                  onClick={() => setSelectedCategory(cat.uuid)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.uuid
                      ? 'bg-[#c68e51] text-[#151515]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.nama_kategori}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[calc(100vh-280px)] min-h-[500px]">
        <MapContainer
          center={defaultCenter}
          zoom={14}
          className="w-full h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapBounds temples={filteredTemples} />
          
          {filteredTemples.map((temple) => (
            <Marker
              key={temple.uuid}
              position={[temple.latitude, temple.longitude]}
              icon={templeIcon}
            >
              <Popup className="temple-popup">
                <div className="w-64">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={temple.foto_url}
                      alt={temple.nama_pura}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 to-transparent" />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 
                      className="text-lg font-bold text-[#151515] mb-1"
                      style={{ fontFamily: 'Bodoni Moda, serif' }}
                    >
                      {temple.nama_pura}
                    </h3>
                    <div className="flex items-center gap-1 text-[#888888] text-xs mb-3">
                      <MapPin size={12} />
                      <span className="line-clamp-1">{temple.alamat}</span>
                    </div>
                    <Link
                      to={`/pura/${temple.uuid}`}
                      className="inline-flex items-center gap-2 bg-[#c68e51] text-[#151515] px-4 py-2 text-sm font-medium hover:bg-[#b07d45] transition-colors w-full justify-center"
                    >
                      See Detail
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Temple List Sidebar (Desktop) */}
        <div className="hidden lg:block absolute top-4 right-4 bottom-4 w-80 bg-white shadow-2xl overflow-hidden z-[400]">
          <div className="p-4 bg-[#151515]">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Navigation size={18} className="text-[#c68e51]" />
              Daftar Pura ({filteredTemples.length})
            </h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {filteredTemples.map((temple) => (
              <Link
                key={temple.uuid}
                to={`/pura/${temple.uuid}`}
                className="flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-[#f8f3ec] transition-colors group"
              >
                <img
                  src={temple.foto_url}
                  alt={temple.nama_pura}
                  className="w-16 h-16 object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 
                    className="font-bold text-[#151515] text-sm group-hover:text-[#c68e51] transition-colors line-clamp-1"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    {temple.nama_pura}
                  </h4>
                  <p className="text-[#888888] text-xs mt-1 line-clamp-2">
                    {temple.alamat}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Temple List */}
      <section className="lg:hidden py-8 px-6">
        <h3 className="text-xl font-bold text-[#151515] mb-4" style={{ fontFamily: 'Bodoni Moda, serif' }}>
          Daftar Pura ({filteredTemples.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTemples.map((temple) => (
            <Link
              key={temple.uuid}
              to={`/pura/${temple.uuid}`}
              className="flex items-start gap-3 p-3 bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={temple.foto_url}
                alt={temple.nama_pura}
                className="w-20 h-20 object-cover flex-shrink-0"
              />
              <div>
                <h4 
                  className="font-bold text-[#151515] text-sm"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  {temple.nama_pura}
                </h4>
                <p className="text-[#888888] text-xs mt-1 line-clamp-2">
                  {temple.alamat}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .custom-temple-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .temple-popup .leaflet-popup-content-wrapper {
          border-radius: 0;
          padding: 0;
        }
        
        .temple-popup .leaflet-popup-content {
          margin: 0;
          width: 256px !important;
        }
        
        .temple-popup .leaflet-popup-tip {
          background: white;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

export default Map;
