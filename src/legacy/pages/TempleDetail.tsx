import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { ArrowLeft, MapPin, Calendar, User, ArrowRight } from 'lucide-react';
import L from 'leaflet';
import templesData from '../data/temples.json';
import 'leaflet/dist/leaflet.css';

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
});

interface Temple {
  uuid: string;
  nama_pura: string;
  deskripsi: string;
  alamat: string;
  latitude: number;
  longitude: number;
  foto_url: string;
  kategori_uuid: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const TempleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [temple, setTemple] = useState<Temple | null>(null);
  const [category, setCategory] = useState<string>('');
  const [otherTemples, setOtherTemples] = useState<Temple[]>([]);

  useEffect(() => {
    // Find temple by UUID
    const foundTemple = templesData.pura.find(t => t.uuid === id);
    
    if (foundTemple) {
      setTemple(foundTemple);
      
      // Get category name
      const cat = templesData.kategori_pura.find(k => k.uuid === foundTemple.kategori_uuid);
      setCategory(cat?.nama_kategori || 'Unknown');
      
      // Get other temples (excluding current)
      const others = templesData.pura
        .filter(t => t.uuid !== id)
        .slice(0, 3);
      setOtherTemples(others);
    } else {
      navigate('/peta');
    }
  }, [id, navigate]);

  useEffect(() => {
    // Scroll to top when temple changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!temple) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f3ec]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#c68e51] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#888888]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3ec]">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={temple.foto_url}
            alt={temple.nama_pura}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/40 to-transparent" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 lg:left-12 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Kembali</span>
          </button>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl">
            <span className="text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              {category}
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              {temple.nama_pura}
            </h1>
            <div className="flex items-center gap-2 text-white/70 mt-4">
              <MapPin size={18} />
              <span className="text-sm">{temple.alamat}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-white p-4 shadow-md">
                  <Calendar size={20} className="text-[#c68e51] mb-2" />
                  <p className="text-xs text-[#888888]">Dibuat</p>
                  <p className="text-sm font-medium text-[#151515]">
                    {new Date(temple.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-white p-4 shadow-md">
                  <User size={20} className="text-[#c68e51] mb-2" />
                  <p className="text-xs text-[#888888]">Oleh</p>
                  <p className="text-sm font-medium text-[#151515]">
                    {templesData.admin.find(a => a.uuid === temple.created_by)?.nama || 'Admin'}
                  </p>
                </div>
                <div className="bg-white p-4 shadow-md">
                  <MapPin size={20} className="text-[#c68e51] mb-2" />
                  <p className="text-xs text-[#888888]">Koordinat</p>
                  <p className="text-sm font-medium text-[#151515]">
                    {temple.latitude.toFixed(4)}, {temple.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-8 shadow-lg">
                <h2 
                  className="text-2xl font-bold text-[#151515] mb-6"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  Tentang Pura
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-[#3c3c3c] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: temple.deskripsi }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mini Map */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="p-4 bg-[#151515]">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <MapPin size={18} className="text-[#c68e51]" />
                    Lokasi
                  </h3>
                </div>
                <div className="h-64">
                  <MapContainer
                    center={[temple.latitude, temple.longitude]}
                    zoom={15}
                    className="w-full h-full"
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker 
                      position={[temple.latitude, temple.longitude]}
                      icon={templeIcon}
                    />
                  </MapContainer>
                </div>
                <div className="p-4">
                  <a
                    href={`https://www.google.com/maps?q=${temple.latitude},${temple.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#c68e51] text-[#151515] font-medium hover:bg-[#b07d45] transition-colors"
                  >
                    Buka di Google Maps
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Temples Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="w-full px-6 lg:px-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#151515] mb-10"
            style={{ fontFamily: 'Bodoni Moda, serif' }}
          >
            Pura Lainnya
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherTemples.map((otherTemple) => (
              <Link
                key={otherTemple.uuid}
                to={`/pura/${otherTemple.uuid}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={otherTemple.foto_url}
                      alt={otherTemple.nama_pura}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 
                      className="text-lg font-bold text-[#151515] group-hover:text-[#c68e51] transition-colors"
                      style={{ fontFamily: 'Bodoni Moda, serif' }}
                    >
                      {otherTemple.nama_pura}
                    </h3>
                    <p className="text-[#888888] text-sm mt-2 line-clamp-2">
                      {otherTemple.alamat}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .prose h1, .prose h2, .prose h3, .prose h4 {
          font-family: 'Bodoni Moda', serif;
          color: #151515;
        }
        
        .prose p {
          margin-bottom: 1rem;
        }
        
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose strong {
          color: #151515;
          font-weight: 600;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .custom-temple-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </main>
  );
};

export default TempleDetail;
